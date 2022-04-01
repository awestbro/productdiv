import { LibraryConfigurationDefinition, ComponentDefinition, UtilityClassDefinition, UtilityClassControl, TemplateCategoryDefinition, TemplateDefinition, ParsedLibraryConfigurationDefinition } from "./utilities/configuration/configuration-importer";
import { ConfigurationModifier } from "./utilities/configuration/configuration-modifier";
import { jsxFormatter } from "./utilities/jsx-formatter";
export { LibraryConfigurationDefinition, ComponentDefinition, UtilityClassDefinition, UtilityClassControl, TemplateCategoryDefinition, TemplateDefinition, ParsedLibraryConfigurationDefinition, ConfigurationModifier, jsxFormatter, };
export declare function saveOffsetTop(top: number): void;
export declare function getOffsetTop(): any;
export declare type ProductDivConfig = {
    htmlFormatter?(s: string): string;
};
export default function ProductDiv(config: LibraryConfigurationDefinition, editorConfig?: ProductDivConfig): void;
