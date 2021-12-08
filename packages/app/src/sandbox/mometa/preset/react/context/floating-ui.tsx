import React from "react";
import {createPortal} from "react-dom";
import {computePosition, shift, flip, offset} from "@floating-ui/dom";
import {getScrollParents} from '@floating-ui/react-dom';
import lazy from 'lazy-value';
import {css} from "@emotion/css";
import {MometaHTMLElement, useProxyEvents} from "./dom-api";
import usePersistFn from "@rcp/use.persistfn";

export function computePos(targetElem, floatingElem) {
  return computePosition(targetElem, floatingElem, {
    placement: 'top',
    middleware: [
      shift({padding: 5}),
      offset(6),
      flip(),
    ]
  })
}

function useForceUpdate() {
  const [v, setV] = React.useState(1)
  const update = React.useCallback(() => {
    setV(x => x + 1)
  }, [setV])

  return [v, update]
}

function usePosition(dom: HTMLElement) {
  const [data, setData] = React.useState({isReady: false, rect: null})
  const [v, update] = useForceUpdate()

  React.useEffect(() => {
    const rect = dom.getBoundingClientRect()
    setData({rect, isReady: true})
    const parents = getScrollParents(dom)

    const debouncedUpdate: any = update
    parents.forEach(par => {
      par.addEventListener('resize', debouncedUpdate)
      par.addEventListener('scroll', debouncedUpdate)
    })

    return () => {
      parents.forEach(par => {
        par.removeEventListener('resize', debouncedUpdate)
        par.removeEventListener('scroll', debouncedUpdate)
      })
    }
  }, [v, dom, update])

  return data
}

const globalGetContainer = lazy(() => {
  const div = document.createElement('div')
  Object.assign(div.style, {
    position: 'fixed',
    left: 0,
    top: 0,
  })
  document.body.appendChild(div)
  return div
})

type FloatingUiProps = JSX.IntrinsicElements['div'] & {
  getContainer?: () => HTMLElement
  dom: MometaHTMLElement
  leftTopElement?: React.ReactNode
  rightTopElement?: React.ReactNode
  centerTopElement?: React.ReactNode
  centerBottomElement?: React.ReactNode
}

export function FloatingUi({centerBottomElement, centerTopElement, rightTopElement, leftTopElement, dom, getContainer = globalGetContainer, onClick, ...props}: FloatingUiProps) {
  const {isReady, rect} = usePosition(dom)
  const events = React.useMemo(() => ({onClick}), [onClick]);
  useProxyEvents(dom, events)

  return !!isReady && createPortal(
    <div
      style={{
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
      }}
      {...props}
    >
      {!!leftTopElement && <div className={css`
transform: translateY(-100%);
position: relative;
top: 1px;
left: -1px;
      `}>{leftTopElement}</div>}
      {!!rightTopElement && <div className={css`
transform: translateY(-100%);
position: relative;
top: 1px;
right: 1px;
      `}>{rightTopElement}</div>}
      {!!centerTopElement && <div className={css`
transform: translateY(-100%, -50%);
position: relative;
top: 1px;
left: 50%;
      `}>{centerTopElement}</div>}
      {!!centerBottomElement && <div className={css`
transform: translateY(-100%, -50%);
position: relative;
bottom: 1px;
left: 50%;
      `}>{centerBottomElement}</div>}
    </div>,
    getContainer()
  )
}



type OveringFloatProps = FloatingUiProps & {
  isSelected?: boolean
  onSelect?: () => void
  onDeselect?: () => void
}

export function OveringFloat({isSelected, onDeselect, onSelect, dom, getContainer, ...props}: OveringFloatProps) {
  React.useEffect(() => {
    dom.__mometa.preventEvent = false
    return () => {
      dom.__mometa.preventEvent = true
    }
  }, [dom])

  const data = React.useMemo(() => {
    return dom.__mometa.getMometaData()
  }, [dom])

  const onClickFn = usePersistFn(() => {
    // eslint-disable-next-line no-unused-expressions
    onSelect?.()
  })

  const color = isSelected ? '#5185EC' : '#6F97E7'

  return (
    <FloatingUi
      leftTopElement={(
        <div className={css`
        display: inline-flex;
        color: #fff;
        background-color: ${color};
        padding: 0px 3px;
        font-size: 12px;
        pointer-events: auto;
      `}
         title={data.text}
        >
          {data.name || 'Unknown'}
        </div>
      )}
      dom={dom}
      getContainer={getContainer}
      className={css`
        pointer-events: none;
        outline: ${isSelected ? '1px solid ' + color : '1px dashed ' + color};
      `}
      onClick={onClickFn}
    />
  )
}
