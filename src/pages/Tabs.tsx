import { useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { search, addCircleOutline, chatbubbleEllipses, apertureOutline, gitNetwork } from 'ionicons/icons';

import io from 'socket.io-client';

let socket;
// import HomePage from '../pages/Chat';
import Chat from '../pages/Chat';
import User from './User';
import ExploreFriends from './ExploreFriends';
// import Page from './Page';
// import RadioPage from './pages/RadioPage';
// import LibraryPage from './pages/LibraryPage';
// import SearchPage from './pages/SearchPage';

function Tabs() {
  const [UserName, setUserName] = useState(undefined);
  const [RoomID, setRoomID] = useState(undefined);
  
  const getEmail = (name, roomID)=>{ 
    setUserName(name);
    setRoomID(roomID);
  }
  useEffect(() => {
    // console.log(UserName);
    if(UserName){
      socket = io('https://chatversesocket.onrender.com')
    }
    if(socket){
      socket.on('connect', ()=>{
        
        if(UserName){
          socket.emit('SetOnline',UserName)
          setUserName(undefined);
          setUserName(RoomID);
        }
      })
      if(UserName && RoomID){
        socket.emit('join_room', RoomID);
      }
    }
    }, [UserName,socket])
  return (

    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/chat2" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/chat" key={'uni'} render={() => <Chat GetEmailFunc={getEmail} Socket={socket} />} />
          <Route path="/user/:room/:name/:sender" render={() => <User Socket={socket} GetEmailFunc={getEmail} name={'vansh'} />} exact={true} />
          <Route path="/connect" key={'dddd'} render={() => <ExploreFriends />} exact={true} />
          {/* <Route path="/radio" render={() => <RadioPage />} exact={true} />
          <Route path="/library" render={() => <LibraryPage />} exact={true} />
          <Route path="/search" render={() => <SearchPage />} exact={true} /> */}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="chat" href="/chat">
            <IonIcon icon={chatbubbleEllipses} />
            <IonLabel>Chats</IonLabel>
          </IonTabButton>

          <IonTabButton tab="status" href="/user/4/This is status page under development">
            <IonIcon icon={apertureOutline} />
            <IonLabel>Status</IonLabel>
          </IonTabButton>

          <IonTabButton tab="add" >
            <IonIcon size='large' icon={addCircleOutline} />
            <IonLabel></IonLabel>
          </IonTabButton>

          <IonTabButton tab="Connect" href='/connect'>
            <IonIcon icon={gitNetwork} />
            <IonLabel>Connect</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" >
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Tabs;