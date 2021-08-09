import { NodeTreeMatch } from '../lib/tree/tree-utils';
import { ParsedLibraryConfigurationDefinition } from '../lib/configuration/configuration-importer';
export declare type ElementEditorState = {
    match?: NodeTreeMatch;
};
export declare function getIframeElement(): any;
export declare function getIframeDocument(): Document;
export declare function getIframeWindow(): any;
export declare function drawHoverElement(clientX: number, clientY: number, dropZoneSelector?: string): {
    element: Element;
    placement: import("../lib/dom/canvas").PlacementType;
};
export declare function Application(props: {
    pageSource: string;
    configuration: ParsedLibraryConfigurationDefinition;
}): JSX.Element;
