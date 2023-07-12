import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
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
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Chat from './pages/Chat';
import Verify from './pages/Verify';

setupIonicReact();

const App: React.FC = () => {
  return (
    (<IonApp>
      <IonReactRouter>
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            {/* <Route path="/"  >
              <Redirect to={'/signin'} />
            </Route> */}
            <Route path="/" component={Page} />
            <Route path="/signup" component={Signup} />
            <Route path="/verify" component={Verify} />
            <Route path="/signin" component={Signin} />
            <Route path="/chat" component={Chat} />

              
            
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
    )
  );
};

export default App;
