import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';

const REACT_VERSION = React.version;
const REACT_MAJOR_VERSION = parseInt(REACT_VERSION.split('.')[0], 10);

export const valueIsNotNullish = (value: unknown): boolean => {
  return value !== undefined && value !== null;
};

const reactRootMap = new Map();

export const renderReactNode = (reactNode: any, target: HTMLElement) => {
  if (REACT_MAJOR_VERSION >= 18) {
    const root = ReactDOMClient.createRoot(target);
    root.render(reactNode);
    reactRootMap.set(target, root);
    return root;
  }
  return ReactDOM.render(reactNode, target);
};

export const unmountReactNode = (target: HTMLElement) => {
  if (REACT_MAJOR_VERSION >= 18) {
    const root = reactRootMap.get(target);
    if (!root) {
      return;
    }
    root.unmount();
    reactRootMap.delete(target);
  } else {
    ReactDOM.unmountComponentAtNode(target);
  }
};

export default {
  valueIsNotNullish: valueIsNotNullish,
};
