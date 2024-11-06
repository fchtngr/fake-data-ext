import { useState, useEffect } from 'react'
import leven from 'leven'
import './SidePanel.css'
import { menues } from '../menueDefinition.js'

export const SidePanel = () => {
  const flattenedMenus = ((menues) => {
    const result = []

    Object.keys(menues).forEach((categoryKey) => {
      const category = menues[categoryKey]
      Object.keys(category.menues).forEach((menuKey) => {
        const menu = category.menues[menuKey]
        result.push({
          category: category.title,
          menu: menu.title,
          generator: menu.generator,
          config: menu.config || {},
          name: `${category.title} > ${menu.title}`,
        })
      })
    })

    return result
  })(menues)

  const [clickedElementId, setClickedElementId] = useState(null)
  const [sortedMenus, setSortedMenus] = useState(flattenedMenus)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  function sendFill(menuItem) {
    if (!menuItem.generator) {
      return
    }

    const value = menuItem.config ? menuItem.generator(menuItem.config) : menuItem.generator()

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'fillLastInput',
        elementId: clickedElementId,
        value: value,
      })
    })
  }

  useEffect(() => {
    // Listen for messages from the content script
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type === 'updateClickedElement') {
        setClickedElementId(message.value)
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    // Cleanup listener on component unmount
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  useEffect(() => {
    const sorted = [...flattenedMenus].sort((a, b) => {
      console.log('leven', a, b, clickedElementId)
      const id = clickedElementId ?? ''
      const distanceA = leven(id, a.menu)
      const distanceB = leven(id, b.menu)
      console.log('distance:', distanceA - distanceB)
      return distanceA - distanceB
    })
    setSortedMenus(sorted)
  }, [clickedElementId])

  return (
    <main>
      <h3>Fake data...</h3>
      <h4>Input: {clickedElementId ?? '-'}</h4>

      <ul>
        {sortedMenus.map((item, index) => (
          <li key={index}>
            <a onClick={() => sendFill(item)}>{item.name}</a>
          </li>
        ))}
      </ul>

      {/* <div>
        {Object.keys(menues)
          .sort()
          .map((categoryKey) => {
            const category = menues[categoryKey]
            return (
              <div key={categoryKey}>
                <h4>{category.title}</h4>
                <ul>
                  {Object.keys(category.menues)
                    .sort()
                    .map((menuKey) => {
                      const menu = category.menues[menuKey]
                      return (
                        <li>
                          <a onClick={() => sendFill(menu)} key={menuKey}>
                            {menu.title}
                          </a>
                        </li>
                      )
                    })}
                </ul>
              </div>
            )
          })}
      </div> */}
    </main>
  )
}

export default SidePanel
