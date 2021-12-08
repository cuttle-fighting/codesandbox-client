// 注册来自 parent 的额外模块
// @ts-ignore
if (window.parent?.__externals_modules) {
  // @ts-ignore
  Object.keys(window.parent?.__externals_modules).forEach(name => {
    // @ts-ignore
    const mod = window.parent?.__externals_modules[name];
    // @ts-ignore
    BrowserFS.registerFileSystem(name, mod);
  });
}
