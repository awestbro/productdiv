/// <reference types="react" />
export declare type TagListSelectorProps = {
    tags: string[];
    selectedTag: string | null;
    onTagSelect: (t: string | null) => any;
};
export declare function TagListSelector({ tags, selectedTag, onTagSelect, }: TagListSelectorProps): JSX.Element;
