import { getIframeDocument } from "../../editor/Application";
import { ChildNodeType } from "../../enum/child-node-type";

export function getDocumentHeightAndWidth(d: Document) {
    // const body = document.body;
    // const html = document.documentElement;

    const height = window.innerHeight //Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const width = window.innerWidth // document.body.offsetWidth;
    return { height, width };
}

export function createCanvas(doc: Document) {
    var canvas = doc.createElement('canvas'); //Create a canvas element
    //Set canvas width/height
    setCanvasWidthAndHeight(doc, canvas);
    //Position canvas
    canvas.id = 'productdiv-canvas'
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.zIndex = '999990';
    canvas.style.pointerEvents = 'none'; //Make sure you can click 'through' the canvas
    doc.body.appendChild(canvas); //Append canvas to body element
    canvas.setAttribute('data-productdiv', 'true');
    const context = canvas.getContext('2d');
    context.globalAlpha = 0.5;
    return { canvas, context: context };
}

export function setCanvasWidthAndHeight(doc: Document, canvas: HTMLCanvasElement) {
    const { height, width } = getDocumentHeightAndWidth(doc);
    canvas.style.width = `${width}`;
    canvas.style.height = `${height}`;
    canvas.width = width;
    canvas.height = height;
}

export function pxToNumber(px: string) {
    return parseInt(px.replace('px', ''));
}

export function getElementsRelativeCoordinates(element: Element) {
    let { top, left, right, bottom, width, height } = element.getBoundingClientRect();

    // top = top - window.scrollY;
    // left = left + window.scrollX;
    // bottom = bottom - window.scrollY;
    // right = right + window.scrollX;

    return { top, left, right, bottom, width, height };
}

const MARGIN_COLOR = '#ffa5004f'; // '#ffa50094';
const PADDING_COLOR = '#00800040';
const BORDER_COLOR = '#0000ff0f';
const ELEMENT_OUTLINE_COLOR = '#44444482';

export function drawMarginAndPadding(ctx: CanvasRenderingContext2D, element: Element) {
    const style = getComputedStyle(element);
    // console.log('style: ', style);
    let { top, left, right, bottom, width, height } = getElementsRelativeCoordinates(element);
    const { marginTop, marginBottom, marginLeft, marginRight, paddingTop, paddingBottom, paddingLeft, paddingRight, borderBottomWidth, borderTopWidth, borderLeftWidth, borderRightWidth } = style;

    const numMarginTop = pxToNumber(marginTop);
    const numMarginBottom = pxToNumber(marginBottom);
    const numMarginLeft = pxToNumber(marginLeft);
    const numMarginRight = pxToNumber(marginRight);
    const numPaddingTop = pxToNumber(paddingTop);
    const numPaddingBottom = pxToNumber(paddingBottom);
    const numPaddingLeft = pxToNumber(paddingLeft);
    const numPaddingRight = pxToNumber(paddingRight);
    const numBorderTop = pxToNumber(borderTopWidth);
    const numBorderBottom = pxToNumber(borderBottomWidth);
    const numBorderLeft = pxToNumber(borderLeftWidth);
    const numBorderRight = pxToNumber(borderRightWidth);

    const marginHeight = height + numMarginBottom + numMarginTop;

    // DRAW MARGIN
    ctx.fillStyle = MARGIN_COLOR;
    // Top margin rect
    ctx.fillRect(left, top - numMarginTop, width, numMarginTop);
    // Bottom margin rect
    ctx.fillRect(left, bottom, width, numMarginBottom);
    // Left margin rect
    ctx.fillRect(left - numMarginLeft, top - numMarginTop, numMarginLeft, marginHeight);
    // Right margin rect
    ctx.fillRect(right, top - numMarginTop, numMarginRight, marginHeight);

    const paddingWidth = width - numBorderLeft - numBorderRight;
    const paddingHeight = height - numPaddingTop - numPaddingBottom - numBorderTop - numBorderBottom;

    // DRAW PADDING
    ctx.fillStyle = PADDING_COLOR;
    // Top padding rect
    ctx.fillRect(left + numBorderLeft, top + numBorderTop, paddingWidth, numPaddingTop);
    // Bottom padding rect
    ctx.fillRect(left + numBorderLeft, bottom - numPaddingBottom - numBorderBottom, paddingWidth, numPaddingBottom);
    // Left padding rect
    ctx.fillRect(left + numBorderLeft, top + numPaddingTop + numBorderTop, numPaddingLeft, paddingHeight);
    // Right padding rect
    ctx.fillRect(right - numPaddingRight - numBorderRight, top + numPaddingTop + numBorderTop, numPaddingRight, paddingHeight);

    const borderHeight = height - numBorderTop - numBorderBottom;

    // DRAW BORDER
    ctx.fillStyle = BORDER_COLOR;
    // Top border rect
    ctx.fillRect(left, top, width, numBorderTop);
    // Bottom border rect
    ctx.fillRect(left, bottom - numBorderBottom, width, numBorderBottom);
    // Left border rect
    ctx.fillRect(left, top + numBorderTop, numBorderLeft, borderHeight);
    // Right border rect
    ctx.fillRect(right - numBorderRight, top + numBorderTop, numBorderRight, borderHeight);

    // DRAW INTERIOR
    // ctx.fillStyle = '#67a7ff38';
    // ctx.fillRect(left - numBorderLeft + numPaddingLeft, top + numBorderTop + numPaddingTop, width - numPaddingLeft - numBorderLeft - numPaddingRight - numBorderRight, height - numBorderTop - numPaddingTop - numBorderBottom - numPaddingBottom);
    ctx.rect(left - numBorderLeft + numPaddingLeft, top + numBorderTop + numPaddingTop, width - numPaddingLeft - numBorderLeft - numPaddingRight - numBorderRight, height - numBorderTop - numPaddingTop - numBorderBottom - numPaddingBottom);
    ctx.strokeStyle = ELEMENT_OUTLINE_COLOR;
    ctx.stroke();

    // Interior Hover Area Includes body, padding, and border
}

