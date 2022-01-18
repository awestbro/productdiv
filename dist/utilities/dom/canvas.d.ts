export declare function getDocumentHeightAndWidth(d: Document): {
    height: number;
    width: number;
};
export declare function createCanvas(doc: Document): {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
};
export declare function setCanvasWidthAndHeight(doc: Document, canvas: HTMLCanvasElement): void;
export declare function pxToNumber(px: string): number;
export declare function getElementsRelativeCoordinates(element: Element): {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
};
export declare function drawMarginAndPadding(ctx: CanvasRenderingContext2D, element: Element): void;
export declare enum PlacementType {
    OUTER_PREPEND = "beforebegin",
    OUTER_APPEND = "afterend",
    INNER_PREPEND = "afterbegin",
    INNER_APPEND = "beforeend",
    REPLACE = "replace"
}
export declare function drawPlacementHover(mouseX: number, mouseY: number, ctx: CanvasRenderingContext2D, element: Element, dropZoneSelector?: string): PlacementType;
export declare function drawPlacementType(ctx: CanvasRenderingContext2D, element: Element, placementType: PlacementType): void;
export declare function highlightElements(nodes: Node[]): void;
