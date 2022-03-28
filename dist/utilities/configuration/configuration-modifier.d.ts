import { LibraryConfigurationDefinition, TemplateDefinition, UtilityClassControl, UtilityClassDefinition } from "./configuration-importer";
declare type PlacementOption = "prepend" | "append";
export declare type TemplateCategoryModificationOptions = {
    categoryPlacement?: PlacementOption;
    templatePlacement?: PlacementOption;
};
export declare class ConfigurationModifier {
    private config;
    constructor(config: LibraryConfigurationDefinition);
    getConfig(): LibraryConfigurationDefinition;
    addTemplatesToCategory(category: string, templates: TemplateDefinition[], options?: TemplateCategoryModificationOptions): ConfigurationModifier;
    addUtilityClassDefinition(utlityClasses: UtilityClassDefinition[], option?: PlacementOption): ConfigurationModifier;
    addUtilityClassDefinitionControls(utilityClassDefinitionName: string, utilityClassControls: UtilityClassControl[], option?: PlacementOption): ConfigurationModifier;
}
export {};
