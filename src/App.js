import React, { useEffect , useState} from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Player from './components/Player';
import { getAccessToken} from './spotify';
import {useDataLayerValue} from './DataLayer';

function App() {
  
  const [{user,token},dispatch]=useDataLayerValue();  

  useEffect(()=>{

    const _baseuri = 'https://api.spotify.com/v1';
    const hash=getAccessToken();
    window.location.hash="";
    let _token=hash.access_token;

    if(_token){
      console.log(_token)
      dispatch({
        type:"SET_TOKEN",
        token:_token,
      })

      const headers = {
        'Authorization': 'Bearer '+ _token
      };

      const getPlaylists=(id)=>{
        return axios.get(_baseuri+'/users/'+id+'/playlists',{headers})
            .then(playlists=>
              playlists.data.items
            )
      }

      const getWeekly=()=>{
        return axios.get(_baseuri + '/playlists/' + '37i9dQZEVXcLMQdbvqXxIV',{headers})
            .then(weekly=>
              weekly.data
            )
      }

      axios.get('https://api.spotify.com/v1/me',{headers})
          .then(_user=>{
            dispatch({
              type:'SET_USER',
              user:_user
            })
            const id=_user.data.id;

            getPlaylists(id)
              .then(playlists=>{
                //console.log(playlists)
                dispatch({
                  type:"SET_PLAYLISTS",
                  playlists: playlists,
                })
              })
              .catch(err=> console.log(err))

            getWeekly()
              .then(_weekly=>{
              console.log(_weekly);
                dispatch({
                  type:"SET_WEEKLY",
                  discover_weekly:_weekly,
                })
              }).catch(error=>console.log(error))

          }).catch(error=>{
            console.log(error);
          })
    }

  },[]);

  return (
    <div className="App">{
      token?(<Player/>) : (<Login/>)
    }
    </div>
  );
}

export default App;
