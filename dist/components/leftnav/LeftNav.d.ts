/// <reference types="react" />
import { drawHoverElement, ElementEditorState } from "../Application";
import { ParsedLibraryConfigurationDefinition, TemplateCategoryDefinition } from "../../utilities/configuration/configuration-importer";
import { NodeTreeMatch } from "../../utilities/tree/tree-utils";
export declare type LeftNavProps = {
    getComponentTree(doc: Document, treeViewIgnoreQuerySelectors: string[]): NodeTreeMatch[];
    configuration: ParsedLibraryConfigurationDefinition;
    templateCategories: TemplateCategoryDefinition[];
    elementEditorState: ElementEditorState;
    setElementEditorState(s: ElementEditorState): void;
    treeViewOpen: boolean;
    setTreeViewOpen(b: boolean): void;
    elementEditorOpen: boolean;
    setElementEditorOpen(b: boolean): void;
    redrawComponentTree(): NodeTreeMatch[];
    redrawHighlightedNode(node?: Node | false): void;
    drawHoverElement: typeof drawHoverElement;
    componentTree: NodeTreeMatch[];
    dropZoneSelector: string;
    templateEditorOpen: boolean;
    setTemplateEditorOpen: (b: boolean) => void;
    showTemplatePreview: (s: string, w?: string) => void;
    hideTemplatePreview: () => void;
    lastHoverPosition: {
        x: number;
        y: number;
    };
    iframeDocument: Document;
    onLeftNavClose: () => void;
};
export declare function LeftNav(props: LeftNavProps): JSX.Element;
export declare function LeftNavMenu(props: LeftNavProps): JSX.Element;
