import * as React from "react";
import * as classnames from "classnames";
import { Controlled as CodeMirror } from "react-codemirror2";
import { html_beautify } from "js-beautify";

import "codemirror/mode/htmlmixed/htmlmixed";

import {
  getParentMatch,
  getTreeMatchFromElement,
} from "../../utilities/tree/tree-utils";
import { ElementEditorProps } from "./ElementEditor";
import { LeftNavProps } from "./LeftNav";
import { nodeListToArray } from "../../utilities/selector";
import { ChildNodeType } from "../../utilities/child-node-type";
import { TextOverflowIcon, TextWrapIcon } from "../common/Icons";
import {
  copyElementToClipboard,
  copyToClipboard,
  html_beautify_opts,
} from "../../utilities/clipboard";
import { UtilityClassEditor } from "./UtilityClassEditor";
import {
  findPositionRelativeToParent,
  htmlStringToNodeList,
} from "../../utilities/dom/dom-utilities";

export function ElementHtmlEditor(props: ElementEditorProps) {
  const {
    elementEditorState,
    redrawComponentTree,
    setElementEditorOpen,
    setElementEditorState,
    componentTree,
    redrawHighlightedNode,
    setTemplateEditorOpen,
  } = props;

  const element: Element = elementEditorState.match.node as Element;

  return (
    <div className="mt-2">
      <InnerHTMLEditor {...props} />
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
          className={classnames("btn btn-sm btn-outline-danger", {
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
      </div>
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

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">HTML Editor</p>
        <button
          type="button"
          title="Toggle Text Wrap"
          className={classnames("btn btn-sm btn-primary")}
          onClick={() => {
            setTextWrap(!textWrap);
          }}
        >
          {textWrap ? <TextWrapIcon /> : <TextOverflowIcon />}
        </button>
      </div>
      <CodeMirror
        value={text}
        options={{
          mode: "htmlmixed",
          theme: "oceanic-next",
          lineWrapping: textWrap,
        }}
        onBeforeChange={(editor, data, value) => {
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
                element.current.parentNode as Element,
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
          setElementEditorState({
            match: getTreeMatchFromElement(tree, editedNode),
          });
          redrawComponentTree();
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

  return {
    returnNode,
    trackedChildrenNodes,
  };
}
