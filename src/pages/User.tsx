// import React from 'react';
import { IonAvatar, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonToolbar } from '@ionic/react';
import { arrowBack,   ellipsisVertical, paperPlaneOutline,  } from 'ionicons/icons';
import '../theme/pages/chat.css'
// import {  } from 'react-toastify';
import { useHistory, useRouteMatch } from 'react-router';
import { useEffect, useState } from 'react';

function User({Socket, name }) {

    const [joined, setJoined] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState([{}]);
    const [AllMessages, setAllMessages] = useState([{}]);
    const [count, setCount] = useState(1)
    const [Messages, setMessages] = useState([{id: count}]);

    const match = useRouteMatch()
    let history = useHistory();

    if (name !== '' && !joined) {
        Socket.emit('join_room', match.params.room);
        // console.log(`User with ID ${Socket.id} joined the room ${match.params.room}`);
        setJoined(true);  
    }
    
    const scrollToBottom = () => {
        const chatContainer = document.getElementById('chat');
        chatContainer?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    };

    const MessageTemplate = {
        message : '',
        id: count,
        time:new Date().toLocaleTimeString(),
    }     
    const SendMessage = () => {
        let message = document.getElementById('messageToSend').value
        document.getElementById('messageToSend').value = "";
        if (message.trim() !== '') {
        MessageTemplate.message = message;
        setMessages([...Messages ,MessageTemplate]);
        setAllMessages([...AllMessages ,MessageTemplate]);
        setCount(count + 1);
            const messageData = {
              room: match.params.room,
              sender: name,
              message: message,
              time: new Date().toLocaleTimeString(),
            };
            Socket.emit('sendMessage', messageData);
          }
    }
   
useEffect(()=>{
    setCount(count + 1);
    scrollToBottom();
    Socket.on('receiveMessage', (data) => {
        // console.log(data,'received');
        // console.log(receivedMessages);
        data.id = count;
        setReceivedMessages([...receivedMessages,data]);
        setAllMessages([...AllMessages ,data]);
        // AllMessages.pop();
        // console.log(AllMessages)
        // AllMessages.push(data.message);
        // setAllMessages( [...AllMessages] );
    });
},[Socket, AllMessages]);
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
                <IonContent>
                    <div className="chat ion-padding" id='chat'>
                    {AllMessages.map((e)=>{
                        return (
                            <div className={e.sender ? "senderChat" : "receiverChat"} key={e.id + joined}>
                            <h1>{e.message}</h1>    
                            <small>{e.time}</small>
                            </div>
                        )
                    })}
                    </div>
                </IonContent>
                <IonFooter className='ion-margin-bottom'>
                    <IonItem style={{ margin: '0 8px' }} className='SendMessageInput'>
                        <IonInput aria-label="Primary input" id='messageToSend' color="success" placeholder="Type a message "></IonInput>
                        <IonButton fill="clear" onClick={SendMessage}>
                            <IonIcon size='large' icon={paperPlaneOutline}></IonIcon>
                        </IonButton>
                        {/* <IonButton onClick={joinRoom}>
                            join chat
                        </IonButton> */}
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