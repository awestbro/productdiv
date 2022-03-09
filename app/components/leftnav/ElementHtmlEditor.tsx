import * as React from "react";
import classNames from "classnames";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { html_beautify } from "js-beautify";

import {
  getParentMatch,
  getTreeMatchFromElement,
} from "../../utilities/tree/tree-utils";
import { ElementEditorProps } from "./ElementEditor";
import { LeftNavProps } from "./LeftNav";
import { nodeListToArray } from "../../utilities/selector";
import { ChildNodeType } from "../../utilities/child-node-type";
import {
  GripVerticalIcon,
  TextOverflowIcon,
  TextWrapIcon,
} from "../common/Icons";
import {
  copyElementToClipboard,
  copyToClipboard,
  html_beautify_opts,
  sanitizeHtmlToString,
} from "../../utilities/clipboard";
import { UtilityClassEditor } from "./UtilityClassEditor";
import {
  addTemplateToElement,
  findPositionRelativeToParent,
  htmlStringToNodeList,
} from "../../utilities/dom/dom-utilities";
import { TemplateDefinition } from "../../utilities/configuration/configuration-importer";
import { PlacementType } from "../../utilities/dom/canvas";

export function ElementEditorActions(props: ElementEditorProps) {
  const {
    elementEditorState,
    redrawComponentTree,
    setElementEditorOpen,
    setElementEditorState,
    componentTree,
    redrawHighlightedNode,
    setTemplateEditorOpen,
    hideTemplatePreview,
    iframeDocument,
    lastHoverPosition,
    drawHoverElement,
  } = props;

  const onDragStart = () => {
    hideTemplatePreview();
    iframeDocument.body.classList.add("productdiv-dragging");
  };

  const onDragEnd = (template: TemplateDefinition, removeElement: Element) => {
    if (lastHoverPosition.x === 0 && lastHoverPosition.y === 0) {
      iframeDocument.body.classList.remove("productdiv-dragging");
      return;
    }

    const { placement, element } = drawHoverElement(
      lastHoverPosition.x,
      lastHoverPosition.y,
      ".productdiv-drop-container"
    );
    const placedElement = addTemplateToElement(template, element, placement);
    iframeDocument.body.classList.remove("productdiv-dragging");
    if (removeElement.nodeName !== "BODY") {
      removeElement.remove();
    }
    redrawComponentTree();
    const tree = redrawComponentTree();
    setElementEditorState({
      match: getTreeMatchFromElement(tree, placedElement),
    });
    setElementEditorOpen(true);
  };

  const element: Element = elementEditorState.match.node as Element;

  return (
    <React.Fragment>
      <div className="my-2 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => {
            const parent = getParentMatch(
              componentTree,
              elementEditorState.match
            );
            if (parent) {
              setElementEditorState({ match: parent });
              redrawHighlightedNode(parent.node);
            }
          }}
        >
          Select Parent
        </button>
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => {
            const clone = element.cloneNode(true) as Element;
            if (clone.id) {
              clone.id = clone.id + "-1";
            }
            element.after(clone);
            redrawComponentTree();
          }}
        >
          Duplicate
        </button>
        <button
          type="button"
          className={classNames("btn btn-sm btn-outline-danger", {
            disabled: element.nodeName === "BODY",
          })}
          onClick={() => {
            if (element.nodeName !== "BODY") {
              element.remove();
            }
            redrawComponentTree();
            setElementEditorOpen(false);
            setElementEditorState({ match: null });
          }}
        >
          Delete
        </button>
      </div>
      <div className="my-2 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => {
            setTemplateEditorOpen(true);
          }}
        >
          Add Element
        </button>
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => {
            copyElementToClipboard(element);
          }}
        >
          Copy HTML
        </button>
      </div>
      <div className="my-2 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => {
            copyToClipboard(element.classList.toString());
          }}
        >
          Copy Classes
        </button>
        {element.nodeName !== "BODY" ? (
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            draggable
            onDragStart={() => onDragStart()}
            onDragEnd={() =>
              onDragEnd(
                { name: "", htmlTemplate: sanitizeHtmlToString(element) },
                element
              )
            }
          >
            <GripVerticalIcon width="16" height="16" />
            Move
          </button>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export function ElementHtmlEditor(props: ElementEditorProps) {
  return (
    <div className="mt-2">
      <InnerHTMLEditor {...props} />
      <ElementEditorActions {...props} />
      <UtilityClassEditor {...props} />
    </div>
  );
}

/**
 * Changing body doesn't work
 * Wrapping an element with another doesn't work
 */
function InnerHTMLEditor(props: LeftNavProps) {
  const {
    elementEditorState,
    redrawHighlightedNode,
    iframeDocument,
    setElementEditorState,
    componentTree,
    configuration,
    getComponentTree,
    redrawComponentTree,
  } = props;

  const [text, setHTML] = React.useState("");
  const [textWrap, _setTextWrap] = React.useState<boolean>(
    localStorage.getItem("productdiv-editorwrap") === "true" || false
  );

  const element = React.useRef<Element>();
  const parentElementRef = React.useRef<Element>();
  const parentPositionRef = React.useRef(0);
  const editingElementsRef = React.useRef<ChildNode[]>([]);

  function setTextWrap(b: boolean) {
    localStorage.setItem("productdiv-editorwrap", `${b}`);
    _setTextWrap(b);
  }

  React.useEffect(() => {
    element.current = elementEditorState.match.node as Element;
    parentElementRef.current = element.current.parentElement;
    parentPositionRef.current = findPositionRelativeToParent(element.current);
    setHTML(html_beautify(element.current.outerHTML, html_beautify_opts));
    return () => {
      parentPositionRef.current = 0;
    };
  }, [elementEditorState, componentTree]);

  const extensions: Extension[] = [html()];
  if (textWrap) {
    extensions.push(EditorView.lineWrapping);
  }

  /**
   * This nasty code ensures CodeMirror always has its style loaded.
   * On first mount, it saves the styles generated by codemirror
   * On subsequent mounts, it restores those styles to fix a bug with
   * the editor not having styles on remount. I think its an issue with
   * the style-mod library CodeMirror uses, but at this point I've given up.
   */
  React.useEffect(() => {
    if (document.head.children.length > 0) {
      const style = document.head.children[0];
      const save = `<style>${style.textContent}\n.cm-scroller { max-height: 200px; height: 200px; } </style>`;
      window.sessionStorage.setItem("productdiv-html-editor-style", save);
    } else {
      const saved = window.sessionStorage.getItem(
        "productdiv-html-editor-style"
      );
      if (saved) {
        addTemplateToElement(
          { name: "", htmlTemplate: saved },
          document.head,
          PlacementType.INNER_APPEND
        );
      }
    }
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">HTML Editor</p>
        <button
          type="button"
          title="Toggle Text Wrap"
          className={classNames("btn btn-sm btn-primary")}
          onClick={() => {
            setTextWrap(!textWrap);
          }}
        >
          {textWrap ? <TextWrapIcon /> : <TextOverflowIcon />}
        </button>
      </div>
      <CodeMirror
        root={document}
        theme={oneDark}
        value={text}
        height="200px"
        maxHeight="200px"
        extensions={extensions}
        onChange={(value: string, viewUpdate: ViewUpdate) => {
          /**
           * As it so happens, calling setState after this component is mounted triggers
           * this function. This is undesirable, so if we don't have focus, dont run this logic.
           */
          if (!viewUpdate.view.hasFocus) {
            return;
          }
          if (text == value) {
            return;
          }
          setHTML(value);
          const editingBody = element.current.nodeName === "BODY";
          if (editingBody) {
            const doc = new DOMParser().parseFromString(value, "text/html");
            const iframeBody = iframeDocument.body;
            // sometimes setAttribute complains if blank attributes exist
            try {
              for (const attr of Array.from(iframeBody.attributes)) {
                iframeBody.attributes.removeNamedItem(attr.nodeName);
              }
              for (const attr of Array.from(doc.body.attributes)) {
                iframeBody.setAttribute(attr.nodeName, attr.nodeValue);
              }
            } catch (e) {
              // no-op
            }
            // If productdiv elements still available, set body changes, else don't allow commits
            if (doc.querySelectorAll("[data-productdiv]").length >= 4) {
              iframeBody.innerHTML = doc.body.innerHTML;
            }
            redrawHighlightedNode(iframeBody);
          } else {
            const newNodes = htmlStringToNodeList(value);
            const { trackedChildrenNodes, returnNode } =
              replaceParentElementChildren(
                parentElementRef.current as Element,
                element.current,
                newNodes,
                editingElementsRef.current
              );
            editingElementsRef.current = trackedChildrenNodes;
            element.current = returnNode as Element;
            redrawHighlightedNode(returnNode);
          }
        }}
        onBlur={() => {
          const editedNode = element.current;
          editingElementsRef.current = [];
          const tree = getComponentTree(
            iframeDocument,
            configuration.treeViewIgnoreQuerySelectors
          );
          redrawComponentTree();
          setElementEditorState({
            match: getTreeMatchFromElement(tree, editedNode),
          });
          redrawHighlightedNode(editedNode);
        }}
      />
    </React.Fragment>
  );
}

function replaceParentElementChildren(
  parentElement: Element,
  oldChildNode: Element | null,
  newChildNodes: NodeListOf<ChildNode>,
  trackedNodes: ChildNode[]
) {
  let returnNode: ChildNode = null;
  const trackedChildrenNodes: ChildNode[] = [];

  [...nodeListToArray(newChildNodes)].forEach((node: ChildNode) => {
    let insertedNode;
    if (oldChildNode) {
      insertedNode = parentElement.insertBefore(node, oldChildNode);
    } else {
      insertedNode = parentElement.appendChild(node);
    }
    if (
      returnNode === null &&
      insertedNode.nodeType === ChildNodeType.Element
    ) {
      returnNode = insertedNode;
    }
    trackedChildrenNodes.push(insertedNode);
  });

  trackedNodes.forEach((node) => node.remove());
  if (oldChildNode) {
    oldChildNode.remove();
  }

  returnNode =
    parentElement.children[
      Array.prototype.indexOf.call(parentElement.children, returnNode)
    ];

  return {
    returnNode,
    trackedChildrenNodes,
  };
}
