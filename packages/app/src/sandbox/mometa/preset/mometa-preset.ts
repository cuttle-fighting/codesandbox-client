import type { CompileOptions } from '../../compile';

interface MemotaPresetConfig {
  main: string;
}

export default class MometaPreset {
  public id: number;
  constructor(
    public compileOptions: CompileOptions,
    protected config: MemotaPresetConfig
  ) {
    this.id = 1;
  }

  readPkg() {
    const modules = this.compileOptions.modules;
    return JSON.parse(modules['/package.json'].code);
  }

  initialize() {}

  writePkg(pkg) {
    const modules = this.compileOptions.modules;
    modules['/package.json'].code = JSON.stringify(pkg, null, 2);
  }

  addModule(code, path) {
    const modules = this.compileOptions.modules;
    modules[path] = {
      code,
      path,
    };
  }

  addDeps(deps: Record<any, any>) {
    if (!deps) {
      return;
    }
    const pkg = this.readPkg();
    pkg.dependiences = pkg.dependiences || {};
    Object.assign(pkg.dependiences, deps);
    this.writePkg(pkg);
  }

  prependEntryCode(
    code: string,
    {
      ext,
      deps,
      path,
    }: { deps?: Record<any, any>; ext?: string; path?: string }
  ) {
    const modules = this.compileOptions.modules;
    const mod = modules[this.config.main];

    const name = path || `__prepend/mod-${this.id++}${ext}`;
    this.addModule(code, `/${name}`);

    mod.code = [`import ${JSON.stringify(`./${name}`)};`, mod.code].join('\n');

    this.addDeps(deps);
  }
}
