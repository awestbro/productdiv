import * as React from "react";
import { DropdownList, Multiselect } from "react-widgets";
// @ts-ignore
import * as ListOption from "react-widgets/lib/ListOption";
import { UtilityClassControl } from "../../utilities/configuration/configuration-importer";
import { domTokenListToArray } from "../../utilities/selector";

export function addClassDefinition(element: Element, classString: string) {
  if (!classString) {
    return;
  }
  const classesToAdd = classString.split(/\s+/g) || [];
  element.classList.add(...classesToAdd);
}

export function removeClassDefinition(element: Element, classString: string) {
  const classesToAdd = classString.split(/\s+/g) || [];
  element.classList.remove(...classesToAdd);
}

export function UtilityClassFormControl(props: {
  element: Element;
  control: UtilityClassControl;
  redrawComponentTree: any;
  redrawHighlightedNode: any;
}) {
  const { control } = props;
  if (control.type === "selectOne") {
    return <SelectControl {...props} />;
  } else if (control.type === "selectMany") {
    return <MultiSelectControl {...props} />;
  }
  return null;
}

function SelectControl(props: {
  control: UtilityClassControl;
  element: Element;
  redrawComponentTree: any;
  redrawHighlightedNode: any;
}) {
  const { control, element, redrawComponentTree, redrawHighlightedNode } =
    props;
  const classOptions = ["", ...control.classes] || [""];
  const classList = domTokenListToArray(element.classList);
  const [restoreClass, _setRestoreClass] = React.useState("");
  const [redraw, setRedraw] = React.useState(0);

  const foundClass =
    classList.find((c: string) => classOptions.includes(c)) || "";
  const [value, _setValue] = React.useState(foundClass);

  const valueRef = React.useRef(value);
  const setValue = (v: string) => {
    valueRef.current = v;
    _setValue(v);
  };

  const restoreClassRef = React.useRef(restoreClass);
  const setRestoreClass = (c: string) => {
    restoreClassRef.current = c;
    _setRestoreClass(c);
  };

  const onMouseEnter = (v: string) => {
    setRestoreClass(element.classList.value);
    classOptions.forEach((c) => {
      if (c !== "") {
        removeClassDefinition(element, c);
      }
    });
    addClassDefinition(element, v);
    props.redrawHighlightedNode();
  };
  const onMouseLeave = (v: string) => {
    if (valueRef.current !== v) {
      element.classList.value = restoreClassRef.current;
      setRestoreClass("");
      redrawHighlightedNode();
    }
  };

  React.useEffect(() => {
    const classList = domTokenListToArray(element.classList);
    setValue(classList.find((c: string) => classOptions.includes(c)) || "");
  }, [element, value]);

  return (
    <div className="element-editor-select-control">
      <div>{control.name}</div>
      <DropdownList
        onSelect={(v: any) => {
          classOptions.forEach((c) => {
            if (c !== "") {
              removeClassDefinition(element, c);
            }
          });
          addClassDefinition(element, v);
          setValue(v);
          setRestoreClass(element.classList.value);
          setRedraw(redraw + 1);
          redrawComponentTree();
          props.redrawHighlightedNode();
        }}
        data={classOptions}
        filter="contains"
        defaultValue={value}
        value={value}
        onChange={(v) => setValue(v)}
        // @ts-ignore
        optionComponent={(props: any) => (
          <ListOption
            {...props}
            onMouseEnter={() => onMouseEnter(props.dataItem)}
            onMouseLeave={() => onMouseLeave(props.dataItem)}
          />
        )}
      />
    </div>
  );
}

function MultiSelectControl(props: {
  control: UtilityClassControl;
  element: Element;
  redrawComponentTree: any;
  redrawHighlightedNode: any;
}) {
  const { control, element, redrawComponentTree, redrawHighlightedNode } =
    props;
  const classOptions = ["", ...control.classes] || [""];
  const classList = domTokenListToArray(element.classList);
  const [restoreClass, _setRestoreClass] = React.useState("");
  const [redraw, setRedraw] = React.useState(0);

  const foundClasses = classList.filter((c: string) =>
    classOptions.includes(c)
  );
  const [value, _setValue] = React.useState(foundClasses);

  const valueRef = React.useRef(value);
  const setValue = (v: string[]) => {
    valueRef.current = v;
    _setValue(v);
  };

  const restoreClassRef = React.useRef(restoreClass);
  const setRestoreClass = (c: string) => {
    restoreClassRef.current = c;
    _setRestoreClass(c);
  };

  const onMouseEnter = (v: string) => {
    setRestoreClass(element.classList.value);
    addClassDefinition(element, v);
    props.redrawHighlightedNode();
  };
  const onMouseLeave = (v: string[]) => {
    if (valueRef.current !== v) {
      element.classList.value = restoreClassRef.current;
      setRestoreClass("");
      redrawHighlightedNode();
    }
  };

  React.useEffect(() => {
    const classList = domTokenListToArray(element.classList);
    setValue(classList.filter((c: string) => classOptions.includes(c)));
  }, [element]);

  return (
    <div className="element-editor-select-control">
      <div>{control.name}</div>
      <Multiselect
        data={classOptions}
        defaultValue={value}
        value={value}
        filter="contains"
        onChange={(v) => {
          classOptions.forEach((c) => {
            if (c !== "") {
              removeClassDefinition(element, c);
            }
          });
          v.forEach((c) => {
            addClassDefinition(element, c);
          });
          setRestoreClass(element.classList.value);
          setRedraw(redraw + 1);
          redrawComponentTree();
          redrawHighlightedNode();
          setValue(v);
        }}
        // @ts-ignore
        optionComponent={(props: any) => (
          <ListOption
            {...props}
            onMouseEnter={() => onMouseEnter(props.dataItem)}
            onMouseLeave={() => onMouseLeave(props.dataItem)}
          />
        )}
      />
    </div>
  );
}
