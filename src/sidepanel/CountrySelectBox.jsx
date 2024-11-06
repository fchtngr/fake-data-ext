import React, { useEffect, useState } from 'react'
import { countries } from './countries'

const CountrySelectBox = ({ onCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    chrome.storage.local.get(['selectedCountryCode']).then((result) => {
      emitCountryCode(result.selectedCountryCode)
      setSelectedCountry(result.selectedCountryCode)
    })
  }, [])

  function emitCountryCode(country) {
    if (onCountryChange) {
      onCountryChange(country)
    }
  }

  function handleChange(event) {
    const newCountry = event.target.value
    setSelectedCountry(newCountry)
    chrome.storage.local.set({ selectedCountryCode: newCountry })
    emitCountryCode(newCountry)
  }

  const countryOptions = countries.map((country) => (
    <option key={country.code} value={country.code}>
      {country.name}
    </option>
  ))

  return (
    <div>
      <span>Country:</span>
      <select value={selectedCountry} onChange={handleChange}>
        <option value="" disabled>
          Select a country
        </option>
        {countryOptions}
      </select>
    </div>
  )
}

export default CountrySelectBox
