import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../theme/pages/chat.css'
import axios from 'axios';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { personAdd, settingsOutline } from 'ionicons/icons';

export default function ExploreFriends() {

  const [AllUsers, setAllUsers] = useState([]);
  const AddFriend = (UserID: any) => {
    if (UserID != '') {
      document.querySelectorAll('.addFriendButton').forEach((e) => {
        e.setAttribute('disabled', '');
      })
      axios.post('https://chatverse-backend.onrender.com/addfriend', {
        data: {
          authToken: localStorage.getItem('authToken'),
          userID: UserID,
        }
      }).then((e) => {
        document.querySelectorAll('.addFriendButton').forEach((e) => {
          e.removeAttribute('disabled')
        })
        console.log(e.data)
        if(e.data == 'Already you friend'){
          toast.error(<p>{e.data}</p>, {
            draggablePercent: 60,
            theme: "dark",
            position: 'top-center',
            autoClose: 500
          });
        }
        else{
          toast.error(<p>{e.data}</p>, {
            draggablePercent: 60,
            theme: "dark",
            position: 'top-center',
            autoClose: 500
          });

        }
      })
    }
  }

  useEffect(() => {
    axios.post('http://localhost:3002/allusers',
      {
        
      },
      {
        headers: {
          authtoken: localStorage.getItem('authToken'),
        }
      }).then((result) => {
        setAllUsers(result.data.allUsers);
      })
  }, [])

  return (
    <IonPage id="main-content">
      <IonHeader className='ChatHeader'>
        <IonToolbar>
          <IonRow className="ion-justify-content-between ion-padding-horizontal">
            <IonTitle id='helo'>Hi,</IonTitle>
            <IonMenuToggle>
              <IonIcon size='large' icon={settingsOutline} >Chats</IonIcon>
            </IonMenuToggle>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <ToastContainer autoClose={false} position="bottom-center" limit={1} />
      <IonContent>
        {AllUsers.map((friend) => {
          return (
            <IonItem key={friend}>
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
              <IonLabel>{friend}</IonLabel>
              <IonButton className='addFriendButton' fill='none' onClick={() => { AddFriend(friend) }}>
                <IonIcon icon={personAdd} color='secondary'></IonIcon>
              </IonButton>
            </IonItem>
          )
        })}
      </IonContent>
    </IonPage>
  )
}