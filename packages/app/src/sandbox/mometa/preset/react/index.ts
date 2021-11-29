import MemotaPreset from '../memota-preset';

export default class MemotaPresetReact extends MemotaPreset {
  initialize() {
    super.initialize();

    this.prependEntryCode(
      `

    `,
      { ext: '.js' }
    );
  }
}
