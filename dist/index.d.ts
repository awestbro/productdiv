import { LibraryConfigurationDefinition, UtilityClassDefinition, TemplateDefinition, ParsedLibraryConfigurationDefinition } from "./utilities/configuration/configuration-importer";
import { jsxFormatter } from "./utilities/jsx-formatter";
export { LibraryConfigurationDefinition, UtilityClassDefinition, TemplateDefinition, ParsedLibraryConfigurationDefinition, jsxFormatter, };
export declare function saveOffsetTop(top: number): void;
export declare function getOffsetTop(): any;
export declare type ProductDivConfig = {
    htmlFormatter?(s: string): string;
};
export default function ProductDiv(config: LibraryConfigurationDefinition, editorConfig?: ProductDivConfig): void;
