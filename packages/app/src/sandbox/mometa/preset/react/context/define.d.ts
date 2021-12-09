declare module '@@__mometa*' {
  let exp: any;
  export = exp;

  export const useHeaderStatus: any;
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

declare const enum OpType {
  DEL,
  INSERT,
}
