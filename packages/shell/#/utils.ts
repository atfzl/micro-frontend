interface ModuleDoc {
  _id: string;
  _rev: string;
  moduleName: string;
  jsUrl: string;
  targetSelector: string;
  active: boolean;
  version: string;
}

let modulesManifest: Array<ModuleDoc> = [];

export function fetchModulesManifest() {
  fetch('http://localhost:5984/micro-frontend/_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selector: { active: { $eq: true } } }),
  })
    .then(a => a.json())
    .then(response => {
      console.info('Modules Manifest loaded');
      modulesManifest = response.docs;
    });
}

export function loadAllModules() {
  modulesManifest.forEach(renderModule);
}

export function loadModule(moduleName: string) {
  modulesManifest
    .filter(doc => doc.moduleName === moduleName)
    .forEach(renderModule);
}

async function renderModule(doc: ModuleDoc) {
  try {
    const target = document.querySelector(doc.targetSelector)!;

    console.info(
      `Loading Application: ${doc.moduleName}, version: ${
        doc._rev.split('-')[0]
      }`,
    );
    await loadScript(doc.jsUrl);
    (window as any).MicroApp[doc.moduleName].render(target);
    console.info(`Module: ${doc.moduleName} loaded successfully`);
  } catch (e) {
    console.error(`Could not load module: ${doc.moduleName}, error: `, e);
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