export enum PlacementType {
    OUTER_PREPEND = 'beforebegin',
    OUTER_APPEND = 'afterend',
    INNER_PREPEND = 'afterbegin',
    INNER_APPEND = 'beforeend',
    REPLACE = 'replace',
}

const hoverBorderPassiveColor = '#8cf3ba91';
const hoverBorderActiveColor = '#2cfd4f91';

export function drawPlacementHover(mouseX: number, mouseY: number, ctx: CanvasRenderingContext2D, element: Element, dropZoneSelector?: string): PlacementType {
    const { top, left, bottom, right, width, height } = element.getBoundingClientRect();

    if (dropZoneSelector && element.matches(dropZoneSelector)) {
        drawPlacementType(ctx, element, PlacementType.REPLACE);
        return PlacementType.REPLACE;
    }

    if (width < 5 || height < 5) {
        drawPlacementType(ctx, element, PlacementType.REPLACE);
        return PlacementType.INNER_APPEND;
    }

    const smallSide = width > height ? height : width;
    let borderSize = smallSide * .2;
    if (width > 40 && height > 40) {
        borderSize = 15;
    }

    const innerTop = top + borderSize;
    const innerLeft = left + borderSize;
    const innerBottom = bottom - borderSize;
    const innerRight = right - borderSize;

    if (mouseX < innerLeft || mouseY < innerTop) {
        drawPlacementType(ctx, element, PlacementType.OUTER_PREPEND);
        return PlacementType.OUTER_PREPEND;
    } else if (mouseX > innerRight || mouseY > innerBottom) {
        drawPlacementType(ctx, element, PlacementType.OUTER_APPEND);
        return PlacementType.OUTER_APPEND;
    } else {
        if (mouseX < (left + (width / 2))) {
            drawPlacementType(ctx, element, PlacementType.INNER_PREPEND);
            return PlacementType.INNER_PREPEND;
        } else {
            drawPlacementType(ctx, element, PlacementType.INNER_APPEND);
            return PlacementType.INNER_APPEND;
        }
    }
}

