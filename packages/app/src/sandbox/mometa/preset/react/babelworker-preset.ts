import MometaBabelWorkerPreset from 'sandbox/mometa/preset/mometa-babel-worker-preset';
import babelPluginMometaReactInject from 'sandbox/mometa/preset/react/babel-plugins/inject';

export default class ReactBabelworkerPreset extends MometaBabelWorkerPreset {
  initBabel(Babel) {
    if (!Babel.availablePlugins['babel-plugin-mometa-react-inject']) {
      Babel.registerPlugin(
        'babel-plugin-mometa-react-inject',
        babelPluginMometaReactInject
      );
    }

    this.prependPlugin('babel-plugin-mometa-react-inject');
  }
}
