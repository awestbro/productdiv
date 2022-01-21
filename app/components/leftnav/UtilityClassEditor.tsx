// @ts-ignore
import * as differenceBy from "lodash/differenceBy";
import * as React from "react";
import {
  UtilityClassControl,
  UtilityClassDefinition,
} from "../../utilities/configuration/configuration-importer";
import { domTokenListToArray } from "../../utilities/selector";
import { IconAnchor, IconButton } from "../common/Components";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  QuestionIcon,
} from "../common/Icons";
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
      <hr className="mb-0" />
      {activeControl !== null && (
        <React.Fragment>
          <UtilityClassSectionList
            controls={[activeControl]}
            openDefault={true}
            keyPrefix="active-"
            {...props}
          />
        </React.Fragment>
      )}
      {queryMatchControls.length > 0 && (
        <React.Fragment>
          <UtilityClassSectionList
            controls={queryMatchControls}
            openDefault={true}
            keyPrefix="match-"
            {...props}
          />
        </React.Fragment>
      )}
      <UtilityClassSectionList
        keyPrefix="filtered-"
        controls={filteredControls}
        {...props}
      />
      {nonDefaultControls.length > 0 && (
        <React.Fragment>
          <div className="d-flex justify-content-between align-items-center my-3">
            <p className="mb-0 fs-4 fw-bold">More...</p>
            <IconButton
              type="button"
              onClick={() => {
                setNonDefaultOpen(!nonDefaultOpen);
              }}
              data-toggle="collapse"
              data-target="#nondefault-controls"
              aria-expanded={open ? "true" : "false"}
              aria-controls="nondefault-controls"
              className="btn-secondary"
            >
              {nonDefaultOpen ? (
                <ChevronDownIcon width="16" height="16" />
              ) : (
                <ChevronRightIcon width="16" height="16" />
              )}
            </IconButton>
          </div>
          {nonDefaultOpen && (
            <div id="nondefault-controls">
              <UtilityClassSectionList
                keyPrefix="nondefault-"
                controls={nonDefaultControls}
                {...props}
              />
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function UtilityClassSectionList(
  props: {
    controls: UtilityClassDefinition[];
    openDefault?: boolean;
    keyPrefix?: string;
  } & LeftNavProps
) {
  const { controls, keyPrefix = "" } = props;
  return (
    <React.Fragment>
      {controls.map((u) => (
        <UtilityClassListItem
          key={keyPrefix + u.section}
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
    keyPrefix?: string;
  } & LeftNavProps
) {
  const { utilityClassDefinition, elementEditorState, openDefault, keyPrefix } =
    props;
  const [open, setOpenState] = React.useState(openDefault || false);
  const key = `${keyPrefix}-${utilityClassDefinition.section}`;
  return (
    <React.Fragment key={key}>
      <UtilityClassHeader
        collapseId={key}
        open={open}
        toggleOpen={() => setOpenState(!open)}
        utilityClassDefinition={utilityClassDefinition}
      />
      <div
        id={key}
        style={{
          display: open ? "flex" : "none",
        }}
        className="utility-class-body"
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
    </React.Fragment>
  );
}

function UtilityClassHeader(props: {
  utilityClassDefinition: UtilityClassDefinition;
  open: boolean;
  collapseId: string;
  toggleOpen: () => void;
}) {
  const { open, toggleOpen, utilityClassDefinition, collapseId } = props;
  return (
    <div className="utility-class-section-header">
      <p className="mb-0 fw-bold">{utilityClassDefinition.section}</p>
      <div>
        {utilityClassDefinition.documentationLink ? (
          <IconAnchor
            href={utilityClassDefinition.documentationLink}
            target="__blank"
            className="btn btn-icon btn-secondary me-2"
          >
            <QuestionIcon width="16" height="16" />
          </IconAnchor>
        ) : (
          <React.Fragment />
        )}
        <IconButton
          type="button"
          onClick={toggleOpen}
          data-toggle="collapse"
          data-target={`#${collapseId}`}
          aria-expanded={open ? "true" : "false"}
          aria-controls={collapseId}
          className="btn-secondary"
        >
          {open ? (
            <ChevronDownIcon width="16" height="16" />
          ) : (
            <ChevronRightIcon width="16" height="16" />
          )}
        </IconButton>
      </div>
    </div>
  );
}
