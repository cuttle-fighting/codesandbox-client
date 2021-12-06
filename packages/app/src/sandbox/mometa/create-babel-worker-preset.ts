import MometaBabelWorkerPreset from 'sandbox/mometa/preset/mometa-babel-worker-preset';
import ReactBabelWorkerPreset from 'sandbox/mometa/preset/react/babelworker-preset';

const getBabelWorkerType = (opts: any) => {
  if (
    opts?.loaderOptions?.configurations?.package?.parsed?.dependencies?.react
  ) {
    return 'react';
  }
  return 'UNKNOW';
};

const bwMap = new Map<
  ReturnType<typeof getBabelWorkerType>,
  typeof MometaBabelWorkerPreset
>([
  ['react', ReactBabelWorkerPreset],
  ['UNKNOW', MometaBabelWorkerPreset],
]);

export function createMometaBabelWorkerPreset(opts: any) {
  const workerType = getBabelWorkerType(opts);
  const WorkerPreset = bwMap.get(workerType);

  const preset = new WorkerPreset(opts);
  return preset;
}
