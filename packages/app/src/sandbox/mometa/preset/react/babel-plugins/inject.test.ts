import { transform } from '@babel/core';
import babelPluginMometaReactInject from './inject';

describe('babel-inject', () => {
  it('spec', function () {
    const rs = transform(
      `
    const elem = <div>
      <h1 title={'abc'}>Hello World</h1>
      <Tabs>
      <Tabs.TabPane key={'tool'} tab={'物料'}>
        <p>物料</p>
        <p className='empty'></p>
      </Tabs.TabPane>
      <Tabs.TabPane key={'attr'} tab={'属性'}></Tabs.TabPane>
      </Tabs>
    </div>
    `,
      {
        filename: '/file.jsx',
        parserOpts: {
          plugins: ['jsx'],
        },
        babelrc: false,
        plugins: [babelPluginMometaReactInject],
      }
    );

    expect(rs.code).toMatchSnapshot();
  });
});
