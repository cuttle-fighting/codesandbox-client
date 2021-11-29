import parseConfigurations from '@codesandbox/common/lib/templates/configuration/parse';
import getDefinition, { TemplateType } from '@codesandbox/common/lib/templates';
import MemotaPreset from 'sandbox/mometa/preset/memota-preset';
import MemotaPresetReact from 'sandbox/mometa/preset/react';
import type { CompileOptions } from '../../compile';

const map = new Map<TemplateType, typeof MemotaPreset>([
  ['create-react-app', MemotaPresetReact],
  ['create-react-app-typescript', MemotaPresetReact],
]);

export default function createMometaPreset(opts: CompileOptions) {
  const templateDefinition = getDefinition(opts.template);
  const configurations = parseConfigurations(
    opts.template,
    templateDefinition.configurationFiles,
    path => opts.modules[path]
  );
  const possibleEntries = templateDefinition.getEntries(configurations);
  const main = opts.isModuleView
    ? opts.entry
    : possibleEntries.find(p => Boolean(opts.modules[p]));

  const PresetClass = map.get(opts.template);
  const preset = new PresetClass(opts, { main });
  return preset;
}
