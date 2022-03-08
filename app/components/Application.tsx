import * as React from "react";
import { TreeView } from "./treeview/TreeView";
import {
  createComponentTree,
  getTreeMatchFromElement,
  NodeTreeMatch,
} from "../utilities/tree/tree-utils";
import { LeftNav } from "./leftnav/LeftNav";
import { highlightElements } from "../utilities/dom/canvas";
import {
  getDocumentHeightAndWidth,
  drawPlacementHover,
  setCanvasWidthAndHeight,
  createCanvas,
} from "../utilities/dom/canvas";
import classnames from "classnames";
// @ts-ignore
import * as throttle from "lodash/throttle";
import { ParsedLibraryConfigurationDefinition } from "../utilities/configuration/configuration-importer";
import { AllIconDefinitions } from "./common/Icons";
import { getOffsetTop, saveOffsetTop } from "..";

export type ElementEditorState = {
  match?: NodeTreeMatch;
};

export function getIframeElement(): any {
  return document.getElementById("productdiv-iframe");
}

export function getIframeDocument(): Document {
  const iframe: any = getIframeElement();
  const iframeDocument =
    iframe.contentDocument || iframe.contentWindow.document;
  return iframeDocument;
}

export function getIframeWindow(): Window {
  const iframe: any = getIframeElement();
  return iframe.contentWindow;
}

function getComponentTree(
  doc: Document,
  treeViewIgnoreQuerySelectors: string[]
): NodeTreeMatch[] {
  return createComponentTree(
    doc,
    getIframeDocument().body,
    treeViewIgnoreQuerySelectors
  );
}

