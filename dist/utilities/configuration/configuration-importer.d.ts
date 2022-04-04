export declare type LibraryConfigurationDefinition = {
    templates: TemplateDefinition[];
    treeViewIgnoreQuerySelectors: string[];
    utilityClasses: UtilityClassDefinition[];
};
export declare type UtilityClassDefinition = {
    name: string;
    type: "selectOne" | "selectMany";
    documentationLink?: string;
    classes: string[];
    tags: string[];
    selectors?: string[];
};
export declare type ParsedLibraryConfigurationDefinition = LibraryConfigurationDefinition & {
    error?: string;
};
export declare type ClassDefinition = {
    tag: string;
    classes: string[];
};
export declare type TemplateDefinition = {
    name: string;
    tags: string[];
    htmlTemplate: string;
    previewWidth?: string;
};
export declare function tagsToSearchableString(tags: string[]): string;
export declare function parseLibraryConfiguration(config: LibraryConfigurationDefinition): LibraryConfigurationDefinition;
