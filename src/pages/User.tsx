// import React from 'react';
import { IonAvatar, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonToolbar } from '@ionic/react';
import { arrowBack,   ellipsisVertical, paperPlaneOutline,  } from 'ionicons/icons';
import '../theme/pages/chat.css'
// import {  } from 'react-toastify';
import { useHistory, useRouteMatch } from 'react-router';


function User() {
    const match = useRouteMatch()
    let history = useHistory();
    return (
        <>
            
            <IonPage id='UserPAge'>
                <IonHeader>
                    <IonToolbar>
                        <IonItem>
                            <IonIcon onClick={() => history.goBack()} icon={arrowBack}></IonIcon>
                            <IonAvatar slot="" className='ion-margin'>
                                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </IonAvatar>
                            <IonLabel>{match.params.name}</IonLabel>

                            <IonIcon id='popover-button' icon={ellipsisVertical}></IonIcon>

                        </IonItem>
                    </IonToolbar>
                </IonHeader>
                <IonFooter className='ion-margin-bottom'>
                    <IonItem style={{ margin: '0 8px' }} className='SendMessageInput'>
                        <IonInput aria-label="Primary input" color="success" placeholder="Type a message "></IonInput>
                        <IonButton fill="clear">
                            <IonIcon size='large' icon={paperPlaneOutline}></IonIcon>
                        </IonButton>
                    </IonItem>

                </IonFooter>
            <IonPopover trigger="popover-button"  dismissOnSelect={true}>
                <IonContent>
                    <IonList>
                        <IonItem button={true} detail={false}>
                            Option 1
                        </IonItem>
                        <IonItem button={true} detail={false}>
                            Option 2
                        </IonItem>
                        <IonItem button={true} detail={true} id="nested-trigger">
                            More options...
                        </IonItem>
                        <IonPopover side='start' dismissOnSelect={true} trigger='nested-trigger'>
                            <IonContent>
                                <IonList>
                                <IonItem button={true} detail={false}>
                            Option 1
                        </IonItem>
                                    <IonItem button={true} detail={false}>Sub option 1</IonItem>
                                </IonList>
                            </IonContent>
                        </IonPopover>
                    </IonList>
                </IonContent>
            </IonPopover>
            </IonPage>
        </>
    )
}
export default User;