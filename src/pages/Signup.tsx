import { useState } from 'react';

import { IonButton, IonHeader, IonContent,  IonToolbar, IonTitle, IonList, IonItem, IonInput, IonGrid, IonCol, IonSpinner } from '@ionic/react';

import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';

function Signup() {
    const [success, setSuccess] = useState(false);

    const history = useHistory();

    let signUp = (event: any) => {
        document.getElementById('submitBtn')?.setAttribute('disabled','');
        event.preventDefault();
        let x = document.getElementById("form") as HTMLFormElement
        const form = new FormData(x);
        const formDataObj = (Object.fromEntries(form.entries()));

        setSuccess(true);
        axios.post('https://chatverse-backend.onrender.com/auth/signup', formDataObj).then((e) => {
            setSuccess(false);
            toast.success("created account successfully",{
                draggablePercent: 60,
                theme: "dark",
                autoClose: 1500
            })
            setTimeout(() =>{    
                toast.loading("You will be redirected shortly", {
                      theme: "dark"
                  })
                  setTimeout(()=>{
                    history.push('/signin')
                  },2000)
            },2000)
        }).catch((err) => {
            // toast(err.response.data.error.substring(0, 33));
            console.log('error')
           try{

               toast(err.response.data.error.substring(117,),{
                   theme:"dark",
                   autoClose: 3500
                });
            }catch{
                toast("internal server error, try again later",{
                    theme:"dark",
                    autoClose: 3500
                 });
                
            } 
            document.getElementById('submitBtn')?.removeAttribute('disabled');
            setSuccess(false);
        })
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <ToastContainer position="top-center" />
            <IonContent class="ion-padding ">
                <h5>Welcome to chatverse</h5>

                <IonGrid>
                    <IonCol class='ion-align-self-center'>
                        <form id='form' onSubmit={signUp} className='ion-justify-content-center'>

                            <IonList >
                                <IonItem >
                                    <IonInput name='name' label="name" labelPlacement="floating"
                                        fill="solid"  required
                                    ></IonInput>
                                </IonItem>
                                <IonItem >
                                    <IonInput name='userName' label="username" labelPlacement="floating" counter={true}
                                        fill="solid"  placeholder="" required
                                        counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                                        maxlength={20}
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput label="email" name='email' labelPlacement="floating"
                                        fill="solid"  type="email" placeholder="" required
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput name='password' label="password" required type='password' labelPlacement="floating" fill="solid"  minlength={6} placeholder=""></IonInput>

                                </IonItem>
                            </IonList>
                            <IonButton id='submitBtn' type='submit' fill="outline">
                                {(success) ? "Signing up " : "Sign up"}
                                {(success) ? (<IonSpinner></IonSpinner>) : null}

                            </IonButton>
                        </form>
                    </IonCol >
                </IonGrid>
            </IonContent>
        </>
    );
}

export default Signup;