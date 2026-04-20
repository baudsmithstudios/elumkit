export function initTui(root = document) {
  return {
    root,
    destroy() {
      return undefined;
    },
  };
}
