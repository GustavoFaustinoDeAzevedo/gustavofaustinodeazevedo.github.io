import { gsap } from 'gsap';
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import { createContextMenu } from '/src/components/contextMenu.js';
import { newTextFile, textFile } from '/src/projects/txt.js';

gsap.registerPlugin(Draggable, Observer);

// Window Management
const windows = document.querySelectorAll('.window');
const taskbar = document.querySelector('.taskbar');
const taskbarItems = document.querySelector('.taskbar-items');
const desktopContextMenu = createContextMenu([
  {
    label: 'View',
    icon: 'icon window-icon',
    action: 'view',
    handler: () => console.log('View options clicked')
  },
  {
    label: 'Sort By',
    icon: 'icon sort-icon',
    action: 'sort',
    handler: () => console.log('Sort options clicked')
  },
  {
    label: 'Refresh',
    icon: 'icon refresh-icon',
    action: 'refresh',
    handler: () => window.location.reload()
  },
  { separator: true },
  {
    label: 'New',
    icon: 'icon new-icon',
    action: 'refresh',
    handler: () => window.location.reload()
  },
]);
const windowContextMenu = createContextMenu([
  {
    label: 'Minimize',
    icon: 'bi bi-dash',
    action: 'minimize',
    handler: (window) => toggleWindow(window)
  },
  {
    label: 'Maximize',
    icon: 'bi bi-square',
    action: 'maximize',
    handler: (window) => window.classList.add('maximized')
  },
  {
    label: 'Restore',
    icon: 'bi bi-square',
    action: 'restore',
    handler: (window) => window.classList.remove('maximized')
  },
  { separator: true },
  {
    label: 'Close',
    icon: 'bi bi-x',
    action: 'close',
    handler: (window) => {
      window.classList.add('hidden');
      window.classList.remove('active');
      updateTaskbarItems();
    }
  }
]);

let activeWindow = null;
let zIndex = 10;

// Initialize windows with random positions
windows.forEach(window => {

  // Add event listener to bring window to front on mousedown
  window.addEventListener('mousedown', (e) => {
    // Prevent default behavior to avoid conflicts
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
    bringToFront(window);
  });

  // Randomize window position
  const x = Math.floor(Math.random() * (window.parentNode.offsetWidth / 2));
  const y = Math.floor(Math.random() * (document.body.offsetHeight / 4));
  window.style.transform = `translate(${x}px, ${y}px)`;

  Draggable.create(window, {
    trigger: (window.querySelector(".window-header")),
    bounds: ".desktop",
    inertia: true,
    onPress: () => bringToFront(window),
    allowContextMenu: true
  });

  function enableResize(handle, directionX, directionY) {
    if (!handle) return; // Prevent errors if handle is not found

    Observer.create({
      target: handle,
      type: "pointer",
      onPress: (self) => {
        let startX = self.x;
        let startY = self.y;
        let startWidth = window.offsetWidth;
        let startHeight = window.offsetHeight;
        const taskbarTop = taskbar.getBoundingClientRect().top;

        let moveObserver = Observer.create({
          type: "pointer",
          onMove: (moveSelf) => {
            if (directionX) {
              let newWidth = Math.max(150, startWidth + (moveSelf.x - startX));
              window.style.width = newWidth + "px";
            }
            if (directionY && self.y < taskbarTop) {
              let newHeight = Math.max(100, startHeight + (moveSelf.y - startY));
              window.style.height = newHeight + "px";
            }
          },
          onRelease: () => {
            let heightDiff = window.getBoundingClientRect().bottom - taskbarTop;
            if (window.getBoundingClientRect().bottom > taskbarTop) {
              window.style.height = (window.offsetHeight - heightDiff) + "px";
            }
            moveObserver.kill(); // Remove apenas o movimento, mantendo os listeners de resize
          }
        });
      }
    });
  }

  enableResize(window.querySelector(".resize-right"), true, false);
  enableResize(window.querySelector(".resize-bottom"), false, true);
  enableResize(window.querySelector(".resize-corner"), true, true);

  // Add context menu to window headers
  window.querySelector('.window-header').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;

    // Update menu items based on window state
    const items = [...windowContextMenu.getItems()];
    const maximizeIndex = items.findIndex(item => item.action === 'maximize');
    const restoreIndex = items.findIndex(item => item.action === 'restore');

    if (window.classList.contains('maximized')) {
      items[restoreIndex].label = 'Restore';
      items[restoreIndex].action = 'restore';
    } else {
      items[maximizeIndex].label = 'Maximize';
      items[maximizeIndex].action = 'maximize';
    }

    windowContextMenu.setItems(items);
    windowContextMenu.show(clientX, clientY, window);
  });

});

