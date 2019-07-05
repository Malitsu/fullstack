import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({search, setSearch}) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <form>
        find countries <input
                          value={search}
                          onChange={handleSearchChange}    
                       />
    </form>
  )
}

const Countries = ({countries, search}) => {
    const countriesToShow = (search === '')
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

    const rows = () => countriesToShow.map(country =>
        <CountryItem
            key={country.alpha3Code}
            country={country}
        />
    )
    
    if (countriesToShow.length <= 10) {
      if (countriesToShow.length === 1) {
        return (
            <CountryEntry
              key={countriesToShow[0].alpha3Code}
              country={countriesToShow[0]}
            />
        )
      }
      else {
        return (
          <div>{rows()}</div>
        )
      }
    }

    return (
        <div><p>Too many matches, specify another filter</p></div>
      )
}

const CountryEntry = ({country}) => {

    const rows = () => country.languages.map((language, id) =>
        <li key={id}>{language.name}</li>
    )

    return (
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>{rows()}</ul>
          <img src={country.flag} alt="" width="100px" />
          <Weather
              city={country.capital}
          />
        </div>
    )
}

const Weather = ({city}) => {

  const address = "http://api.apixu.com/v1/current.json?key=bbb793c5fb2c432c88383852190507&q=".concat(city)
  const [weather, setWeather] = useState({})
  const [picture, setPicture] = useState("")

  useEffect(() => {
    axios
      .get(address)
      .then(response => {
        setWeather(response.data.current)
        setPicture("http:".concat(response.data.current.condition.icon))
      })
  }, [address] )

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p><strong>temperature:</strong> {weather.temp_c} Celcius</p>
      <img src={picture} alt="" />
      <p><strong>wind:</strong> {weather.wind_kph} kph direction {weather.wind_dir}</p>
    </div>
  )
}

const CountryItem = ({country}) => {
    return (
      <p>{country.name}</p>
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
        <Filter
          search={search}
          setSearch={setSearch}
        />
        <Countries 
          countries={countries}
          search={search} 
        />
    </div>
  )
}

export default App
