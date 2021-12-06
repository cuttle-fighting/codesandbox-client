// import {sync as visitTree} from '@moyuyc/visit-tree'

declare let BrowserFS: any;
const React = BrowserFS.BFSRequire('react') as typeof import('react');
const { useDragDropManager, useDrop } = BrowserFS.BFSRequire(
  'react-dnd'
) as typeof import('react-dnd');

export const DndNode = React.memo(({ dom }: { dom: HTMLElement }) => {
  const [str, drop] = useDrop(() => ({
    accept: ['asset'],
    // accept: [Colors.YELLOW, Colors.BLUE],
    drop(_item, monitor) {
      // onDrop(monitor.getItemType());
      return undefined;
    },
    collect: monitor => {
      // dnd 在 window.parent 环境中，当前 useDrog 在 iframe 环境中，使用 collect 返回 object，对比会出现不匹配的情况
      // {}.valueOf !== window.parent.Object.prototype.valueOf
      return JSON.stringify({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      });
    },
  }));
  const { isOver } = React.useMemo(() => JSON.parse(str), [str]);

  // eslint-disable-next-line consistent-return
  React.useLayoutEffect(() => {
    if (isOver) {
      const prev = dom.style.outline;
      dom.style.outline = '1px dashed red';
      return () => {
        dom.style.outline = prev;
      };
    }
  }, [isOver, dom]);

  const dropRef = React.useRef<any>();
  dropRef.current = drop;

  React.useLayoutEffect(() => {
    dropRef.current(dom);
  }, [dom]);

  return null;
});

export function DndLayout({ dom, children }) {
  const dragDropManager = useDragDropManager();
  React.useLayoutEffect(() => {
    const bk: any = dragDropManager.getBackend();
    bk.addEventListeners(window);
    return () => {
      bk.removeEventListeners(window);
    };
  }, [dragDropManager]);

  React.useLayoutEffect(() => {
    const ob = new MutationObserver(records => {
      // for (const record of records) {
      //   // record.type
      // }
    });
    ob.observe(dom, {
      subtree: true,
      childList: true,
    });
    return () => {
      ob.disconnect();
    };
  });

  return (
    <>
      <DndNode dom={dom} />
      {children}
    </>
  );
}
