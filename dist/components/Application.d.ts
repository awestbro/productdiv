/// <reference types="react" />
import { NodeTreeMatch } from "../utilities/tree/tree-utils";
import { ParsedLibraryConfigurationDefinition } from "../utilities/configuration/configuration-importer";
export declare type ElementEditorState = {
    match?: NodeTreeMatch;
};
export declare function getIframeElement(): any;
export declare function getIframeDocument(): Document;
export declare function getIframeWindow(): any;
export declare function drawHoverElement(clientX: number, clientY: number, dropZoneSelector?: string): {
    element: Element;
    placement: import("../utilities/dom/canvas").PlacementType;
};
export declare function Application(props: {
    pageSource: string;
    configuration: ParsedLibraryConfigurationDefinition;
    onLeftNavClose: (d: Document) => any;
}): JSX.Element;
