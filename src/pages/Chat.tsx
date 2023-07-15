import { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle,  IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settingsOutline, arrowBackCircleOutline,  addSharp } from 'ionicons/icons';
import '../theme/pages/chat.css'

function Chat(props:any) {
  const [isVerified, setVerified] = useState(false);
  const [user, setUser] = useState('');
  const logOut = () => {
    localStorage.removeItem('authToken')
    setVerified(false)
    window.location.reload()
  }


  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      setVerified(false);
    }
    else {
      axios.get('https://chatverse-backend.onrender.com/auto', {
        headers: {
          token: localStorage.getItem('authToken')
        }
      }).then((e) => {
        setVerified(true);
        setUser(e.data.UserName);
      }).catch((err) => {
        // console.log(err);
        setVerified(false);
        toast.warning(<p>Account not verified, please verify you account. <a href="/verify">verify now</a></p>, {
          draggablePercent: 60,
          theme: "dark",
        });

      })
    }
  }, [isVerified]);
  if (!localStorage.getItem('authToken')) {
    return (
      <IonContent>

        <IonToolbar>
          <IonTitle>You don't have access to this page,</IonTitle>
        </IonToolbar>

        <IonButton fill='outline' onClick={() => {
          window.location.href = ("/signin")
        }}>Login in, first</IonButton>

      </IonContent>
    )
  }

  return (
    <>
      <IonMenu type='reveal'  contentId="main-content">
        <IonHeader class='MenuHeader'>
          <IonToolbar>
            <IonRow className="ion-justify-content-between ion-padding-horizontal">
              <IonTitle id='helo'>ChatVerse</IonTitle>
              <IonMenuToggle>
                <IonIcon size='large' icon={arrowBackCircleOutline}></IonIcon>
              </IonMenuToggle>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonAvatar className='ion-margin-end'>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar> Person 1</IonItem>
            <IonItem>
              <IonAvatar className='ion-margin-end'>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar> Person 2</IonItem>
            <IonItem>
              <IonAvatar className='ion-margin-end'>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar> Person 3</IonItem>
            <IonItem>

              <IonLabel className='' class='ion-margin' style={{ opacity: '0.5' }} onClick={logOut} >Logout</IonLabel>
            </IonItem>
            <IonItem>

              <IonLabel className='' class='ion-margin' style={{ opacity: '0.5' }} onClick={logOut} >Logout</IonLabel>
            </IonItem>
            <IonItem>

              <IonLabel className='' class='ion-margin' style={{ opacity: '0.5' }} onClick={logOut} >Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader className='ChatHeader'>
          <IonToolbar>
            <IonRow className="ion-justify-content-between ion-padding-horizontal">
              <IonTitle id='helo'>Hi, {(user) ? user.toUpperCase() : null}.</IonTitle>
              <IonMenuToggle>
                <IonIcon size='large' icon={settingsOutline} >Chats</IonIcon>
              </IonMenuToggle>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonRow style={{ overflow: 'scroll' }} >

          <ToastContainer autoClose={false} position="bottom-center" limit={1} />

          <IonList >
            <IonItem style={{}}>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar  id='AddStoryBtn'  className=''>
                  <IonIcon  size='large' style={{  display: "block" }} icon={addSharp}></IonIcon>
                </IonAvatar>
                <p>Add story </p>
              </IonLabel>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar className=''>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <p>Friend 1</p>
              </IonLabel>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar className=''>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <p>Friend 2</p>
              </IonLabel>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar className=''>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <p>Friend 3</p>
              </IonLabel>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar className=''>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <p>Friend 4</p>
              </IonLabel>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar className=''>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <p>Friend 5</p>
              </IonLabel>

              <IonLabel className='ChatIonLabel'>
                <IonAvatar className=''>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <p>Friend 6</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonRow >
        <IonContent>

          <IonItem routerLink='/user/5/Vansh'>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Vansh1{props.keyop} </IonLabel>
          </IonItem>

          


          <IonItem routerLink='/user/5/Friend 1'>
            <IonAvatar  slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel  > Friend 1</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/2/Friend 2' >
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 2 </IonLabel>
          </IonItem>

          <IonItem routerLink='/user/3/Friend 3' >
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 3</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/4/Friend 4' >
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar >
            <IonLabel>Friend 4</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/5/Friend 5' >
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 5</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/51/Friend 51' >
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 51</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/6/Friend 6'>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 6</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/7/Friend 7'>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 7</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/8/Friend 8'>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 8</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/9/Friend 9'>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 9</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/10/Friend 10'>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 10</IonLabel>
          </IonItem>

          <IonItem routerLink='/user/11/Friend 11'>
            <IonAvatar slot="start" >
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Friend 11</IonLabel>
          </IonItem>

        </IonContent>
      </IonPage>


    </>
  );
}
export default Chat;