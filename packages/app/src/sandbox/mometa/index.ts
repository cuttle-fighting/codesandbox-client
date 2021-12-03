import type { CompileOptions } from '../compile';
import { createMometaPreset } from './preset';

export function transformCompileOptions(opts: CompileOptions) {
  const preset = createMometaPreset(opts);
  preset.initialize();

  return preset.compileOptions;
}
