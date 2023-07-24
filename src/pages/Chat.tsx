import { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settingsOutline, arrowBackCircleOutline, addSharp, personAddOutline } from 'ionicons/icons';
import '../theme/pages/chat.css'
import { useHistory } from 'react-router';

function Chat(props: any) {
  const history = useHistory();
  const [isVerified, setVerified] = useState(false);
  const [user, setUser] = useState('');
  const [Friends, setFriends] = useState([]);
  const logOut = () => {
    localStorage.removeItem('authToken')
    setVerified(false)
    window.location.reload()
  }
  function handleRefresh() {
    window.location.reload();
      // event.detail.complete();
  }
  const AddFriend = () => {
    let UserID = document.getElementById("AddFriendInput").value;
    if (UserID != '') {
      axios.post('https://chatverse-backend.onrender.com/addfriend', {
        data: {
          authToken: localStorage.getItem('authToken'),
          userID: UserID,
        }
      }).then((e) => {
        toast.info(<p>{e.data}</p>, {
          draggablePercent: 60,
          theme: "dark",
          position: 'top-center',
          autoClose: 500
        });
        history.push('/chat')
      })
    }
  }

  useEffect(() => {

    axios.post('https://chatverse-backend.onrender.com/allfriends', {
      data: {
        authToken: localStorage.getItem('authToken'),
      }
    }).then((e) => {
      setFriends(e.data);
     
    })
    if (!localStorage.getItem('authToken')) {
      setVerified(false);
    }
    else {
      axios.get('https://chatverse-backend.onrender.com/auto', {
        headers: {
          token: localStorage.getItem('authToken'),
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
  else if (!isVerified) {
    return (
      <>
        <IonMenu type='reveal' contentId="main-content">
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
                <IonLabel className='cursorPointer' class='ion-margin' style={{ opacity: '0.5' }} onClick={logOut} >Logout</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className='cursorPointer' class='ion-margin' style={{ opacity: '0.5' }} onClick={logOut} >Made with 💖 by <a href="https://vansh1190.github.io/about">Vansh1190</a> </IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main-content">
          <IonHeader className='ChatHeader'>
            <IonToolbar>
              <IonRow className="ion-justify-content-between ion-padding-horizontal">
                <IonTitle id='helo'>Hi, {(user) ? user : null}.</IonTitle>
                <IonMenuToggle>
                  <IonIcon size='large' icon={settingsOutline} >Chats</IonIcon>
                </IonMenuToggle>
              </IonRow>
            </IonToolbar>
          </IonHeader>
          <ToastContainer autoClose={false} position="bottom-center" limit={1} />
        </IonPage>
      </>
    )
  }

  return (
    <>
      <IonMenu type='reveal' contentId="main-content">
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
              {/* <IonAvatar className='ion-margin-end'>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar> Person 1</IonItem>
            <IonItem> */}
              <IonLabel className='' class='ion-margin' style={{ opacity: '0.5' }} onClick={logOut} >Logout</IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonItem >
            <IonText color={'primary'} className='cursorPointer ion-margin-auto' style={{ color:'primary', opacity: '5' , textAlign:'center '}} onClick={ ()=>{window.location.href= 'https://vansh1190.github.io/about'}} >Made with 💖 by Vansh1190 
            </IonText>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader className='ChatHeader'>
          <IonToolbar>
            <IonRow className="ion-justify-content-between ion-padding-horizontal">
              <IonTitle id='helo'>Hi, {(user) ? user : null}.</IonTitle>
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
                <IonAvatar id='AddStoryBtn' className=''>
                  <IonIcon size='large' style={{ display: "block" }} icon={addSharp}></IonIcon>
                </IonAvatar>
                <p>Add story </p>
              </IonLabel>
              {Friends.map((friend) => {
                return (
                  <IonLabel key={friend.userName} className='ChatIonLabel'>
                    <IonAvatar className=''>
                      <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </IonAvatar>
                    <p>{friend.userName}</p>
                  </IonLabel>
                )
              })}

            </IonItem>
          </IonList>
        </IonRow >


        <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent>
            </IonRefresherContent>
          </IonRefresher>
          {Friends.map((friend) => {
            return (
              <IonItem key={friend.userName} id={friend.userName} routerLink={`/user/${friend.room}/${friend.userName}/${user}`}>
                <IonAvatar slot="start">
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel>{friend.userName}</IonLabel>
              </IonItem>
            )
          })}
        </IonContent>

        {/* This is Modal for Adding new friend  */}
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton id="open-modal" expand="block" className='ion-margin'>
            <IonIcon icon={personAddOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.3}
          breakpoints={[0, 0.25, 0.5, 0.75]}
          handleBehavior="cycle"
        >
          <IonContent className="ion-padding">
            <div className="ion-margin-top">
              <IonLabel>
                <IonInput type='text' placeholder='Enter userID' id='AddFriendInput' name='userName'></IonInput>
                <IonButton onClick={AddFriend} type='submit'> Add Friend</IonButton>

              </IonLabel>
            </div>
          </IonContent>
        </IonModal>
      </IonPage>


    </>
  );
}
export default Chat;