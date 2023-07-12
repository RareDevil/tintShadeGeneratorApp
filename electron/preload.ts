const { ipcRenderer, shell } = require('electron')

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise(resolve => {
        if (condition.includes(document.readyState)) {
            resolve(true)
        }
        else {
            document.addEventListener('readystatechange', () => {
                if (condition.includes(document.readyState)) {
                    resolve(true)
                }
            })
        }
    })
}

const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
        if (!Array.from(parent.children).find(e => e === child)) {
            parent.appendChild(child)
        }
    },
    remove(parent: HTMLElement, child: HTMLElement) {
        if (Array.from(parent.children).find(e => e === child)) {
            parent.removeChild(child)
        }
    },
}

/**
 * https://cssloaders.github.io
 */
function useLoading() {
    const styleContent = `
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
.loader {
  position: relative;
  display: inline-block;
}
.loader::before {
  
  content: 'Loading';
  color: #FFF;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 48px;
  letter-spacing: 2px;
  display: inline-block;
  box-sizing: border-box;
  animation: floating 1s ease-out infinite alternate;
}
.loader::after {
  content: '';  
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 0;
  top: 100%;
  filter: blur(4px);
  border-radius: 50%;
  box-sizing: border-box;
  animation: animloader 1s ease-out infinite alternate;
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-25px);
  }
}

@keyframes animloader {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.2);
  }
}`;
    const oStyle = document.createElement('style')
    const oDiv = document.createElement('div')

    oStyle.id = 'app-loading-style'
    oStyle.innerHTML = styleContent
    oDiv.className = 'app-loading-wrap'
    oDiv.innerHTML = `<span class="loader"></span>`

    return {
        appendLoading() {
            safeDOM.append(document.head, oStyle)
            safeDOM.append(document.body, oDiv)
        },
        removeLoading() {
            safeDOM.remove(document.head, oStyle)
            safeDOM.remove(document.body, oDiv)
        },
    }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
    ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)

window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.main-top-frame-button');
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            element.addEventListener('click', () => {
                console.log('testing');
                ipcRenderer.send('window-controls', {
                    action: element.dataset.action,
                });
            });
        }
    }
    document.addEventListener('click', function (event) {
        if (event !== null && event.target !== null && event.target instanceof HTMLAnchorElement) {
            if (event.target.tagName === 'A' && event.target.href.startsWith('http') && !event.target.href.startsWith(window.location.origin)) {
                event.preventDefault();
                shell.openExternal(event.target.href).then();
            }   
        }
    })
})
