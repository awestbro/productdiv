import * as React from "react";
import { LeftNavProps } from "./LeftNav";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/css/css";

function attributeMapToStringMap(m: NamedNodeMap): { [key: string]: string } {
  let i = 0;
  const r = [];
  while (i < m.length) {
    r.push(m[i]);
    i++;
  }
  return r.reduce((acc, v) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[v.nodeName] = v.nodeValue;
    return acc;
  }, {});
}

function toStyleMultilineString(styleString: string) {
  const lines = styleString
    .split(";")
    .map((x) => x.trim())
    .filter((x) => x !== "");
  return lines.reduce((acc, l, i) => {
    const [style, value] = l
      .split(":")
      .map((x) => x.trim())
      .filter((x) => x !== "");
    if (i === 0) {
      return `${style}: ${value};`;
    }
    return `${acc}\n${style}: ${value};`;
  }, "");
}

export function AttributeEditor(props: LeftNavProps) {
  const { elementEditorState, redrawHighlightedNode } = props;
  const element = elementEditorState.match.node as Element;
  const intialAttrs = attributeMapToStringMap(element.attributes);
  delete intialAttrs["style"];
  const [attributes, setAttribues] = React.useState(intialAttrs);

  const styles = element.attributes.getNamedItem("style")
    ? element.attributes.getNamedItem("style").value
    : "";
  const [styleString, setStyleString] = React.useState<string>(
    toStyleMultilineString(styles)
  );

  function onAttributeNameChange(
    oldName: string,
    _newName: string,
    value: string
  ) {
    const newName = _newName.trim();
    const newAttrs = { ...attributes };
    // console.log({ oldName, newName, value });
    // If name already exists or is blank, no-op
    if (newAttrs[newName] || newName.trim() === "") {
      return;
    }

    delete newAttrs[oldName];
    newAttrs[newName] = value;
    element.removeAttribute(oldName);
    element.setAttribute(newName, value);
    redrawHighlightedNode();
    delete newAttrs["style"];
    setAttribues(newAttrs);
  }

  function onAttributeValueChange(name: string, value: string) {
    const newAttrs = { ...attributes };
    newAttrs[name] = value;
    element.setAttribute(name, value);
    redrawHighlightedNode();
    delete newAttrs["style"];
    setAttribues(newAttrs);
  }

  function addAttribute() {
    const newAttrs = { ...attributes };
    newAttrs[""] = "";
    delete newAttrs["style"];
    setAttribues(newAttrs);
  }

  function removeAttribute(name: string) {
    const newAttrs = { ...attributes };
    element.removeAttribute(name);
    redrawHighlightedNode();
    delete newAttrs[name];
    delete newAttrs["style"];
    setAttribues(newAttrs);
  }

  return (
    <React.Fragment>
      <div className="container mt-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">Attributes</p>
          <button className="btn btn-secondary btn-sm" onClick={addAttribute}>
            +
          </button>
        </div>

        {Object.keys(attributes).map((a, i) => (
          <div key={i} className="row align-items-center">
            <div className="col-sm-4 px-0 text-truncate">
              <input
                onBlur={(e) =>
                  onAttributeNameChange(a, e.target.value, attributes[a])
                }
                className="form-control text-light"
                type="text"
                defaultValue={a}
              />
            </div>
            <div className="col-sm-7 px-0">
              <input
                className="form-control text-light"
                type="text"
                value={attributes[a]}
                onChange={(e) => onAttributeValueChange(a, e.target.value)}
              />
            </div>
            <div className="col-sm-1 px-0">
              <button
                style={{ height: "36px" }}
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  removeAttribute(a);
                }}
              >
                x
              </button>
            </div>
          </div>
        ))}
        <div className="row mt-3">
          <div className="col-sm-12">
            <label className="mb-2" htmlFor="style">
              Style
            </label>
            <CodeMirror
              value={styleString}
              options={{
                mode: "css",
                theme: "oceanic-next",
                lineWrapping: false,
              }}
              onBeforeChange={(editor, data, value) => {
                onAttributeValueChange("style", value.replace("\n", " "));
                setStyleString(value);
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