export function drawPlacementType(ctx: CanvasRenderingContext2D, element: Element, placementType: PlacementType) {
    const { top, left, bottom, right, width, height } = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const { marginTop, marginBottom, marginLeft, marginRight, paddingTop, paddingBottom, paddingLeft, paddingRight, borderBottomWidth, borderTopWidth, borderLeftWidth, borderRightWidth } = style;

    const numMarginTop = pxToNumber(marginTop);
    const numMarginBottom = pxToNumber(marginBottom);
    const numMarginLeft = pxToNumber(marginLeft);
    const numMarginRight = pxToNumber(marginRight);
    const numPaddingTop = pxToNumber(paddingTop);
    const numPaddingBottom = pxToNumber(paddingBottom);
    const numPaddingLeft = pxToNumber(paddingLeft);
    const numPaddingRight = pxToNumber(paddingRight);
    const numBorderTop = pxToNumber(borderTopWidth);
    const numBorderBottom = pxToNumber(borderBottomWidth);
    const numBorderLeft = pxToNumber(borderLeftWidth);
    const numBorderRight = pxToNumber(borderRightWidth);

    if (placementType === PlacementType.REPLACE) {
        ctx.fillStyle = '#0000ff1a';
        ctx.rect(left, top, width, height);
        ctx.stroke();
        return;
    }

    const smallSide = width > height ? height : width;
    // let borderSize = smallSide * .2;
    // if (width > 40 && height > 40) {
    //     borderSize = 15;
    // }
    let borderSize = 10;

    const innerTop = top + borderSize;
    const innerLeft = left + borderSize;
    const innerBottom = bottom - borderSize;
    const innerRight = right - borderSize;

    if (placementType === PlacementType.OUTER_PREPEND) {
        ctx.fillStyle = hoverBorderActiveColor;
        ctx.fillRect(left - borderSize, top - borderSize, width, borderSize);
        ctx.fillRect(left - borderSize, innerTop - borderSize, borderSize, height - borderSize);
        return;
    } else if (placementType === PlacementType.OUTER_APPEND) {
        ctx.fillStyle = hoverBorderActiveColor;
        ctx.fillRect(innerRight - borderSize, top, borderSize, (height - borderSize * 2));
        ctx.fillRect(left, innerBottom - borderSize, (width - borderSize), borderSize);
        return;
    } else {
        ctx.fillStyle = hoverBorderPassiveColor;
        // top bar
        ctx.fillRect(left - borderSize, top - borderSize, width, borderSize);
        // left bar
        ctx.fillRect(left - borderSize, innerTop - borderSize, borderSize, height - borderSize);
        // bottom bar
        ctx.fillRect(innerRight - borderSize, top, borderSize, (height - borderSize * 2));
        // right bar
        ctx.fillRect(left, innerBottom - borderSize, (width - borderSize), borderSize);

        if (placementType === PlacementType.INNER_PREPEND) {
            ctx.fillStyle = hoverBorderActiveColor;
            ctx.fillRect(innerLeft - borderSize, innerTop - borderSize, ((innerRight - innerLeft) / 2), innerBottom - innerTop);
            return;
        } else {
            ctx.fillStyle = hoverBorderActiveColor;
            ctx.fillRect(innerLeft + ((innerRight - innerLeft) / 2) - borderSize, innerTop - borderSize, ((innerRight - innerLeft) / 2), innerBottom - innerTop)
            return;
        }
    }

}

export function highlightElements(nodes: Node[]) {
    const iframeDocument = getIframeDocument()
    const { height, width } = getDocumentHeightAndWidth(iframeDocument);
    const canvas: HTMLCanvasElement = (iframeDocument.getElementById('productdiv-canvas') as HTMLCanvasElement);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    setCanvasWidthAndHeight(iframeDocument, canvas);
    nodes.forEach((node) => {
        if (node.nodeType === ChildNodeType.Element) {
            drawMarginAndPadding(ctx, node as Element);
        } else if (node.nodeType === ChildNodeType.Text) {
            drawMarginAndPadding(ctx, node.parentElement);
        }
    });
}