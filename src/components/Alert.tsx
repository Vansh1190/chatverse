import React, { useEffect } from 'react';
import { IonAlert, IonButton, IonContent, IonHeader, IonPage, IonRedirect, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { Redirect, useHistory } from 'react-router-dom';

function Alert({isVerified}:any) {
  const history = useHistory();
  // const navigate = useNavigate();
  
  if(isVerified == false){
    setTimeout(() => {
      document.getElementById('open-toast')?.click();
      // console.log(document.getElementById('present-alert'))
    }, 2000);
    }
    return (
         <IonPage>
      <IonContent className="ion-padding" style={{display:'none'}}>
        <IonButton id="open-toast" expand="block">
        </IonButton>
        <IonButton routerLink="/signup" className='ion-text-center' type='submit' fill="outline">0</IonButton>
        
      </IonContent>
      <IonToast trigger="open-toast" message="user not verified, verify first" buttons={[{
            text: 'verify now',
            role: 'info',
            handler: () => {
                window.open('/verify')
            },}
]} duration={0}></IonToast>
    </IonPage>
  );
}
export default Alert;