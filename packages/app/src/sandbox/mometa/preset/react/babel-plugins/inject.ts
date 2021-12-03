/**
 * <Comp /> => <Comp __mometa={{ start: {line: 100, column: 11}, end: {}, text: '<Comp />' }}/>
 */
import { PluginObj } from '@babel/core';
import templateBuilder from '@babel/template';

export default function babelPluginMometaReactInject(api) {
  const { types: t } = api;

  return {
    name: 'babel-plugin-mometa-react-inject',
    visitor: {
      JSXElement(path) {
        const openingElement = path.get('openingElement');
        if (!openingElement) {
          return;
        }

        const existingProp = openingElement.node.attributes.find(
          (node: any) => node.name?.name === '__mometa'
        );
        if (existingProp) {
          return;
        }

        const objExp = templateBuilder.expression(
          JSON.stringify({
            ...path.node.loc,
            name: openingElement.get('name')?.toString(),
            text: path.toString(),
            filename: this.filename,
          })
        )();
        const newProp = t.JSXAttribute(
          t.JSXIdentifier('__mometa'),
          t.JSXExpressionContainer(objExp)
        );

        openingElement.node.attributes.push(newProp);
      },
    },
  } as PluginObj;
}