export function drawHoverElement(
  clientX: number,
  clientY: number,
  dropZoneSelector?: string
) {
  const iframeDocument = getIframeDocument();
  const { height, width } = getDocumentHeightAndWidth();
  const canvas: HTMLCanvasElement = iframeDocument.getElementById(
    "productdiv-canvas"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  let element = iframeDocument.elementFromPoint(clientX, clientY);
  if (element.nodeName === "HTML" || element.nodeName === "HEAD") {
    element = iframeDocument.body;
  }
  ctx.clearRect(0, 0, width, height);
  setCanvasWidthAndHeight(canvas);
  const placement = drawPlacementHover(
    clientX,
    clientY,
    ctx,
    element,
    dropZoneSelector
  );
  return {
    element,
    placement,
  };
}

function getLocalStateBoolean(name: string) {
  const s = window.localStorage.getItem(name);
  if (s === "false") {
    return false;
  }
  return true;
}

function setLocalStateBoolean(name: string, value: boolean) {
  window.localStorage.setItem(name, `${value}`);
}

function getTreeOpenState() {
  return getLocalStateBoolean("productdiv-tree-state");
}

function setTreeOpenState(state: boolean) {
  setLocalStateBoolean("productdiv-tree-state", state);
}

const iframeDocumentId = "productdiv-iframe";
const dropZoneSelector = ".productdiv-drop-container";

let hasIframeMounted = false;

export function Application(props: {
  pageSource: string;
  configuration: ParsedLibraryConfigurationDefinition;
  onLeftNavClose: (d: Document) => any;
}) {
  const { pageSource, configuration, onLeftNavClose } = props;
  const [componentTree, setComponentTree] =
    React.useState<NodeTreeMatch[]>(null);
  const [treeViewOpen, setTreeViewStateOpen] = React.useState(
    getTreeOpenState()
  );
  const [elementEditorOpen, setElementEditorOpen] = React.useState(false);
  const [templateEditorOpen, setTemplateEditorOpen] =
    React.useState<boolean>(false);
  const [elementEditorState, setElementEditorState] =
    React.useState<ElementEditorState>({ match: null });
  const [lastHoverPosition, setLastHoverPosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  function setTreeViewOpen(v: boolean) {
    setTreeOpenState(v);
    setTreeViewStateOpen(v);
  }

  const [iframeDocument, setIframeDocument] = React.useState<Document>();

  function redrawComponentTree(
    treeViewIgnoreQuerySelectors: string[]
  ): NodeTreeMatch[] {
    const tree = getComponentTree(iframeDocument, treeViewIgnoreQuerySelectors);
    setComponentTree(tree);
    return tree;
  }

  // cleanup state on unmount
  React.useEffect(() => {
    return () => {
      hasIframeMounted = false;
    };
  }, []);

  // Only runs once by setting second arg to []
  React.useEffect(() => {
    if (iframeDocument) {
      redrawComponentTree(configuration.treeViewIgnoreQuerySelectors);
    }
  }, [iframeDocument]);

  React.useEffect(() => {
    if (iframeDocument) {
      if (elementEditorState.match) {
        highlightElements([elementEditorState.match.node]);
      } else {
        highlightElements([]);
      }
    }
  }, [componentTree, iframeDocument]);

  function showTemplatePreview(template: string, width?: string) {
    const previewer = iframeDocument.getElementById(
      "productdiv-template-preview"
    );
    highlightElements([]);
    previewer.insertAdjacentHTML("beforeend", template);
    if (width) {
      previewer.style.width = width;
    }
    previewer.style.display = "block";
  }

  function hideTemplatePreview() {
    const previewer = iframeDocument.getElementById(
      "productdiv-template-preview"
    );
    previewer.style.display = "none";
    previewer.style.width = "100%";
    while (previewer.firstChild) {
      previewer.removeChild(previewer.firstChild);
    }
    if (elementEditorState.match?.node) {
      highlightElements([elementEditorState.match.node]);
    }
  }

  const [currentHoveredMatch, setCurrentHoveredMatch] =
    React.useState<NodeTreeMatch>(null);

  function documentOnClick(event: MouseEvent) {
    event.preventDefault();

    if (!elementEditorState.match) {
      setElementEditorState({ match: currentHoveredMatch });
      if ((currentHoveredMatch.node as Element).matches(dropZoneSelector)) {
        setTemplateEditorOpen(true);
      }
      setElementEditorOpen(true);
      highlightElements([currentHoveredMatch.node]);
    } else {
      setElementEditorState({ match: null });
      setElementEditorOpen(false);
      setTemplateEditorOpen(false);
      highlightElements([]);
    }
  }

  let scrollTimer: any = null;

  function onScroll() {
    const doc = iframeDocument.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    saveOffsetTop(top);
    highlightElements([]);
    if (scrollTimer != null) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      if (elementEditorState.match?.node) {
        highlightElements([elementEditorState.match.node]);
      }
    }, 50);
  }

  let resizeTimer: any = null;

  function onResize() {
    highlightElements([]);
    if (resizeTimer != null) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      if (elementEditorState.match?.node) {
        highlightElements([elementEditorState.match.node]);
      }
    }, 50);
  }

  const dragoverEvent = throttle(
    (e) => {
      drawHoverElement(e.clientX, e.clientY, dropZoneSelector);
      setLastHoverPosition({ x: e.clientX, y: e.clientY });
    },
    100,
    { leading: true, trailing: false }
  );

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    dragoverEvent(e);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setLastHoverPosition({ x: 0, y: 0 });
    highlightElements([]);
  };

  const onMouseMove = throttle((e: MouseEvent) => {
    const elementOver = iframeDocument.elementFromPoint(e.clientX, e.clientY);
    const treeMatch = getTreeMatchFromElement(componentTree || [], elementOver);
    if (!treeMatch) {
      return;
    }
    if (elementEditorState.match == treeMatch) {
      return;
    }
    setCurrentHoveredMatch(treeMatch);
    if (!elementEditorState.match) {
      highlightElements([treeMatch.node]);
    }
  }, 50);

  const onMouseLeave = (e: MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      if (elementEditorState.match) {
        highlightElements([elementEditorState.match.node]);
      } else {
        highlightElements([]);
      }
    }, 50);
  };

  React.useEffect(() => {
    if (iframeDocument) {
      const iframeWindow = getIframeWindow();
      iframeDocument.addEventListener("click", documentOnClick);
      iframeDocument.addEventListener("scroll", onScroll);
      iframeDocument.addEventListener("dragover", onDragOver);
      iframeDocument.addEventListener("dragleave", onDragLeave);
      iframeDocument.addEventListener("mousemove", onMouseMove);
      iframeDocument.addEventListener("mouseleave", onMouseLeave);
      iframeWindow.addEventListener("resize", onResize);
      return () => {
        iframeDocument.removeEventListener("click", documentOnClick);
        iframeDocument.removeEventListener("scroll", onScroll);
        iframeDocument.removeEventListener("dragover", onDragOver);
        iframeDocument.removeEventListener("dragleave", onDragLeave);
        iframeDocument.removeEventListener("mousemove", onMouseMove);
        iframeDocument.removeEventListener("mouseleave", onMouseLeave);
        iframeWindow.removeEventListener("resize", onResize);
      };
    }
  }, [currentHoveredMatch, elementEditorState, componentTree, iframeDocument]);

  return (
    <React.Fragment>
      <AllIconDefinitions />
      <LeftNav
        getComponentTree={getComponentTree}
        iframeDocument={iframeDocument}
        showTemplatePreview={showTemplatePreview}
        hideTemplatePreview={hideTemplatePreview}
        templateEditorOpen={templateEditorOpen}
        setTemplateEditorOpen={setTemplateEditorOpen}
        dropZoneSelector={dropZoneSelector}
        drawHoverElement={(x: number, y: number, s?: string) =>
          drawHoverElement(x, y, s || dropZoneSelector)
        }
        lastHoverPosition={lastHoverPosition}
        configuration={configuration}
        elementEditorOpen={elementEditorOpen}
        setElementEditorOpen={setElementEditorOpen}
        templateCategories={configuration.templateCategories}
        elementEditorState={elementEditorState}
        setElementEditorState={(s: ElementEditorState) =>
          setElementEditorState(s)
        }
        treeViewOpen={treeViewOpen}
        setTreeViewOpen={setTreeViewOpen}
        componentTree={componentTree}
        redrawComponentTree={() => {
          return redrawComponentTree(
            configuration.treeViewIgnoreQuerySelectors
          );
        }}
        redrawHighlightedNode={(node?: Node | false) => {
          if (node === false) {
            return;
          }
          if (node === null) {
            highlightElements([]);
            return;
          }
          if (elementEditorState.match) {
            highlightElements([node || elementEditorState.match.node]);
          }
        }}
        onLeftNavClose={() => onLeftNavClose(iframeDocument)}
      />
      <iframe
        onLoad={() => {
          const iframe = getIframeDocument();
          if (!hasIframeMounted) {
            createCanvas(iframe);
            setIframeDocument(iframe);
            const scrollOffset = getOffsetTop();
            if (scrollOffset) {
              const w = getIframeWindow();
              w.scrollTo(0, scrollOffset);
            }
            iframe.body.insertAdjacentHTML(
              "beforeend",
              `
                            <div id="productdiv-template-preview" data-productdiv="true"></div>
                            <style data-productdiv="true">
                                #productdiv-template-preview {
                                    display: none;
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    margin: 5% 5%;
                                    padding: 5% 5%;
                                    width: calc(100vw - 10%) !important;
                                    background-color: inherit;
                                    z-index: 2000;
                                    box-shadow: #a7a7a7 2px 2px 20px 3px;
                                    border-radius: 10px;
                                }
                                .productdiv-drop-container::after {
                                    content: "+";
                                    text-align: center;
                                    color: black;
                                }
                                .productdiv-drop-container {
                                    min-height: 50px;
                                    min-width: 50px;
                                    width: 100%;
                                    height: 100%;
                                    background-color: #c6e3c6;
                                    border: 1px dotted #5c6064;
                                    text-align: center;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                                * {
                                    user-select: none !important;
                                }
                                .productdiv-dragging * {
                                    border: 10px solid #1a53d461 !important;
                                    border-radius: 0px !important;
                                }
                            </style>
                        `
            );
            hasIframeMounted = true;
          }
        }}
        id={iframeDocumentId}
        style={{ width: "100%", height: "100%", border: "none" }}
        srcDoc={pageSource.replace('"', '"')}
      />
      <div
        style={{ flexShrink: 0 }}
        className={classnames({ "d-none": !treeViewOpen })}
      >
        <TreeView
          setTreeViewOpen={setTreeViewOpen}
          elementEditorState={elementEditorState}
          setElementEditorOpen={setElementEditorOpen}
          setElementEditorState={(s: NodeTreeMatch) =>
            setElementEditorState({ match: s })
          }
          componentTree={componentTree}
        />
      </div>
    </React.Fragment>
  );
}
