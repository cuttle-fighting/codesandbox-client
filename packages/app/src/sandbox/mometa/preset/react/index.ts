import MometaPreset from '../mometa-preset';
import './context/register';

export default class MemotaPresetReact extends MometaPreset {
  initialize() {
    super.initialize();

    this.prependEntryCode(
      // eslint-disable-next-line global-require
      require('./entries/register.jsraw'),
      {
        ext: '.jsx',
        path: '',
      }
    );
  }
}
