export const duplicateNode = (
  nodeIndex: Record<string, any>,
  fileId: string,
  targetFolderId: string
) => {
  const source = nodeIndex[fileId];
  const target = nodeIndex[targetFolderId];

  if (!source || !target || target.type !== 'folder') return nodeIndex;

  const newId = `${fileId}-copy-${Date.now()}`;
  const newNode = {
    ...source,
    fileId: newId,
    title: {
      eng: `${source.title.eng} (copy)`,
      por: `${source.title.por} (cópia)`,
    },
    parentId: targetFolderId,
    content: source.content ? [...source.content] : undefined,
  };

  return {
    ...nodeIndex,
    [newId]: newNode,
    [targetFolderId]: {
      ...target,
      content: [...(target.content ?? []), newId],
    },
  };
};

export const searchNodes = (nodeIndex: Record<string, any>, query: string) => {
  const lower = query.toLowerCase();
  return Object.values(nodeIndex).filter(
    (node) =>
      node.title?.eng?.toLowerCase().includes(lower) ||
      node.title?.por?.toLowerCase().includes(lower)
  );
};

export const getParent = (nodeIndex: Record<string, any>, fileId: string) => {
  const node = nodeIndex[fileId];
  if (!node?.parentId) return null;
  return nodeIndex[node.parentId] ?? null;
};

export const getContent = (
  nodeIndex: Record<string, any>,
  folderId: string
) => {
  const folder = nodeIndex[folderId];
  if (!folder || folder.type !== 'folder' || !folder.content) return [];
  return folder.content.map((id: string) => nodeIndex[id]).filter(Boolean);
};
