interface ModuleDoc {
  id: string;
  jsUrl: string;
  targetSelector: string;
  active: boolean;
  version: string;
}

let modulesManifest: Array<ModuleDoc> = [];

export function fetchModulesManifest() {
  fetch('http://localhost:5657/modules')
    .then(a => a.json())
    .then(response => {
      console.info('Modules Manifest loaded');
      modulesManifest = response;
    });
}

export function loadAllModules() {
  modulesManifest.forEach(renderModule);
}

export function loadModule(id: string) {
  modulesManifest.filter(doc => doc.id === id).forEach(renderModule);
}

async function renderModule(doc: ModuleDoc) {
  try {
    const target = document.querySelector(doc.targetSelector)!;

    console.info(`Loading Application: ${doc.id}, version: ${doc.version}`);
    await loadScript(doc.jsUrl);
    (window as any).MicroApp[doc.id].render(target);
    console.info(`Module: ${doc.id} loaded successfully`);
  } catch (e) {
    console.error(`Could not load module: ${doc.id}, error: `, e);
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
