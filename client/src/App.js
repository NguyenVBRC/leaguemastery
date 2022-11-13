import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const API_KEY = "RGAPI-3b16c2b7-f822-4e11-bef7-693e181035b9";
  const summonerIcon =
    "http://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/";

  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});

  const [version, setVersion] = useState("");
  //   let latestVersion = version[0];

  const [summonerId, setSummonerId] = useState({});
  const [masteryData, setMasteryData] = useState({});

  const [champJson, setChampJson] = useState();

  function GetLatestVersion() {
    axios
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((response) => {
        setVersion(response.data[0]);
        // console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function GetChampJson() {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      )
      .then((response) => {
        setChampJson(Object.values(response.data)[3]);
        // console.log(Object.values(champJson)[0].key);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function SearchForPlayer(e) {
    const API_PROFILE = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`;
    axios
      .get(API_PROFILE)
      .then(function (response) {
        setPlayerData(response.data);
        setSummonerId(response.data.id);
        console.log(playerData);
        // console.log(`Encrypted Summoner ID: ${summonerId}`)
      })
      .catch(function (error) {
        console.log(error);
      });
    // GetLatestVersion();
    // GetChampJson();
    // FindChampName();
  }

  // function FindChampName(){
  //     for (const key in champJson){
  //         if (champJson.hasOwnProperty(key)){
  //             console.log(`${key}: ${champJson[key].key}`)
  //         }
  //     }
  // }

  function SearchForMastery(e) {
    const API_MASTERY = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${API_KEY}`;
    axios
      .get(API_MASTERY)
      .then((response) => {
        setMasteryData(response.data);
        console.log(masteryData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (version === "") {
      GetLatestVersion();
    }
  });

  useEffect(() => {
    GetChampJson();
    console.log(champJson);
  }, [version]);

  return (
    <div className="container">
      <h1>MOBA.Game.API</h1>
      <p>Summoner API</p>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            SearchForPlayer(e);
          }
        }}
        placeholder="ID"
        id="search"
      ></input>
      <button onClick={(e) => SearchForPlayer(e)} id="search__button">
        Search ID
      </button>
      <button onClick={(e) => SearchForMastery(e)} id="search__button">
        Search Mastery
      </button>
      <button onClick={(e) => GetChampJson(e)} id="search__button">
        Get Mastery
      </button>
      {JSON.stringify(playerData) !== "{}" ? (
        <>
          <p>{playerData.name}</p>
          <img
            src={`${summonerIcon}${playerData.profileIconId}.png`}
            alt="Summoner Icon"
            style={{ width: "100px", height: "100px" }}
            id="summoner__icon"
          />
          <p>Level {playerData.summonerLevel}</p>
        </>
      ) : (
        <>
          <p>No Player Data</p>
        </>
      )}
    </div>
  );
}
