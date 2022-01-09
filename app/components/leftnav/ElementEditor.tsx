import * as React from "react";
import { ChildNodeType } from "../../utilities/child-node-type";
import * as classnames from "classnames";

import { highlightElements } from "../../utilities/dom/canvas";
import { LeftNavProps } from "./LeftNav";
import { AttributeEditor } from "./AttributeEditor";
import { ElementHtmlEditor } from "./ElementHtmlEditor";

export type ElementEditorProps = LeftNavProps & {
  setTemplateEditorOpen: (b: boolean) => void;
};

export function ElementEditor(props: ElementEditorProps) {
  const { elementEditorState } = props;
  if (!elementEditorState.match || !elementEditorState.match.node) {
    return <ElementEditorHeader {...props} />;
  }

  const { match } = elementEditorState;
  const isElement = match.node.nodeType === ChildNodeType.Element;

  const selectedDropdownIndex =
    parseInt(localStorage.getItem("productdiv-activedropdownindex")) || 0;
  const defaultDropdownState = [false, false, false];
  if (selectedDropdownIndex > defaultDropdownState.length) {
    defaultDropdownState[0] = true;
  } else {
    defaultDropdownState[selectedDropdownIndex] = true;
  }

  const [dropdownOpen, setDropdownOpen] =
    React.useState<boolean[]>(defaultDropdownState);

  function toggleShownMenu(dropdownNum: number) {
    const newState = [false, false, false];
    newState[dropdownNum] = true;
    localStorage.setItem("productdiv-activedropdownindex", `${dropdownNum}`);
    setDropdownOpen(newState);
  }

  return (
    <React.Fragment>
      <div className="h-100 d-flex flex-column container">
        <ElementEditorHeader {...props} />
        {isElement && (
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className={classnames("nav-link", { active: dropdownOpen[0] })}
                onClick={() => toggleShownMenu(0)}
                href="#"
              >
                Modify
              </a>
            </li>
            <li className="nav-item">
              <a
                className={classnames("nav-link", { active: dropdownOpen[2] })}
                onClick={() => toggleShownMenu(2)}
                href="#"
              >
                Attributes
              </a>
            </li>
          </ul>
        )}
        <div className="productdiv-scrollable-section">
          {isElement && (
            <React.Fragment>
              <div className="productdiv-selected-body">
                {dropdownOpen[0] && <ElementHtmlEditor {...props} />}
                {dropdownOpen[2] && <AttributeEditor {...props} />}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

function ElementEditorHeader(props: LeftNavProps) {
  const {
    setElementEditorOpen,
    elementEditorState,
    setElementEditorState,
    redrawHighlightedNode,
  } = props;
  if (elementEditorState.match === null) {
    return (
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4 className="mb-0 text-nowrap" style={{ textOverflow: "ellipsis" }}>
          No Component
        </h4>
        <button
          className="btn btn-sm btn-secondary"
          type="button"
          onClick={() => {
            setElementEditorOpen(false);
            setElementEditorState({ match: null });
            redrawHighlightedNode(false);
          }}
        >
          x
        </button>
      </div>
    );
  }

  const { match } = elementEditorState;

  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <h4
        className="mb-0 text-nowrap overflow-hidden"
        style={{ textOverflow: "ellipsis" }}
        onMouseEnter={() => {
          highlightElements([match.node]);
        }}
        onMouseLeave={() => highlightElements([])}
      >
        {elementEditorState.match?.name}
      </h4>
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => {
          setElementEditorOpen(false);
          setElementEditorState({ match: null });
          redrawHighlightedNode(false);
        }}
      >
        x
      </button>
    </div>
  );
}
