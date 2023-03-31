import logo from "./logo.svg";
import { useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import styled from "styled-components";

const HomeStyled = styled.div`
  background: #989494;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  .App {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 16px;
    padding: 40px;
    margin: 0 auto;
    width: fit-content;
    background: white;

    .form-submit {
      position: relative;
    }

    .input-search {
      height: 10px;
      padding: 10px;
      border-radius: 5px;
    }

    .btn-search {
      height: 10px;
      padding: 10px;
      position: absolute;
      top: 0;
      right: 0;
      background: unset;
      border: unset;
      cursor: pointer;
    }
  }
`;

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();
  const getWeather = async () => {
    try {
      if (location === "") return;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0467b9d83975509a68e6295ccd1ac873`
      );
      setWeather(response.data);
    } catch (e) {
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <HomeStyled>
      <div className="App">
        <form onSubmit={handleSubmit} className="form-submit">
          <input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (e.target.value === "") {
                setWeather();
              }
            }}
            className="input-search"
          />
          <button onClick={getWeather} className="btn-search">
            <BsSearch color="orange" />
          </button>
        </form>
        {!!weather && (
          <>
            <img
              style={{ margin: "auto" }}
              width={100}
              height={100}
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
            />
            <li>
              Location:{" "}
              <b>
                {weather?.name} ({weather?.sys.country}
              </b>
              )
            </li>
            <li>
              {" "}
              Weather Status: <b>{weather?.weather[0].main}</b>
            </li>
            <li>
              Temp: <b>{weather?.main.temp} °C</b>
            </li>
            <li>
              Speed Wind: <b>{weather?.wind.speed}</b>
            </li>
          </>
        )}
        {weather === null && (
          <>
            <div style={{ color: "red" }}>Not found</div>
          </>
        )}
      </div>
    </HomeStyled>
  );
}

export default App;
