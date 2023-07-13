import  { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Chat() {
  const [isVerified, setVerified] = useState(false);
  const [user, setUser] = useState('');
  const logOut = () =>{
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
        toast.warning(<p>Account not verified, please verify you account. <a href="/verify">verify now</a></p>,{
          draggablePercent: 60,
          theme: "dark",
        });

      })
    }
  }, [isVerified, localStorage]);
  if (!localStorage.getItem('authToken')) {
    return(
      <IonContent>

      <IonToolbar>
      <IonTitle>You don't have access to this page,</IonTitle>
    </IonToolbar>
     
        <IonButton fill='outline' onClick={()=>{
            window.location.href = ("/signin")
        }}>Login in, first</IonButton>
     
      </IonContent>
    )
  }

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonButton>close</IonButton>
          </IonMenuToggle>
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
        
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonRow className="ion-justify-content-between ion-padding-horizontal">
            <IonTitle id='helo'>Hi, {(user) ? user.toUpperCase() : null }.<img src="" alt="" /></IonTitle>
            <IonButton className='' fill="outline" onClick={logOut} >Logout</IonButton>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonButton>Chats</IonButton>
          </IonMenuToggle>
           <ToastContainer autoClose={false}  position="bottom-center" limit={1}/>
        </IonContent>
      </IonPage>


      <IonContent className="ion-padding">All people whom to chat will be shown here</IonContent>
    </>
  );
}
export default Chat;