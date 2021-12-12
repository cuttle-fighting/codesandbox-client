declare module '@@__mometa*' {
  let exp: any;
  export = exp;

  export const useHeaderStatus: any;
  export const useOveringNode: any;
  export const useSelectedNode: any;
  export const api: any;
}

interface MometaData {
  start: any;
  end: any;
  name: string;
  text: string;
  filename: string;
  emptyChildren: boolean;
  hash: string;
  container?: {
    text: string;
    hash: string;
  };
}
