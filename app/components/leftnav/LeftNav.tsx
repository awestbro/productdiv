import * as React from "react";
import classNames from "classnames";

import { drawHoverElement, ElementEditorState } from "../Application";
import { ElementEditor } from "./ElementEditor";
import {
  ParsedLibraryConfigurationDefinition,
  TemplateCategoryDefinition,
} from "../../utilities/configuration/configuration-importer";
import { NodeTreeMatch } from "../../utilities/tree/tree-utils";
import { TemplateSelector } from "./TemplateSelector";
import { ProductDivLogoLarge } from "../common/Icons";
import { copyElementToClipboard } from "../../utilities/clipboard";
import { ProductDivConfig } from "../..";

export type LeftNavProps = {
  editorConfig: ProductDivConfig;
  getComponentTree(
    doc: Document,
    treeViewIgnoreQuerySelectors: string[]
  ): NodeTreeMatch[];
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

export function LeftNav(props: LeftNavProps) {
  const {
    elementEditorOpen,
    drawHoverElement,
    elementEditorState,
    setElementEditorOpen,
    setElementEditorState,
    dropZoneSelector,
    templateCategories,
    redrawComponentTree,
    lastHoverPosition,
    templateEditorOpen,
    setTemplateEditorOpen,
    showTemplatePreview,
    hideTemplatePreview,
    iframeDocument,
    setTreeViewOpen,
    treeViewOpen,
    redrawHighlightedNode,
    onLeftNavClose,
    editorConfig,
  } = props;

  let selectedComponent;

  const [dropupShow, setDropupShow] = React.useState(false);

  if (templateEditorOpen) {
    selectedComponent = (
      <TemplateSelector
        iframeDocuemnt={iframeDocument}
        showTemplatePreview={showTemplatePreview}
        hideTemplatePreview={hideTemplatePreview}
        dropZoneSelector={dropZoneSelector}
        modifyingElement={elementEditorState.match?.node}
        setTemplateEditorOpen={setTemplateEditorOpen}
        drawHoverElement={drawHoverElement}
        setElementEditorState={setElementEditorState}
        setElementEditorOpen={setElementEditorOpen}
        templateCategories={templateCategories}
        redrawComponentTree={redrawComponentTree}
        lastHoverPosition={lastHoverPosition}
      />
    );
  } else if (elementEditorOpen) {
    selectedComponent = (
      <ElementEditor {...props} setTemplateEditorOpen={setTemplateEditorOpen} />
    );
  } else {
    selectedComponent = <LeftNavMenu {...props} />;
  }

  return (
    <div
      style={{
        width: "25%",
        resize: "horizontal",
        overflow: "auto",
        flexShrink: 0,
      }}
      className="d-flex flex-column justify-content-between h-100 bg-dark text-light border-end border-dark"
    >
      <div
        className="h-100 bg-dark text-light"
        style={{ overflowX: "hidden", overflowY: "scroll" }}
        data-productdiv-ignore="true"
      >
        {selectedComponent}
      </div>
      <div
        className="d-flex flex-row justify-content-between align-items-center p-2"
        style={{
          position: "sticky",
          bottom: 0,
          boxShadow: "0px -2px 7px 0px rgb(23 23 23)",
          borderTop: "1px solid rgb(23 23 23)",
        }}
      >
        <button
          type="button"
          className="btn btn-sm btn-secondary me-2"
          title="Toggle ProductDiv"
          onClick={() => {
            setElementEditorState({ match: null });
            setElementEditorOpen(false);
            redrawHighlightedNode(null);
            onLeftNavClose();
          }}
        >
          PD
        </button>

        <div className={classNames("btn-group dropup", { show: dropupShow })}>
          <button
            type="button"
            data-bs-display="static"
            className="btn btn-secondary btn-sm dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setDropupShow(!dropupShow)}
            title="Toggle Action Menu"
          >
            Actions
          </button>
          <div
            style={{ top: "auto", bottom: "100%", marginTop: "0", right: "0" }}
            className={classNames("dropdown-menu dropdown-menu-right", {
              show: dropupShow,
            })}
          >
            <a
              className="dropdown-item"
              href="https://github.com/awestbro/productdiv"
              target="__blank"
            >
              📖 Documentation
            </a>
            <button
              className="dropdown-item"
              type="button"
              title="Copy HTML to Clipboard"
              onClick={() => {
                copyElementToClipboard(
                  iframeDocument.documentElement,
                  editorConfig.htmlFormatter
                );
                setDropupShow(false);
              }}
            >
              📋 Copy Page HTML
            </button>
            <button
              onClick={() => {
                setTreeViewOpen(!treeViewOpen);
                redrawHighlightedNode();
                setDropupShow(false);
              }}
              title="Toggle Tree"
              className="dropdown-item d-flex align-items-center"
              type="button"
            >
              <span
                className={classNames("tree-view-toggle-indicator me-1", {
                  "bg-primary": treeViewOpen,
                  "bg-secondary": !treeViewOpen,
                })}
              ></span>
              Toggle Tree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeftNavMenu(props: LeftNavProps) {
  const {
    templateCategories,
    redrawComponentTree,
    lastHoverPosition,
    dropZoneSelector,
    setElementEditorState,
    setElementEditorOpen,
    drawHoverElement,
    showTemplatePreview,
    hideTemplatePreview,
    iframeDocument,
  } = props;

  return (
    <React.Fragment>
      <div className="h-100 d-flex flex-column container">
        <div className="d-flex justify-content-between align-items-center my-3">
          <ProductDivLogoLarge />
        </div>
        <TemplateSelector
          iframeDocuemnt={iframeDocument}
          showTemplatePreview={showTemplatePreview}
          hideTemplatePreview={hideTemplatePreview}
          dropZoneSelector={dropZoneSelector}
          drawHoverElement={drawHoverElement}
          setElementEditorState={setElementEditorState}
          setElementEditorOpen={setElementEditorOpen}
          templateCategories={templateCategories}
          redrawComponentTree={redrawComponentTree}
          lastHoverPosition={lastHoverPosition}
        />
      </div>
    </React.Fragment>
  );
}
