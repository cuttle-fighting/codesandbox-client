export type IBabel = {
  transform: (
    code: string,
    config: Object
  ) => {
    ast: Object;
    code: string;
  };
  availablePlugins: { [key: string]: Function };
  availablePresets: { [key: string]: Function };
  registerPlugin: (name: string, plugin: Function) => void;
  registerPreset: (name: string, preset: Function) => void;
  version: string;
};

export default class MometaBabelWorkerPreset {
  public _appendPlugins = [];
  // eslint-disable-next-line no-empty-function
  constructor(public opts: any) {
    this.opts = this.transformOpts(opts);
  }

  appendPlugin(name, opts?) {
    this._appendPlugins.push([name, opts]);
  }

  transformOpts(opts: any) {
    return opts;
  }

  initBabel(babel: IBabel) {}
}
