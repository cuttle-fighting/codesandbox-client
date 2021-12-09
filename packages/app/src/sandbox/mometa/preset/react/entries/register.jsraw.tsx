// @ts-nocheck
import React from 'react';
import { RootProvider } from '@@__mometa-external/shared';
import { DndLayout } from '@@__mometa/dnd-utils';

const rawRender = require('react-dom').render;
require('react-dom').render = function _render(...argv) {
  const [elem, dom, cb] = argv;

  // eslint-disable-next-line no-console
  return rawRender.apply(this, [
    <RootProvider>
      <DndLayout dom={dom}>{elem}</DndLayout>
    </RootProvider>,
    dom,
    cb,
  ]);
};
