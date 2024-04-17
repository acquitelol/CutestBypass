import logger from '@core/logger';
import validate from '@entry/validate';

function loadElement<T extends Element>(element: T) {
    (document.body || document.head || document.documentElement).appendChild(element);
}

function loadStylesheetFromURL(src: string, id = 'stylesheet') {
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = src;
    link.id = id;

    loadElement(link);
}


async function loadFromURL(src, async = false) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;

    loadElement(script);
}

loadStylesheetFromURL(chrome.runtime.getURL('core.css'), 'azalea-core-styles');
loadStylesheetFromURL(chrome.runtime.getURL('cute.css'), 'azalea-theme-styles');

logger.info('Loading Azalea...');

validate(() => loadFromURL(chrome.runtime.getURL('bundle.js')));