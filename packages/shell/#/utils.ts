export async function loadModule(
  src: string,
  target: HTMLElement,
  moduleName: string,
) {
  try {
    await loadScript(src);
    (window as any).MicroApp[moduleName].render(target);
    console.info(`Module: ${moduleName} loaded successfully`);
  } catch (e) {
    console.error(`Could not load module: ${moduleName}, error: `, e);
  }
}

function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.onload = () => {
      resolve();
      scriptElement.remove();
    };
    scriptElement.onerror = e => {
      reject(e);
      scriptElement.remove();
    };
    document.body.appendChild(scriptElement);
  });
}
