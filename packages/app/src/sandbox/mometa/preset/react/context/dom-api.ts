import { EventEmitter } from 'events'
import React from "react";
import {parseReactDomNode} from "sandbox/mometa/utils/dom-api";
// eslint-disable-next-line consistent-return
const findClosest = (from: MometaHTMLElement, isPass: (v: MometaHTMLElement) => boolean) => {
  let t = from
  while (t) {
    if (isPass(t)) {
      return t
    }
    t = t.parentElement as any
  }
}

export class MometaDomApi extends EventEmitter {
  constructor(public dom: HTMLElement) {
    super()
  }

  protected _preventDefault = (evt) => {
    const closestPass = findClosest(evt.target, x => x.__mometa && !x.__mometa.preventEvent)
    if (closestPass) {
      closestPass.__mometa.emit(evt.type, evt)
    }
    evt.stopPropagation()
    evt.preventDefault()
  }

  public preventEvent = true

  public preventDefaultPop(event: string) {
    this.dom.addEventListener(event, this._preventDefault, true)
    return () => {
      this.dom.removeEventListener(event, this._preventDefault, true)
    }
  }

  public getMometaData(): MometaData {
    return parseReactDomNode(this.dom)?.props?.__mometa
  }
}

export type MometaHTMLElement<T extends HTMLElement = HTMLElement> = T & { __mometa: MometaDomApi }



/**
 * 为了不修改原有 dom 事件，使用自定义的发布订阅模拟实现 dom 事件
 * @param dom
 * @param events
 */
export function useProxyEvents(dom: MometaHTMLElement, events: Pick<JSX.IntrinsicElements['div'], 'onClick'>) {
  React.useEffect(() => {
    if (!events) {
      return () => {}
    }

    const disposes = []
    for (const [name, fn] of Object.entries(events)) {
      let tName = name.toLowerCase()
      // const isCapture = tName.endsWith('capture')
      tName = tName.replace(/^on/, '')
        .replace(/capture$/, '')

      dom.__mometa.addListener(tName, fn)
      disposes.push(() => {
        dom.__mometa.removeListener(tName, fn)
      })
    }
    return () => {
      disposes.forEach(fn => fn())
    }
  }, [dom, events])
}
