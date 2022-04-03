export type LibraryConfigurationDefinition = {
  templates: TemplateDefinition[];
  treeViewIgnoreQuerySelectors: string[];
  utilityClasses: UtilityClassDefinition[];
};

export type UtilityClassDefinition = {
  name: string;
  type: "selectOne" | "selectMany";
  documentationLink?: string;
  classes: string[];
  tags: string[];
  selectors?: string[];
};

export type ParsedLibraryConfigurationDefinition =
  LibraryConfigurationDefinition & {
    error?: string;
  };

export type ClassDefinition = {
  tag: string;
  classes: string[];
};

export type TemplateDefinition = {
  name: string;
  tags: string[];
  htmlTemplate: string;
  previewWidth?: string;
};

export function tagsToSearchableString(tags: string[]) {
  return tags.reduce((acc, t) => `${acc} ${t}`, "");
}

/**
 * Turns expandOptions(["border border-"], ["primary", "secondary"])
 * Into ["border border-primary", "border border-secondary"]
 */
function expandOptions(originalTokens: string[], options: string[]): string[] {
  return originalTokens.reduce((acc, str) => {
    acc.push(...options.map((o) => `${str}${o}`));
    return acc;
  }, []);
}

/**
 * Turns concatAll(["border border-primary", "border border-secondary"], "-")
 * into ["border border-primary-", "border border-secondary-"]
 */
function concatAll(tokens: string[], str: string): string[] {
  return tokens.map((t) => t.concat(str));
}

/**
 * Turn "border border-(primary|secondary)-(1|2)" into
 * [
 *  "border border-primary-1",
 *  "border border-primary-2",
 *  "border border-secondary-1",
 *  "border border-secondary-2",
 * ]
 */
function classDefinitionStringExpander(input: string): string[] {
  // Find distinct groups
  const groupRegex = /\([^)]*\)/g;
  // ["(primary|secondary)", "(1|2)"]
  const groupMatches = input.match(groupRegex);

  if (groupMatches === null || groupMatches.length === 0) {
    return [input];
  }

  // ["border border-", "-", ""]
  const splitText = input.split(groupRegex);
  // [["primary", "secondary"], ["1", "2"]]
  const options = groupMatches.map((option) => {
    return option.replace("(", "").replace(")", "").split("|");
  });
  let finishedTokens: string[] = [];
  splitText.forEach((value, index) => {
    if (index === 0) {
      finishedTokens = [value];
    }
    if (index > 0) {
      finishedTokens = concatAll(finishedTokens, value);
    }
    // console.log('options[index]', options[index]);
    if (options[index]) {
      finishedTokens = expandOptions(finishedTokens, options[index]);
      // console.log('expanded: ', [...finishedTokens]);
    }
  });
  return finishedTokens;
}

export function parseLibraryConfiguration(
  config: LibraryConfigurationDefinition
): LibraryConfigurationDefinition {
  const copy = { ...config };
  copy.utilityClasses = copy.utilityClasses.map((def) => {
    return {
      ...def,
      classes: def.classes.reduce((acc, classes) => {
        acc.push(...classDefinitionStringExpander(classes));
        return acc;
      }, []),
    };
  });
  return copy;
}
