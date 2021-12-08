

declare module '@@__moment*' {
  let exp: any
  export = exp

  export const useHeaderStatus: any
}

interface MometaData {
  start: any,
  end: any,
  name: string,
  text: string,
  filename: string,
  emptyChildren: boolean,
  hash: string
}
