/// <reference types="react" />
import { TemplateDefinition } from "../../utilities/configuration/configuration-importer";
import { NodeTreeMatch } from "../../utilities/tree/tree-utils";
import { drawHoverElement, ElementEditorState } from "../Application";
import { PlacementType } from "../../utilities/dom/canvas";
declare type TemplateSelectorProps = {
    iframeDocuemnt: Document;
    modifyingElement?: Node;
    setTemplateEditorOpen?: (b: boolean) => any;
    redrawComponentTree(): NodeTreeMatch[];
    templates: TemplateDefinition[];
    setElementEditorState(s: ElementEditorState): any;
    setElementEditorOpen(b: boolean): any;
    drawHoverElement: typeof drawHoverElement;
    dropZoneSelector: string;
    showTemplatePreview: (s: string, w?: string) => any;
    hideTemplatePreview: () => any;
    lastHoverPosition: {
        x: number;
        y: number;
    };
};
export declare function TemplateSelector(props: TemplateSelectorProps): JSX.Element;
declare type TemplateButtonProps = TemplateSelectorProps & {
    template: TemplateDefinition;
    onTemplateSelect: (t: TemplateDefinition) => any;
    showTemplatePreview: (s: string, w?: string) => any;
    hideTemplatePreview: () => any;
};
export declare function TemplateButton(props: TemplateButtonProps): JSX.Element;
declare type PlacementTypeSelectorProps = {
    element: Element;
    onPlacementSelect: (p: PlacementType) => any;
    dropZoneSelector?: string;
};
export declare function PlacementTypeSelector(props: PlacementTypeSelectorProps): JSX.Element;
export {};
