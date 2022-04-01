/// <reference types="react" />
import { NodeTreeMatch } from "../utilities/tree/tree-utils";
import { ParsedLibraryConfigurationDefinition } from "../utilities/configuration/configuration-importer";
import { ProductDivConfig } from "..";
export declare type ElementEditorState = {
    match?: NodeTreeMatch;
};
export declare function getIframeElement(): any;
export declare function getIframeDocument(): Document;
export declare function getIframeWindow(): Window;
export declare function drawHoverElement(clientX: number, clientY: number, dropZoneSelector?: string): {
    element: Element;
    placement: import("../utilities/dom/canvas").PlacementType;
};
declare type ApplicationProps = {
    pageSource: string;
    configuration: ParsedLibraryConfigurationDefinition;
    editorConfig: ProductDivConfig;
    onLeftNavClose: (d: Document) => any;
};
export declare function Application(props: ApplicationProps): JSX.Element;
export {};
