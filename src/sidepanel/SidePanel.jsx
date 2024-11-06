import { useState, useEffect } from 'react'
import leven from 'leven'
import './SidePanel.css'
import { getGenerators } from '../menueDefinition.js'
import LocaleSelectBox from './LocaleSelectBox'
import CountrySelectBox from './CountrySelectBox'

export const SidePanel = () => {
  const [clickedElementId, setClickedElementId] = useState(null)
  const [sortedMenus, setSortedMenus] = useState([])
  const [menues, setMenues] = useState({})
  const [locale, setLocale] = useState('de-AT')
  const [country, setCountry] = useState('AT')

  function flattenGenerators(menues) {
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
  }

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

  function normalizeString(value) {
    if (!value) {
      return ''
    }

    return value.toLowerCase().replace(/\s/g, '')
  }

  function handleLocaleChange(newLocale) {
    setLocale(newLocale)
  }

  function handleCountryChange(newCountry) {
    setCountry(newCountry)
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
    setMenues(getGenerators(locale, country))
    setSortedMenus([])
  }, [locale, country])

  useEffect(() => {
    const sorted = [...flattenGenerators(menues)].sort((a, b) => {
      const id = normalizeString(clickedElementId)
      const distanceA = leven(id, normalizeString(a.menu))
      const distanceB = leven(id, normalizeString(b.menu))
      return distanceA - distanceB
    })
    setSortedMenus(sorted.slice(0, 5))
  }, [clickedElementId])

  return (
    <main>
      <h3>Fake data...</h3>
      <LocaleSelectBox onLocaleChange={handleLocaleChange} />
      <CountrySelectBox onCountryChange={handleCountryChange} />
      <div>
        <h4>Last input field</h4>
        <span>{clickedElementId ?? '-'}</span>
      </div>

      <hr />
      <div>
        <h4>Suggested generator</h4>
        <span class="info">Based on Levensthein distance between input id and generator name</span>
        <ul>
          {sortedMenus.map((item, index) => (
            <li key={index}>
              <a onClick={() => sendFill(item)}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <hr />
      <div>
        <h4>All generators</h4>

        <ul>
          {Object.keys(menues)
            .sort()
            .map((categoryKey) => {
              const category = menues[categoryKey]
              return (
                <li key={categoryKey}>
                  <span>{category.title}</span>
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
                </li>
              )
            })}
        </ul>
      </div>
    </main>
  )
}

export default SidePanel
