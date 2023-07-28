import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Signup from './pages/Signup';
import Tabs from './pages/Tabs';
import Signin from './pages/Signin';
// import Chat from './pages/Chat';
import Verify from './pages/Verify';
// import UserChat from './pages/User';
import OneSignal from 'onesignal-cordova-plugin';
import { useEffect, useState } from 'react';
setupIonicReact();

const App: React.FC = () => {


  // const [UserID, setUserID] = useState('');

  // function OneSignalInit(): void {
  //   OneSignal.setAppId("a7443046-e175-4adf-8de9-c2a296e35359");
  //   OneSignal.setNotificationOpenedHandler(function (jsonData) {
  //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  //   });

  //   // Prompts the user for notification permissions.
  //   //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  //   OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
  //     console.log("User accepted notifications: " + accepted);
  //     OneSignal.addSMSSubscriptionObserver((observer) => {
  //       // OneSignal.
  //     })
  //     OneSignal.addSubscriptionObserver(event => {
  //       console.log("OneSignal: subscription changed to userId:", event.to.userId);
        
  //       OneSignal.getDeviceState((ds) => {
  //         console.log('Device State ' + ds.userId);
  //         setUserID(ds.userId);
  //         localStorage.setItem("user", ds.userId);
  //       });
  //     });
  //   });
  // }
  // useEffect(()=>{
  //   console.log("OneSignal: subscription  userId:", UserID);

  // },[UserID]);
  // // setTimeout(()=>{ 
  //   //   setUserID('0b79eedf-ac1e-474d-ad65-ae6662297e9d')
  //   // },2000)
    
  //   OneSignalInit();
    
    // OneSignalInit();


  return (
    <IonApp>
      
        <IonReactRouter>
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            <Route path="/" component={Page} />
            <Route path="/signup" component={Signup} />
            <Route path="/verify" component={Verify} />
            {/* <Route path="/tabs" component={Tabs} /> */}
            <Route path="/signin" key={'15'} component={Signin} />
            <Route path="/chat" key={'15'} component={Tabs} />
            <Route path="/user" key={'16'} component={Tabs} />
            <Route path="/connect" key={'17'} component={Tabs} />
          </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
  );
};

export default App;
