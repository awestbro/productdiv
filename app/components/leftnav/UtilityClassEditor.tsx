// @ts-ignore
import * as differenceBy from "lodash/differenceBy";
import * as React from "react";
import Fuse from "fuse.js";
import { UtilityClassDefinition } from "../../utilities/configuration/configuration-importer";
import { domTokenListToArray } from "../../utilities/selector";
import { LeftNavProps } from "./LeftNav";
import { UtilityClassFormControl } from "./UtilityClassFormControls";
import DropdownList from "react-widgets/DropdownList";
import { uniq } from "lodash";
import { TagListSelector } from "../common/TagListSelector";

export function UtilityClassEditor(props: LeftNavProps) {
  const {
    configuration,
    elementEditorState,
    redrawComponentTree,
    redrawHighlightedNode,
  } = props;
  const allUtilityClasses = configuration.utilityClasses;
  const [remainingControls, setRemainingControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [filteredControls, setFilteredControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [queryMatchControls, setQueryMatchControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [activeControls, setActiveControls] = React.useState<
    UtilityClassDefinition[]
  >([]);
  const [filterText, setFilterText] = React.useState<string>("");

  const tags: string[] = uniq(
    allUtilityClasses.reduce((acc, t) => acc.concat(t.tags), [])
  ).sort();

  const [selectedTag, setSelectedTag] = React.useState<string>("");

  React.useEffect(() => {
    const selectedElement = elementEditorState.match.node as Element;
    const queryMatch: UtilityClassDefinition[] = [];
    allUtilityClasses.forEach((utilityClass) => {
      const match = utilityClass.selectors?.find((selector) =>
        selectedElement.matches(selector)
      );
      if (match) {
        queryMatch.push(utilityClass);
      }
    });
    const filtered: UtilityClassDefinition[] = differenceBy(
      allUtilityClasses,
      queryMatch,
      "name"
    );
    const activeClasses = domTokenListToArray(selectedElement.classList);
    const controlsMatchingActiveClasses = allUtilityClasses.filter(
      (utlityClass) => {
        return utlityClass.classes.some((r) => activeClasses.includes(r));
      }
    );
    setActiveControls(controlsMatchingActiveClasses);
    setRemainingControls(filtered);
    setQueryMatchControls(queryMatch);
  }, [elementEditorState.match]);

  React.useEffect(() => {
    let classesToSearch = allUtilityClasses;
    if (selectedTag) {
      classesToSearch = classesToSearch.filter((utilityClassDefinition) =>
        utilityClassDefinition.tags.includes(selectedTag)
      );
    }
    const s = new Fuse(classesToSearch, {
      keys: ["name", "tags"],
    });
    if (filterText) {
      const res = s.search(filterText);
      setFilteredControls(res.map((res) => res.item));
    } else if (selectedTag) {
      setFilteredControls(classesToSearch);
    } else {
      setFilteredControls([]);
    }
  }, [filterText, selectedTag]);

  return (
    <React.Fragment>
      <hr className="mb-0" />

      <div className="row mt-3">
        <div className="col px-2 pb-3">
          <input
            className="form-control"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            type="text"
            placeholder="Filter classes"
          />
          {/* <div className="px-2 pb-3">
            <TagListSelector
              tags={tags}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
            />
          </div> */}
          <DropdownList
            defaultValue=""
            value={selectedTag}
            data={["", ...tags]}
            onChange={setSelectedTag}
            placeholder="Filter by Tag"
          />
        </div>
      </div>

      {filteredControls.length > 0 ? (
        <UtilityClassSection
          title="Filtered Utility Classes"
          utilityClassDefinitions={filteredControls}
          element={elementEditorState.match.node as Element}
          redrawComponentTree={redrawComponentTree}
          redrawHighlightedNode={redrawHighlightedNode}
        />
      ) : (
        <React.Fragment>
          <UtilityClassSection
            title="Active Utility Classes"
            utilityClassDefinitions={activeControls}
            element={elementEditorState.match.node as Element}
            redrawComponentTree={redrawComponentTree}
            redrawHighlightedNode={redrawHighlightedNode}
          />

          <UtilityClassSection
            title="Matched Utility Classes"
            utilityClassDefinitions={queryMatchControls}
            element={elementEditorState.match.node as Element}
            redrawComponentTree={redrawComponentTree}
            redrawHighlightedNode={redrawHighlightedNode}
          />

          <UtilityClassSection
            title="Utility Classes"
            utilityClassDefinitions={remainingControls}
            element={elementEditorState.match.node as Element}
            redrawComponentTree={redrawComponentTree}
            redrawHighlightedNode={redrawHighlightedNode}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

type UtilityClassSectionProps = Pick<
  LeftNavProps,
  "redrawComponentTree" | "redrawHighlightedNode"
> & {
  title: string;
  utilityClassDefinitions: UtilityClassDefinition[];
  element: Element;
};

function UtilityClassSection(props: UtilityClassSectionProps) {
  const {
    title,
    utilityClassDefinitions,
    element,
    redrawComponentTree,
    redrawHighlightedNode,
  } = props;
  if (utilityClassDefinitions.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <p className="fw-bold mt-3">{title}</p>
      {utilityClassDefinitions.map((definition) => (
        <UtilityClassFormControl
          key={definition.name}
          element={element}
          control={definition}
          redrawComponentTree={redrawComponentTree}
          redrawHighlightedNode={redrawHighlightedNode}
        />
      ))}
    </React.Fragment>
  );
}
