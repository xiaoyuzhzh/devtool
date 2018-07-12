const {app, BrowserWindow, Menu} = require('electron')
const {ipcMain} = require('electron')
ipcMain.on('send-message', (event, arg) => {
  event.sender.send('reply-message', 'hello world')
})
  
let win;

function createWindow () {   

    // 创建浏览器窗口
    win = new BrowserWindow({width: 800, height: 600})

    // 然后加载应用的 index.html。
    // 加载应用的 index.html
    const indexPageURL = `file://${__dirname}/views/index.html`;
    win.loadURL(indexPageURL);

    // 打开开发者工具
    win.webContents.openDevTools();

    //进度条图标可以用这个展示
    win.setProgressBar(0.5)

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })

    const template = [                              // 创建菜单模板
      {
          label: '查看',
          submenu: [
              {label: '竖屏', type: 'radio', checked: true},      // type 属性让菜单为 radio 可选
              {label: '横屏', type: 'radio', checked: false},
              {label: '重载',role:'reload'},
              {label: '退出',role:'quit'},
          ]
      }
  ]
  
  const menu = Menu.buildFromTemplate(template);  // 通过模板返回菜单的数组
  Menu.setApplicationMenu(menu);                  // 将该数组设置为菜单

    
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
  })

  // 在这个文件中，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。