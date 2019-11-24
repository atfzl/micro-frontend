export function loadAllModules() {
  fetch('http://localhost:5984/micro-frontend/_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selector: { active: { $eq: true } } }),
  })
    .then(a => a.json())
    .then(response => {
      response.docs.forEach((doc: any) => {
        const target = document.querySelector(doc.targetSelector)!;
        renderModule(
          doc.jsUrl,
          document.querySelector(doc.targetSelector)!,
          doc.moduleName,
        );
        renderVersion(target, doc._rev);
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
      selector: { moduleName: { $eq: moduleName }, active: { $eq: true } },
    }),
  })
    .then(a => a.json())
    .then(response => {
      response.docs.forEach((doc: any) => {
        const target = document.querySelector(doc.targetSelector)!;

        renderModule(doc.jsUrl, target, doc.moduleName);
        renderVersion(target, doc._rev);
      });
    });
}

function renderVersion(target: HTMLElement, version: string) {
  if (
    target.nextSibling instanceof HTMLElement &&
    target.nextSibling.getAttribute('data-version')
  ) {
    target.nextSibling.innerText = `Rev: ${version.split('-')[0]}`;
  }
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
