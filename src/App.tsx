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

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            {/* <Route path="/"  >
              <Redirect to={'/signin'} />
            </Route> */}
            {/* <Route path="/chat" component={Tabs} /> */}
            <Route path="/" component={Page} />
            <Route path="/signup" component={Signup} />
            <Route path="/verify" component={Verify} />
            {/* <Route path="/tabs" component={Tabs} /> */}
            <Route path="/signin" component={Signin} />
            <Route path="/chat" key={'15'} component={Tabs} />
            <Route path="/user" key={'16'} component={Tabs} />

              
            
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
