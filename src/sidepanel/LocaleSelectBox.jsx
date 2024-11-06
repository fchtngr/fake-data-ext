import React, { useState, useEffect } from 'react'
import { allLocales } from '@faker-js/faker'

const LocaleSelectBox = ({ onLocaleChange }) => {
  const [selectedLocale, setSelectedLocale] = useState('')

  useEffect(() => {
    chrome.storage.local.get(['selectedLocale']).then((result) => {
      emitLocale(result.selectedLocale)
      setSelectedLocale(result.selectedLocale)
    })
  }, [])

  function emitLocale(newLocale) {
    if (onLocaleChange) {
      onLocaleChange(newLocale)
    }
  }

  function handleChange(event) {
    const newLocale = event.target.value
    setSelectedLocale(newLocale)
    chrome.storage.local.set({ selectedLocale: newLocale })
    emitLocale(newLocale)
  }

  const localeOptions = Object.keys(allLocales).map((locale) => (
    <option key={locale} value={locale}>
      {locale}
    </option>
  ))

  return (
    <div>
      <span>Locale: </span>
      <select value={selectedLocale} onChange={handleChange}>
        <option value="" disabled>
          Select a locale
        </option>
        {localeOptions}
      </select>
    </div>
  )
}

export default LocaleSelectBox
