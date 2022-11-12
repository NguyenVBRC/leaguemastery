import React, { useState } from 'react';
import axios from 'axios';
import'./styles.css'

export default function App() {
    const API_KEY = 'RGAPI-864fea4e-3210-4c8e-b95e-da0f5c324f92';
    const summonerIcon = 'http://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/'

    const [ searchText, setSearchText ] = useState('');
    const [ playerData, setPlayerData ] = useState({});
    
    const [ version, setVersion ] = useState('');
    // let latestVersion = version[0];

    const [ summonerId, setSummonerId ] = useState({});
    const [ masteryData, setMasteryData ] = useState({})

    // const [ champJson, setChampJson ] = useState();
    
    function SearchForPlayer(e){
        const API_PROFILE = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`
        axios.get(API_PROFILE)
            .then(function(response){
                setPlayerData(response.data); 
                setSummonerId(response.data.id);
                console.log(playerData);
                // console.log(`Encrypted Summoner ID: ${summonerId}`)
            })
            .catch(function(error){console.log(error)});
        // GetLatestVersion();
        // GetChampJson();
        // FindChampName();
    }

    // function GetLatestVersion(){
    //     axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    //         .then((response) => {
    //             setVersion(response.data)
    //             // console.log(response.data)
    //         })
    //         .catch((error) => {console.log(error)})
    // }

    // function GetChampJson(){
    //     axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`)
    //         .then((response) => {
    //             setChampJson(Object.values(response.data)[3]);
    //             // console.log(Object.values(champJson.data)[0].key)
    //             // console.log(champJson)
    //         })
    //         .catch((error) => {console.log(error)})
    // }

    // function FindChampName(){
    //     for (const key in champJson){
    //         if (champJson.hasOwnProperty(key)){
    //             console.log(`${key}: ${champJson[key].key}`)
    //         }
    //     }
    // }

    const [ test, setTest ] = useState('');

    function SearchForMastery(e){
        const API_MASTERY = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${API_KEY}`
        axios.get(API_MASTERY)
            .then((response) => {
                setMasteryData(response.data);
                setTest(masteryData[0].championId);
            })
            .catch((error) => {console.log(error)});
    }

    return (
        <div className='container'>
            <h1>League of Legends</h1>
            <p>Summoner API</p>
            <input 
                type='text' 
                onChange={e => setSearchText(e.target.value)} 
                onKeyDown={e => {if (e.key === 'Enter') {
                    SearchForPlayer(e);
                }}}
                placeholder='Enter Summoner Name'
                id='search'       
            ></input>
            <button onClick={e => SearchForPlayer(e)} id='search__button'>
                Search for Player
            </button>
            <button onClick={e => SearchForMastery(e) }id='search__button'>Search for Mastery</button>
            {JSON.stringify(playerData) !== '{}' 
                ? (<>
                    <p>{playerData.name}</p>
                    <img 
                        src={`${summonerIcon}${playerData.profileIconId}.png`}
                        alt='Summoner Icon'
                        style={{width:'100px', height: '100px'}}
                        id='summoner__icon'
                    />
                    <p>Level {playerData.summonerLevel}</p>
                  </>) 
                : (<><p>No Player Data</p></>) 
            }
            <p>{`${test}`}</p>
        </div>
    )
}