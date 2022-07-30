import "./App.css";
import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
  Typography,
} from "@material-ui/core";
import InfoBoxes from "./Components/InfoBoxes";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //India, United kingdom
            value: country.countryInfo.iso3, //UK USA IN FR
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);


  // to fetch world wide details when page reloads
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all/")
    .then((response) => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])


  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;
    console.log("yooooo", countryCode);

    setCountry(countryCode);

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all/"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log("country info :: ", countryInfo);

  return (
    <div className="App">
      <div className="app__left">
        <div className="header">
          <h1>COVID-19 TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onChangeCountry}
              value={country}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBoxes
            title="Coronavirus Cases"
            cases={countryInfo.active}
            total={countryInfo.cases}
          />
          <InfoBoxes
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBoxes
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <h3>I am a map</h3>
      </div>

      <Card className="app__right">
        <CardContent>
          {/* {table} */}
          {/* {graph} */}
          <h2>I am app right</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