// Window Controls
function getIconClassForWindow(windowType) {
  const iconMap = {
    about: `icon about-icon`,
    projects: 'icon projects-icon',
    skills: 'icon skills-icon',
    contact: 'icon contact-icon',
  };
  return iconMap[windowType] || 'icon window-icon';
}

function createTaskbarItem(window) {
  const windowType = window.dataset.window;
  const item = document.createElement('div');
  item.className = 'taskbar-item';
  item.innerHTML = `
    <i class="${getIconClassForWindow(windowType)}"></i>
    <span>${windowType}</span>
  `;
  item.addEventListener('click', () => toggleWindow(window));
  return item;
}

function toggleWindow(window) {
  if (window.classList.contains('minimized')) {
    window.classList.remove('minimized');
    window.classList.add('active');
    bringToFront(window);
  } else {
    window.classList.add('minimized');
    window.classList.remove('active');
  }
  updateTaskbarItems();
}

function bringToFront(window) {
  window.style.zIndex = ++zIndex;
  window.classList.add('active');
  activeWindow = window;
  updateTaskbarItems();
}

function updateTaskbarItems() {
  taskbarItems.innerHTML = '';
  windows.forEach(window => {
    if (!window.classList.contains('hidden')) {
      const item = createTaskbarItem(window);
      if (window === activeWindow) {
        item.classList.add('active');
      }
      taskbarItems.appendChild(item);
    }
  });
}

// Desktop Icons
document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const windowId = icon.dataset.window;
    const window = document.querySelector(`.window[data-window="${windowId}"]`);
    if (window) {
      window.classList.remove('minimized', 'hidden');
      window.classList.add('active');
      bringToFront(window);
    }
  });
});

// Window Controls
document.querySelectorAll('.window-controls .close').forEach(button => {
  button.addEventListener('click', () => {
    const window = button.closest('.window');
    window.classList.add('hidden');
    setTimeout(() => {
      window.classList.remove('active');
      updateTaskbarItems();
    }, 80);
  });
});

document.querySelectorAll('.window-controls .minimize').forEach(button => {
  button.addEventListener('click', () => {
    const window = button.closest('.window');
    toggleWindow(window);
  });
});

document.querySelectorAll('.window-controls .maximize').forEach(button => {
  button.addEventListener('click', () => {
    const window = button.closest('.window');
    const classChange = window.querySelector('.maximize').querySelector('.icon').classList;
    window.classList.toggle('maximized');
    classChange.toggle('maximize-icon');
    classChange.toggle('restore-icon');
  });
});

// Clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.querySelector('.clock').textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock();

// Initial animations
gsap.from('.desktop-icon', {
  duration: 0.5,
  opacity: 0,
  y: 20,
  stagger: 0.1,
  ease: 'power2.out'
});



// Hide context menu when clicking outside
// document.addEventListener('click', (e) => {
//   if (!e.target.closest('.context-menu')) {
//     hideContextMenu();
//   }
// });

// Desktop context menu
document.querySelector('.desktop').addEventListener('contextmenu', (e) => {
  if (!e.target.closest('.window') && !e.target.closest('.taskbar')) {
    e.preventDefault();
    desktopContextMenu.show(e.clientX, e.clientY);
  }
});