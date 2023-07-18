import React, { useEffect } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect, useParams } from 'react-router';

import {  library, search,  addCircleOutline,  chatbubbleEllipses,  apertureOutline } from 'ionicons/icons';

import io from 'socket.io-client';

let socket;
// import HomePage from '../pages/Chat';
import Chat from '../pages/Chat';
import User from './User';
import axios from 'axios';
// import Page from './Page';
// import RadioPage from './pages/RadioPage';
// import LibraryPage from './pages/LibraryPage';
// import SearchPage from './pages/SearchPage';

function Tabs() {
  useEffect(()=>{
    socket = io('https://chatversesocket.onrender.com');
  },[])
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/chat2" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/chat"  key={'uni'}  render={() =>  <Chat/>}  />
          <Route path="/user/:room/:name" render={() => <User Socket={socket} name={'vansh'} />} exact={true}   />
          <Route path="/library" key={'dddd'}  render={() => <Chat/>} exact={true} />
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

          <IonTabButton tab="library" >
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
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