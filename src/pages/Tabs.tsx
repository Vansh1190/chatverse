import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import {  library, search,  addCircleOutline,  chatbubbleEllipses,  apertureOutline } from 'ionicons/icons';

// import HomePage from '../pages/Chat';
import Chat from '../pages/Chat';
import User from './User';
import Page from './Page';
// import RadioPage from './pages/RadioPage';
// import LibraryPage from './pages/LibraryPage';
// import SearchPage from './pages/SearchPage';

function Tabs() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/chat2" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/chat"  key={'uni'}  render={() =>  <Chat keyop={'5'} />}  />
          <Route path="/user/:id/:name" key={'usni'}  render={() => <User/>} exact={true} />
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
           
          <IonTabButton tab="add" href="/search">
            <IonIcon size='large' icon={addCircleOutline} />
            <IonLabel></IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/library">
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
         
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Tabs;