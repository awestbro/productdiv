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

export type LeftNavProps = {
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
  } = props;

  let selectedComponent;

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
          onClick={() => {
            setElementEditorState({ match: null });
            setElementEditorOpen(false);
            redrawHighlightedNode(null);
            onLeftNavClose();
          }}
        >
          PD
        </button>
        <a
          href="https://github.com/awestbro/productdiv"
          className="btn btn-sm btn-secondary me-2"
          target="__blank"
        >
          ?
        </a>
        <button
          title="Toggle Tree"
          className={classNames("btn btn-sm", {
            "btn-secondary": !treeViewOpen,
            "btn-primary": treeViewOpen,
          })}
          onClick={() => {
            setTreeViewOpen(!treeViewOpen);
            redrawHighlightedNode();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-filter-right"
            viewBox="0 0 20 20"
          >
            <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
          </svg>
        </button>
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
        <div className="my-3">
          <h4 className="text-light fw-bold h4">Actions</h4>
          <button
            className="btn btn-secondary"
            onClick={() => {
              copyElementToClipboard(iframeDocument.documentElement);
            }}
          >
            Copy All HTML
          </button>
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
