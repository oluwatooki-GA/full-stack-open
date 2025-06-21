import {useEffect, useState} from 'react'
import {getCountries} from "./services/countries.js";
import {getWeather} from "./services/weather.js";


const CountryCard = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
            <Weather name={country.name.common} longitude={country.latlng[1]} latitude={country.latlng[0]}/>
        </div>
    );
};


const CountriesList = ({countries}) => {

    if (countries.length === 0) {
        return (
            <p>
                No countries Found
            </p>
        )
    } else if (countries.length === 1) {
        const country = countries[0]

        return (
            <CountryCard country={country}/>
        )
    } else if (countries.length < 10 && countries.length > 1) {
        const [showCountry, setShowCountry] = useState(null)

        const showHandler = (i) => {
            if (countries[i] === showCountry) {
                setShowCountry(null)
            } else {
                setShowCountry(countries[i])
            }

        }

        return (
            <div>
                { countries.map( (country, i) =>

                    <div style={{'margin-bottom':10}} key={country.name.official }>
                        <span style={{'margin-right':15}} >{country.name.common}</span>
                        <button onClick={() => showHandler(i)}>
                            { countries[i] === showCountry ? 'hide' : 'show' }
                            {/*show/hide*/}
                        </button>

                    </div>

                ) }
                { showCountry && <CountryCard country={showCountry}/> }
            </div>
        )
    } else if (countries.length > 10) {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        )
    }

};


const Weather = ({ name, latitude, longitude }) => {
    const [temperature, setTemperature] = useState(0)
    const [icon, setIcon] = useState('')
    const [weather, setWeather] = useState('')
    const [speedWind, setSpeedWind] = useState(0)

    useEffect(() => {
        getWeather(latitude,longitude)
            .then(response => {
                setTemperature(response.main.temp -273.15)
                setIcon(`https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`)
                setWeather(response.weather[0].description)
                setSpeedWind(response.wind.speed)
            })
    },[])

    return (
        <div>
            <h3>Weather in {name}</h3>
            <li>Temperature: {temperature.toFixed(2)} Celcius</li>
            <p>{weather}, wind: {speedWind}</p>
            <img src={icon} width={200} height={200} />
        </div>
    )
}


function App() {


    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    const inputSearch = (event) => {

        event.preventDefault()
        if (event.target.value === '') {

            setFilteredCountries([])
        }
        else {
            setFilteredCountries(countries.filter(country =>
                country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
        }
    }

    useEffect(() => {
        getCountries().then(response => setCountries(response));
    }, []);
    return (
      <>
          <input onChange={inputSearch}/>
          <CountriesList countries={filteredCountries}/>
      </>
  )
}

export default App
