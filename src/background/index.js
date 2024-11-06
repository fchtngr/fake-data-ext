import { menues } from '../menueDefinition.js'

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'root',
    title: 'Random data...',
    contexts: ['editable'],
  })

  Object.keys(menues).forEach((parentKey) => {
    const parent = menues[parentKey]
    chrome.contextMenus.create({
      id: parentKey,
      parentId: 'root',
      title: parent.title,
      contexts: ['editable'],
    })

    Object.keys(parent.menues).forEach((childKey) => {
      const child = parent.menues[childKey]
      chrome.contextMenus.create({
        id: `${parentKey}-${childKey}`,
        parentId: parentKey,
        title: child.title,
        contexts: ['editable'],
      })
    })
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const [parentKey, childKey] = info.menuItemId.split('-')
  const menues = menues
  const generator = menues[parentKey].menues[childKey].generator
  const config = menues[parentKey].menues[childKey].config

  if (config) {
    runScript(info, tab, generator(config))
  } else {
    runScript(info, tab, generator())
  }
})

function runScript(info, tab, value) {
  chrome.tabs.sendMessage(
    tab.id,
    { type: 'fillFromContextMenu', value: value },
    { frameId: info.frameId },
  )
}
