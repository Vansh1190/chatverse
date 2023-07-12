import { IonButton, IonContent, IonHeader, IonNavLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import './Page.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Page(){
  const [active, setActive] = useState(false);

  useEffect(()=>{
    document.getElementById('signup')?.setAttribute('disabled','');
    document.getElementById('signin')?.setAttribute('disabled','');

    console.log(active)
    const customId = "custom-id-yes";

    toast.loading("Waking up the Server, please wait", {
        draggablePercent: 60,
        theme: "dark",
        toastId: "custom-id-yes",
        autoClose:2000
      })
      setTimeout(()=>{

      },1500)
      
      axios.get('https://chatverse-backend.onrender.com').then(()=>{
        toast.dismiss("custom-id-yes")
        document.getElementById('signup')?.removeAttribute('disabled');
        document.getElementById('signin')?.removeAttribute('disabled');
        // setActive(true);
      }).catch(()=>{
        setActive(false);
        toast.loading("We are experiencing high traffic, please try again later.", {
          draggablePercent: 60,
          theme: "dark",
          autoClose: 2100
        })
      })
  },[])

  return (
    <>
      <IonHeader>
      <ToastContainer position="top-center" limit={1} />
      <IonToolbar>
       <IonTitle>Welcome to Chatverse</IonTitle>
       </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

      <IonRow class="ion-justify-content-center">
      <IonNavLink>
        <IonButton id='signup' onClick={()=>{
          window.location.href='/signup'
        }} fill='outline'>Singup</IonButton>
        <IonButton id='signin' onClick={()=>{
          window.location.href='/signin'
        }} fill='outline'>Singin</IonButton>
      </IonNavLink>
        </IonRow>
      </IonContent>
        </>
  );
};

export default Page;
