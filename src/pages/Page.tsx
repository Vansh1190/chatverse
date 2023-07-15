import { IonButton, IonCard, IonContent,  IonHeader,  IonList, IonNavLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import '../theme/pages/page.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from './pngwing.com (2).png';


function Page() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.getElementById('signup')?.setAttribute('disabled', '');
    document.getElementById('signin')?.setAttribute('disabled', '');

    console.log(active)
    toast.loading("Waking up the Server, please wait", {
      draggablePercent: 60,
      theme: "dark",
      toastId: "custom-id-yes",
      autoClose: 2000
    })
    setTimeout(() => {

    }, 1500)

    axios.get('https://chatverse-backend.onrender.com').then(() => {
      toast.dismiss("custom-id-yes")
      document.getElementById('signup')?.removeAttribute('disabled');
      document.getElementById('signin')?.removeAttribute('disabled');
      // setActive(true);
    }).catch(() => {
      setActive(false);
      toast.loading("We are experiencing high traffic, please try again later.", {
        draggablePercent: 60,
        theme: "dark",
        autoClose: 2100
      })
    })
  }, [])

  return (
    <>
      <IonHeader>
        <ToastContainer position="top-center" limit={1} />
        <IonToolbar>
          <IonTitle class='ionTitle' >CHATVERSE</IonTitle>
          <small className='subIonTitle'>where conversations come alive</small>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page-container" >

        <IonRow class="ion-justify-content-center">
          <IonCard>
            {/* <img src={bg} alt="" /> */}
            <img width={"200vw"} src={bg} alt="" />
          </IonCard>
          <h1>
            Stay connected with your friends and family
          </h1>

          <IonNavLink>
            <IonButton id='signup' onClick={() => {
              window.location.href = '/signup'
            }} fill='outline'>Get Started</IonButton>
            <IonButton id='signin' onClick={() => {
              window.location.href = '/signin'
            }} fill='outline'>Sign in</IonButton>
          </IonNavLink>
        </IonRow>
        <IonList className='footer'>
          <img width={"25px"} src="https://www.pngall.com/wp-content/uploads/12/Secure-HTTPS-Green-Symbol-PNG.png" alt="" /> 
          <p>Secure, safe and end-end encrypted.</p>
        </IonList>
       
        
      </IonContent>

    </>
  );
};

export default Page;
