import React from 'react';

import { IonButton, IonHeader, IonContent, IonNavLink, IonToolbar, IonTitle, IonList, IonItem, IonInput, IonGrid, IonCol } from '@ionic/react';
import Signup from './Signup';
import Form from './Form';

function Signin() {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign in</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding ">
                <h5>Login to existing account</h5>

                <IonGrid>
                <form action="" className='ion-justify-content-center'>

                <IonList >
                <IonCol class='ion-align-self-center'>
                    <IonItem>
                        <IonInput label="username" labelPlacement="floating" counter={true}
                            fill="solid" placeholder="" required
                            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                            maxlength={20}
                            ></IonInput>
                        <IonInput label="username" labelPlacement="floating" counter={true}
                            fill="solid" placeholder="" required
                            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                            maxlength={20}
                            ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput label="password" required type='password' labelPlacement="floating" fill="solid" placeholder=""></IonInput>
                    </IonItem>
                            </IonCol >
                </IonList>
                <IonButton className='ion-text-center' type='submit' fill="solid">Sign in</IonButton>
                </form>
                </IonGrid>
                <IonNavLink routerDirection="forward" component={() => <Signup />}>
                    <IonButton fill="outline">Sign up</IonButton>
                </IonNavLink>
            </IonContent>

        </>
    );
}

export default Signin;