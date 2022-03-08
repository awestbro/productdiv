import * as React from "react";
import DropdownList from "react-widgets/DropdownList";
import Multiselect from "react-widgets/Multiselect";
import ListOption from "react-widgets/ListOption";
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
  redrawComponentTree: () => void;
  redrawHighlightedNode: () => void;
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
  redrawComponentTree: () => void;
  redrawHighlightedNode: () => void;
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
      <div className="element-editor-label">{control.name}</div>
      <DropdownList
        onSelect={(v: string) => {
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
        onChange={(v: string) => setValue(v)}
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  redrawComponentTree: () => void;
  redrawHighlightedNode: () => void;
}) {
  const { control, element, redrawComponentTree, redrawHighlightedNode } =
    props;
  const classOptions = ["", ...control.classes] || [""];
  const classList = domTokenListToArray(element.classList);
  const [restoreClass, _setRestoreClass] = React.useState("");
  const [redraw, setRedraw] = React.useState(0);
  /**
   * hoverEnabled is used to temporarily disable the hover function while a class is added
   * to an element. This prevents an issue when adding a class to an element, and hovering over the
   * next option immediately adds the preview class, which is then sent to the tree update, giving
   * the HTML editor incorrect values
   */
  const [hoverEnabled, setHoverEnabled] = React.useState(true);

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
      <div className="element-editor-label">{control.name}</div>
      <Multiselect
        data={classOptions}
        defaultValue={value}
        value={value}
        filter="contains"
        onChange={(v: string[]) => {
          setHoverEnabled(false);
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
          setTimeout(() => {
            setHoverEnabled(true);
          }, 250);
        }}
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        optionComponent={(props: any) => (
          <ListOption
            {...props}
            onMouseEnter={() =>
              hoverEnabled ? onMouseEnter(props.dataItem) : null
            }
            onMouseLeave={() =>
              hoverEnabled ? onMouseLeave(props.dataItem) : null
            }
          />
        )}
      />
    </div>
  );
}
