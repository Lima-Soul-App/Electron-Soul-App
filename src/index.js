import { app, BrowserWindow, globalShortcut, dialog, Menu, shell } from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 700,
    title: 'Soul App',
  });

  // and load the index.html of the app.
  win.loadURL('https://chat.soulapp.cn');

  // remove the menu tool
  win.setMenu(null);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  win.on('page-title-updated', (event, title) => {
    event.preventDefault();
    title.replace('Soul');
  });
};

function isQuit() {
  dialog.showMessageBox({
    type: 'info',
    title: '是否退出？',
    message: '是否退出程序？',
    buttons: ['是', '否'],
    cancelId: 2, // 点击关闭dialog
  }, (index) => {
    if (index === 0) {
      app.quit();
    }
  });
}

function FullScreen() {
  const win2 = win;
  if (win2.isMaximized() === true) {
    win2.unmaximize();
  } else {
    win2.maximize();
  }
}

function mini() {
  const win3 = win;
  win3.minimize();
}


function MenuTable() {
  const template = [
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: '关于我们',
          click() { },
        },
      ],
    },
    {
      label: '菜单',
      submenu: [{
        label: '全屏或初始化',
        accelerator: 'CmdOrCtrl+F11',
        click() {
          FullScreen();
        },
      },
      {
        label: '初始窗口',
        accelerator: 'CmdOrCtrl+F11',
        click() {
          FullScreen();
        },
      },
      {
        label: '刷新',
        accelerator: 'CmdOrCtrl+F5',
        click() {
          win.loadURL('https://chat.soulapp.cn');
        },
      },
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl + W',
        click() {
          mini();
        },
      },
      {
        label: '退出程序',
        accelerator: 'CmdOrCtrl + Q',
        click() {
          isQuit();
        },
      }],
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: '找到我',
          click() { shell.openExternal('https://github.com/JamesDream87/'); },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.on('ready', async () => {
  MenuTable();

  // 显示窗口
  globalShortcut.register('CmdOrCtrl+E', () => {
    win.show();
  });

  // 隐藏窗口
  globalShortcut.register('CmdOrCtrl+D', () => {
    if (win.isVisible() === true) {
      win.hide();
    } else {
      win.show();
    }
  });
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
