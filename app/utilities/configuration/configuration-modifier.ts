import {
  LibraryConfigurationDefinition,
  TemplateCategoryDefinition,
  TemplateDefinition,
  UtilityClassControl,
  UtilityClassDefinition,
} from "./configuration-importer";

type PlacementOption = "prepend" | "append";

export type TemplateCategoryModificationOptions = {
  categoryPlacement?: PlacementOption;
  templatePlacement?: PlacementOption;
};

export class ConfigurationModifier {
  private config: LibraryConfigurationDefinition;

  constructor(config: LibraryConfigurationDefinition) {
    this.config = config;
  }

  getConfig(): LibraryConfigurationDefinition {
    return this.config;
  }

  addTemplatesToCategory(
    category: string,
    templates: TemplateDefinition[],
    options?: TemplateCategoryModificationOptions
  ): ConfigurationModifier {
    const copy = { ...this.config };
    const categoryPlacement =
      (options && options.categoryPlacement) || "append";
    const templatePlacement =
      (options && options.templatePlacement) || "append";
    const existingCategory = this.config.templateCategories.find(
      (t) => t.name === category
    );
    if (existingCategory) {
      if (templatePlacement === "append") {
        existingCategory.templates = [
          ...existingCategory.templates,
          ...templates,
        ];
      } else {
        existingCategory.templates = [
          ...templates,
          ...existingCategory.templates,
        ];
      }
    } else {
      if (categoryPlacement === "append") {
        copy.templateCategories = [
          ...copy.templateCategories,
          { name: category, templates: templates },
        ];
      } else {
        copy.templateCategories = [
          { name: category, templates: templates },
          ...copy.templateCategories,
        ];
      }
    }
    this.config = copy;
    return this;
  }

  addUtilityClassDefinition(
    utlityClasses: UtilityClassDefinition[],
    option: PlacementOption = "append"
  ): ConfigurationModifier {
    const copy = { ...this.config };
    if (option === "append") {
      copy.utilityClasses = [...copy.utilityClasses, ...utlityClasses];
    } else {
      copy.utilityClasses = [...utlityClasses, ...copy.utilityClasses];
    }
    this.config = copy;
    return this;
  }

  addUtilityClassDefinitionControls(
    utilityClassDefinitionName: string,
    utilityClassControls: UtilityClassControl[],
    option: PlacementOption = "append"
  ): ConfigurationModifier {
    const copy = { ...this.config };
    const utilityClassDefinition = copy.utilityClasses.find(
      (d) => d.section === utilityClassDefinitionName
    );
    if (!utilityClassDefinition) {
      throw new Error(
        `No utility class definition found for: ${utilityClassDefinitionName}`
      );
    }
    if (option === "append") {
      utilityClassDefinition.controls = [
        ...utilityClassDefinition.controls,
        ...utilityClassControls,
      ];
    } else {
      utilityClassDefinition.controls = [
        ...utilityClassControls,
        ...utilityClassDefinition.controls,
      ];
    }
    this.config = copy;
    return this;
  }
}
