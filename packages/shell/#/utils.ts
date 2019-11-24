export function loadAllModules() {
  fetch('http://localhost:5984/micro-frontend/_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selector: { enabled: { $eq: true } } }),
  })
    .then(a => a.json())
    .then(response => {
      response.docs.forEach((doc: any) => {
        renderModule(
          doc.jsUrl,
          document.querySelector(doc.targetSelector)!,
          doc.moduleName,
        );
      });
    });
}

export function loadModule(moduleName: string) {
  fetch('http://localhost:5984/micro-frontend/_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selector: { moduleName: { $eq: moduleName }, enabled: { $eq: true } },
    }),
  })
    .then(a => a.json())
    .then(response => {
      response.docs.forEach((doc: any) => {
        const target = document.querySelector(doc.targetSelector)!;

        renderModule(doc.jsUrl, target, doc.moduleName);
      });
    });
}

async function renderModule(
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
