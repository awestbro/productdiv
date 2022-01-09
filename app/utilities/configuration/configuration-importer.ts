import * as yaml from "js-yaml";

export type LibraryConfigurationDefinition = {
  components: ComponentDefinition[];
  templateCategories: TemplateCategoryDefinition[];
  treeViewIgnoreQuerySelectors: string[];
  utilityClasses: UtilityClassDefinition[];
};

export type ComponentDefinition = {
  name: string;
  selectors: string[];
  utilityClassMatches: string[];
};

export type UtilityClassDefinition = {
  section: string;
  documentationLink?: string;
  controls: UtilityClassControl[];
  showDefault?: boolean;
};

export type UtilityClassControl = {
  name: string;
  type: string;
  classes?: string[];
};

export type ParsedLibraryConfigurationDefinition =
  LibraryConfigurationDefinition & {
    error?: string;
  };

export type ClassDefinition = {
  tag: string;
  classes: string[];
};

export type TemplateCategoryDefinition = {
  name: string;
  templates: TemplateDefinition[];
};

export type TemplateDefinition = {
  name: string;
  htmlTemplate: string;
  previewWidth?: string;
};

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
  let copy = { ...config };
  // console.log('config', config);
  copy.utilityClasses = copy.utilityClasses.map((def) => {
    return {
      ...def,
      controls: def.controls.map((c) => {
        if (c.classes) {
          return {
            ...c,
            classes: c.classes.reduce((acc, classes) => {
              acc.push(...classDefinitionStringExpander(classes));
              return acc;
            }, []),
          };
        }
        return c;
      }),
    };
  });
  return copy;
}
