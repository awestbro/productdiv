export declare type LibraryConfigurationDefinition = {
    components: ComponentDefinition[];
    templateCategories: TemplateCategoryDefinition[];
    treeViewIgnoreQuerySelectors: string[];
    utilityClasses: UtilityClassDefinition[];
};
export declare type ComponentDefinition = {
    name: string;
    selectors: string[];
    utilityClassMatches: string[];
};
export declare type UtilityClassDefinition = {
    section: string;
    documentationLink?: string;
    controls: UtilityClassControl[];
    showDefault?: boolean;
};
export declare type UtilityClassControl = {
    name: string;
    type: "selectOne" | "selectMany";
    classes?: string[];
};
export declare type ParsedLibraryConfigurationDefinition = LibraryConfigurationDefinition & {
    error?: string;
};
export declare type ClassDefinition = {
    tag: string;
    classes: string[];
};
export declare type TemplateCategoryDefinition = {
    name: string;
    templates: TemplateDefinition[];
};
export declare type TemplateDefinition = {
    name: string;
    htmlTemplate: string;
    previewWidth?: string;
};
export declare function parseLibraryConfiguration(config: LibraryConfigurationDefinition): LibraryConfigurationDefinition;
