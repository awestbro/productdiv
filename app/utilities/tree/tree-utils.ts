import { ChildNodeType } from "../child-node-type";
import { domTokenListToArray, nodeListToArray } from "../selector";

export function createComponentTree(
  doc: Document,
  rootElement: Element,
  treeViewIgnoreQuerySelectors: string[]
): NodeTreeMatch[] {
  const matchNodes = matchNodesToComponentTree([rootElement]);
  return removeIgnoredTreeMatches(
    doc,
    matchNodes,
    treeViewIgnoreQuerySelectors
  );
}

function removeIgnoredTreeMatches(
  doc: Document,
  matches: NodeTreeMatch[],
  treeViewIgnoreQuerySelectors: string[]
): NodeTreeMatch[] {
  const ignoreElements: Element[] = treeViewIgnoreQuerySelectors.reduce(
    (acc, selector) => {
      acc.push(...nodeListToArray(doc.querySelectorAll(selector)));
      return acc;
    },
    []
  );
  return removeIgnoredElementMatches(matches, ignoreElements);
}

function removeIgnoredElementMatches(
  matches: NodeTreeMatch[],
  treeViewIgnoredElements: Element[]
): NodeTreeMatch[] {
  const newMatches: NodeTreeMatch[] = [];
  matches.forEach((match) => {
    if ((match.node as Element).id === "productdiv-currently-editing") {
      newMatches.push(
        ...removeIgnoredElementMatches(match.children, treeViewIgnoredElements)
      );
    } else if (!treeViewIgnoredElements.includes(match.node as Element)) {
      newMatches.push({
        ...match,
        children: removeIgnoredElementMatches(
          match.children,
          treeViewIgnoredElements
        ),
      });
    }
  });
  return newMatches;
}

export interface NodeTreeMatch {
  name: string;
  type: string;
  node: Node;
  children: NodeTreeMatch[];
}

function matchNodesToComponentTree(nodes: Node[]): NodeTreeMatch[] {
  return nodes
    .map((node) => {
      const name = nodePrettyName(node);
      const type = `${node.nodeType}`;
      if (node.nodeType === ChildNodeType.Element) {
        if ((node as Element).hasAttribute("data-productdiv-ignore")) {
          return null;
        }
        return {
          name,
          node,
          type,
          children: matchNodesToComponentTree(nodeListToArray(node.childNodes)),
        };
      } else if (
        node.nodeType === ChildNodeType.Text &&
        node.textContent.match(/^\s+$/)
      ) {
        // Matches whitespace text nodes in HTML documents
        return null;
      } else {
        return {
          name,
          node,
          type,
          children: [],
        };
      }
    })
    .filter((n) => n != null);
}

export function nodePrettyName(node: Node): string {
  if (node.nodeType === ChildNodeType.Element) {
    const n = node as Element;
    let id = n.id ? `#${n.id}` : "";
    if (n.classList.length > 0) {
      const classString = domTokenListToArray(n.classList).reduce(
        (acc: string, curr: string) => `${acc}.${curr}`,
        ""
      );
      // return domTokenListToArray(n.classList).reduce((acc: string, curr: string) => `${acc}.${curr}`, '');
      if (n.nodeName === "DIV") {
        return `${classString}${id}`;
      } else {
        return `${n.nodeName.toLocaleLowerCase()}${classString}${id}`;
      }
    }
    return n.nodeName.toLowerCase();
  } else if (node.nodeType === ChildNodeType.Text) {
    let text = node.textContent.substring(0, 10);
    if (node.textContent.length > 10) {
      text = text + "...";
    }
    return text;
  } else {
    return "UNKNOWN";
  }
}

export function getParentMatch(
  tree: NodeTreeMatch[],
  match: NodeTreeMatch
): NodeTreeMatch {
  function find(m: NodeTreeMatch): boolean {
    if (m.children.find((ma) => ma.node === match.node)) {
      result = m;
      return true;
    }
    return m.children.some(find);
  }
  let result;
  tree.some(find);
  return result;
}

export function getTreeMatchFromElement(
  tree: NodeTreeMatch[],
  element: Node
): NodeTreeMatch {
  function find(m: NodeTreeMatch): boolean {
    if (m.node == element) {
      result = m;
      return true;
    }
    return m.children.some(find);
  }
  let result;
  tree.some(find);
  return result;
}
