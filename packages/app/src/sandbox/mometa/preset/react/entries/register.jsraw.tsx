// @ts-nocheck
import { hmrManager } from '@@__mometa/hmr-manager';

hmrManager.mount();

const React = require('react');
const { RootProvider } = require('@@__mometa-external/shared');
const { DndLayout } = require('@@__mometa/dnd-utils');

// eslint-disable-next-line global-require
const rawRender = require('react-dom').render;

hmrManager.addMountListener(() => {
  // eslint-disable-next-line global-require
  require('react-dom').render = rawRender;
});

// eslint-disable-next-line no-unused-expressions
require('react-dom').render = function _render(...argv) {
  const [elem, dom, cb] = argv;
  // eslint-disable-next-line no-console
  console.log('render', { elem, dom });
  // eslint-disable-next-line no-console
  return rawRender.apply(this, [
    <RootProvider>
      <DndLayout dom={dom}>{elem}</DndLayout>
    </RootProvider>,
    dom,
    cb,
  ]);
};
