import classNames from "classnames";
import * as React from "react";

export type TagListSelectorProps = {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (t: string | null) => any;
};

export function TagListSelector({
  tags,
  selectedTag,
  onTagSelect,
}: TagListSelectorProps) {
  return (
    <div>
      <p>Filter by Tag</p>
      {tags.map((tag) => {
        return (
          <button
            key={tag}
            className={classNames("btn btn-sm m-1", {
              "btn-secondary": tag !== selectedTag,
              "btn-primary": tag === selectedTag,
            })}
            onClick={() => {
              if (tag === selectedTag) {
                onTagSelect(null);
              } else {
                onTagSelect(tag);
              }
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
