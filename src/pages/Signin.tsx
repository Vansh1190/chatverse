import { useContext, useState } from 'react';

import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonList, IonItem, IonInput, IonGrid, IonCol, IonSpinner, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../theme/pages/signup.css'
import { UserIdContext } from '../components/UserIDContext';
import jwt_decode from 'jwt-decode'

function Signin() {
    const [success, setSuccess] = useState(false);

    const history = useHistory();
    
    
        // Start Code For Android 
    let updateNotifyID = (id:any, userName) => { 
        console.log("isPushNotificationsEnabled", localStorage.getItem('isPushNotificationsEnabled'))
        console.log(id, userName, "thisisdetails");
        axios.post('https://chatverse-backend.onrender.com/updatenotifID',{
            id: id,
            enabled: true,
            userID: userName,
            }).then((e)=>{
                console.log(e);
                history.push('/chat')
            }).catch((err)=>{
              console.log(err);
            })
      }
            // End here Code For Android 

    if (localStorage.getItem('authToken')) {
        toast.loading("validating information, please wait", {
            draggablePercent: 60,
            theme: "dark",
            autoClose: 9500,
        })
        setTimeout(() => {
            history.push('/chat')
        }, 2500)
    }

    let signin = (event: any) => {
        document.getElementById('submitBtn')?.setAttribute('disabled', '');
        event.preventDefault();
        let x = document.getElementById("form") as HTMLFormElement
        const form = new FormData(x);
        const formDataObj = (Object.fromEntries(form.entries()));
        setSuccess(true);
        axios.post('https://chatverse-backend.onrender.com/auth/signin', formDataObj).then((e) => {
            localStorage.setItem("authToken", e.data.token)

            // Start Code For Android 
            if(localStorage.getItem('user')){
                console.log('helloi am d')
                const user:any = jwt_decode(localStorage.getItem("authToken") as string);
                // console.log(e.userName, "thissisnotify" );
                updateNotifyID(localStorage.getItem('user'), user.userName )
            }
            
            // End here Code For Android 

            setSuccess(false)
            toast.loading("Login success, you will be automatically redirected", {
                draggablePercent: 60,
                theme: "dark",
                autoClose: 1500,
            })
            setTimeout(() => {
                // history.push('/chat')
            }, 1500)
        }).catch((err) => {
            console.log(err, "err");
            setSuccess(false);

            document.getElementById('submitBtn')?.removeAttribute('disabled');
            toast.error("username or password is invalid", {
                draggablePercent: 60,
                theme: "dark",
                autoClose: 3500
            })

        })
    }
    if (localStorage.getItem('authToken')) {
        return (
            <ToastContainer position="top-center" limit={1} />
        )
    }
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign in</IonTitle>
                </IonToolbar>
            </IonHeader>
            <ToastContainer position="top-center" limit={1} />
            <IonContent  className='ionContent page-container' class="ion-padding ">
                <small className='subIonTitle' style={{opacity:'1', fontSize:'1em'}}>We're happy to see you in the Chatverse.</small>
                <IonGrid>
                    <form onSubmit={signin} id='form' className='ion-justify-content-center'>
                        <IonList >
                            <IonCol class='ion-align-self-center'>
                                <IonItem>
                                    <IonInput name='userName' label="username" labelPlacement="floating" counter={true}
                                        fill="solid" placeholder="" required
                                        counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                                        maxlength={20}
                                    ></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonInput name='password' label="password" required type='password' labelPlacement="floating" fill="solid" placeholder=""></IonInput>
                                </IonItem>
                            </IonCol >
                        </IonList>
                        <IonLabel className='privacy-footer'>
          <p style={{ textAlign: 'end', opacity:"2", padding:'0 25px'}}>
             <a href="/">Forgot password ?</a></p>
            </IonLabel>

                        <IonButton id='submitBtn' className='submitBtn SigninBtn' type='submit' fill="outline">
                            {(success) ? "Signing in " : "Sign in"}
                            {(success) ? (<IonSpinner></IonSpinner>) : null}

                        </IonButton>
                    </form>
                </IonGrid>
                {/* <IonNavLink routerDirection="forward" component={() => <Signup />}>
                    <IonButton fill="outline">Sign up</IonButton>
                </IonNavLink> */}
                {/* <IonItem routerLink="/signup"> */}
                <IonButton routerLink="/signup" id='SignupBtn' className='ion-text-center submitBtn' type='submit' fill="outline">Don't have an account?</IonButton>

            </IonContent>

        </>
    );
}

export default Signin;