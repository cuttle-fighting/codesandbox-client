// @ts-nocheck
import React from 'react';
import { DndProvider } from 'react-dnd';
import { DndLayout } from '@@__moment/dnd-utils';

const rawRender = require('react-dom').render;
require('react-dom').render = function _render(...argv) {
  const [elem, dom, cb] = argv;

  // eslint-disable-next-line no-console
  return rawRender.apply(this, [
    <DndProvider>
      <DndLayout dom={dom}>{elem}</DndLayout>
    </DndProvider>,
    dom,
    cb,
  ]);
};
