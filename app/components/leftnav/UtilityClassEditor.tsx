import { differenceBy } from "lodash";
import * as React from "react";
import {
  UtilityClassControl,
  UtilityClassDefinition,
} from "../../utilities/configuration/configuration-importer";
import { domTokenListToArray } from "../../utilities/selector";
import { LeftNavProps } from "./LeftNav";
import { UtilityClassFormControl } from "./UtilityClassFormControls";

export function UtilityClassEditor(props: LeftNavProps) {
  const { configuration, elementEditorState } = props;
  const allUtilityClasses = configuration.utilityClasses;
  const components = configuration.components;
  const [filteredControls, setFilteredControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [queryMatchControls, setQueryMatchControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [activeControl, setActiveControl] =
    React.useState<UtilityClassDefinition>(null);
  const [nonDefaultControls, setNonDefaultControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [nonDefaultOpen, setNonDefaultOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const selectedElement = elementEditorState.match.node as Element;
    const queryMatch: UtilityClassDefinition[] = [];
    components.forEach((c) => {
      const selectors = c.selectors || [];
      if (selectors.find((s) => selectedElement.matches(s))) {
        c.utilityClassMatches.forEach((utilityClassName) => {
          const queryMatchUc = allUtilityClasses.find(
            (uc) => uc.section === utilityClassName
          );
          if (queryMatchUc) {
            queryMatch.push(queryMatchUc);
          }
        });
      }
    });
    const filtered: UtilityClassDefinition[] = differenceBy(
      allUtilityClasses,
      queryMatch,
      "section"
    );
    const filteredDefault = filtered.filter((uc) => uc.showDefault);
    const nonDefault = filtered.filter((uc) => !uc.showDefault);
    // Active controls
    const activeControl: UtilityClassControl[] = [];
    const activeClasses = domTokenListToArray(selectedElement.classList);
    allUtilityClasses.forEach((utilityClassDefinition) => {
      const controls = utilityClassDefinition.controls;
      controls.forEach((control) => {
        const classes = control.classes || [];
        if (classes.some((r) => activeClasses.includes(r))) {
          activeControl.push(control);
        }
      });
    });
    if (activeControl.length > 0) {
      setActiveControl({
        section: "Active",
        controls: activeControl,
      });
    } else {
      setActiveControl(null);
    }

    setFilteredControls(filteredDefault);
    setQueryMatchControls(queryMatch);
    setNonDefaultControls(nonDefault);
  }, [elementEditorState.match]);

  return (
    <React.Fragment>
      <hr />
      {activeControl !== null && (
        <React.Fragment>
          <UtilityClassFormControlGrid
            controls={[activeControl]}
            openDefault={true}
            {...props}
          />
          <hr />
        </React.Fragment>
      )}
      {queryMatchControls.length > 0 && (
        <React.Fragment>
          <UtilityClassFormControlGrid
            controls={queryMatchControls}
            openDefault={true}
            {...props}
          />
          <hr />
        </React.Fragment>
      )}
      <UtilityClassFormControlGrid controls={filteredControls} {...props} />
      {nonDefaultControls.length > 0 && (
        <React.Fragment>
          <div className="d-flex justify-content-between align-items-center my-3">
            <p className="mb-0 fs-4 fw-bold">More...</p>
            <button
              className="btn btn-sm btn-secondary"
              type="button"
              onClick={() => {
                setNonDefaultOpen(!nonDefaultOpen);
              }}
            >
              {nonDefaultOpen ? "v" : ">"}
            </button>
          </div>
          {nonDefaultOpen && (
            <React.Fragment>
              <hr />
              <UtilityClassFormControlGrid
                controls={nonDefaultControls}
                {...props}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function UtilityClassFormControlGrid(
  props: {
    controls: UtilityClassDefinition[];
    openDefault?: boolean;
  } & LeftNavProps
) {
  const { controls, openDefault } = props;
  return (
    <React.Fragment>
      {controls.map((u) => (
        <UtilityClassListItem
          key={u.section}
          utilityClassDefinition={u}
          {...props}
        />
      ))}
    </React.Fragment>
  );
}

function UtilityClassListItem(
  props: {
    utilityClassDefinition: UtilityClassDefinition;
    openDefault?: boolean;
  } & LeftNavProps
) {
  const { utilityClassDefinition, elementEditorState, openDefault } = props;
  const [open, setOpenState] = React.useState(openDefault || false);
  return (
    <div className="mb-3" key={utilityClassDefinition.section}>
      <UtilityClassHeader
        open={open}
        toggleOpen={() => setOpenState(!open)}
        utilityClassDefinition={utilityClassDefinition}
      />
      {open ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "flex-end",
          }}
        >
          {utilityClassDefinition.controls.map((control) => (
            <UtilityClassFormControl
              key={control.name}
              element={elementEditorState.match.node as Element}
              control={control}
              redrawComponentTree={props.redrawComponentTree}
              redrawHighlightedNode={props.redrawHighlightedNode}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function UtilityClassHeader(props: {
  utilityClassDefinition: UtilityClassDefinition;
  open: boolean;
  toggleOpen: () => void;
}) {
  const u = props.utilityClassDefinition;
  const { open, toggleOpen } = props;
  return (
    <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
      <h4 className="text-decoration-underline mb-0">{u.section}</h4>
      <div>
        {u.documentationLink ? (
          <a
            href={u.documentationLink}
            target="__blank"
            className="btn btn-secondary btn-sm me-2"
          >
            ?
          </a>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={toggleOpen}
          className="btn btn-secondary btn-sm"
        >
          {open ? "v" : ">"}
        </button>
      </div>
    </div>
  );
}
