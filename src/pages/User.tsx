// import React from 'react';
import { IonAvatar, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, caretDownCircleSharp,ellipsisVertical, image, paperPlaneOutline} from 'ionicons/icons';
import '../theme/pages/chat.css'
import { useHistory, useRouteMatch } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

type RouteParams = {
    room: string,
    sender: string,
    name: string,
    receiver: string,
};

function User({ Socket, name }) {
    const [loadedOldChat, setLoadOldChat] = useState(false);
    const [joined, setJoined] = useState(false);
    const [OldMessages, setOldMessages] = useState([{}]);
    const [Verified, setVerified] = useState(true);
    const [AllMessages, setAllMessages] = useState([{}]);
    const [ImageMsg, setImageMsg] = useState();
    const [count, setCount] = useState(1)
    const [Messages, setMessages] = useState([{ id: count }]);
    const [ImageUrl, setImageUrl] = useState('');

    const match = useRouteMatch<RouteParams>()
    let history = useHistory();

 
        if(localStorage.getItem("authToken")){
            let c:any = jwt_decode(localStorage.getItem("authToken") as string)
            if(c.userName != match.params.sender){
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
            // setVerified(true)
        }
        else{
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
    
    
    
    if (name !== '' && !joined) {
            Socket.emit('join_room', match.params.room);
        setJoined(true);
    }

    const scrollToBottom = () => {
        const chatContainer = document.getElementById('chat');
        chatContainer?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    };
    
    const MessageTemplate = {
        message: '',
        id: count,
        time: new Date().toLocaleTimeString(),
        imageURL : ImageUrl
    }
    const SendImage = (e) => {
        setImageMsg(e.target.files[0])
        let url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url);
        if(document.getElementById('img')){
            let ImgElem = document.getElementById('img') as HTMLImageElement
            ImgElem.src = url;
        }
    }
    const SendMessage = () => {
        let message = document.getElementById('messageToSend').value
        document.getElementById('messageToSend').value = "";
        document.getElementById('img').src = '';
        if (message.trim() !== '' || ImageMsg) {
            MessageTemplate.message = message;
            setMessages([...Messages, MessageTemplate]);
            setAllMessages([...AllMessages, MessageTemplate]);
            setCount(count + 1);
            const messageData = {
                roomID: match.params.room,
                messages: {
                    Image: {
                        data: ImageMsg,
                        contentType: 'image/jpeg',
                        imageURL : ImageUrl
                    },
                    sender: match.params.sender,
                    message: message,
                    receiver: match.params.name,
                    time: new Date().toLocaleString(),
                    read: false,
                },
            };
            setImageMsg(undefined);
            Socket.emit('sendMessage', messageData);
        }
    }
    // useEffect(()=>{
      
        
    // },[])

    useEffect(() => {
        if (!loadedOldChat) {
            axios.post('http://localhost:3002/allmessages',
                {
                    roomID: match.params.room,
                },
                {
                    headers:{
                        authtoken: localStorage.getItem('authToken'),
                    }
                }
            ).then((e) => {
                if (e.data[0]) {
                    let Arr = (e.data[0]['messages'])
                    Arr.forEach( element => {
                        if(element.Image.data){
                            const binaryData = element.Image.data;
                            const bufferData = Uint8Array.from(atob(binaryData), (c) => c.charCodeAt(0));
                            const blob = new Blob([bufferData], { type: 'image/jpeg' });
                            element.Image.fileName = URL.createObjectURL(blob);
                        }
                    });
                    setOldMessages(Arr);
                }
            }).catch((err)=>{
                console.log(err);
            })
            setLoadOldChat(true);
        }
        setCount(count + 1);
        scrollToBottom();
        Socket.on('receiveMessage', (data: any) => {
            data.id = count;
            const blob = new Blob([data.messages.Image.data], { type: 'image/jpeg' });
            data.messages.Image.imageURL = URL.createObjectURL(blob);
            setAllMessages([...AllMessages, data]);
            Socket.emit('readMessage', data);
        });
    }, [Socket, AllMessages]);
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
        
                            <ToastContainer position="top-center" limit={1} />
                            <IonIcon id='popover-button' icon={ellipsisVertical}></IonIcon>

                        </IonItem>
                    </IonToolbar>
                    
                </IonHeader>
                <IonContent>
                    <div className="chat ion-padding" id='chat'>
                        {OldMessages.map((e) => {
                            if (Object.keys(e).length != 0) {
                                return (
                                    <div className={(e.sender == match.params.name) ? "senderChat" : "receiverChat"} key={e._id + joined + e.time}>
                                        <h1>{e.message}
                                        {(e.Image.fileName) ? <img width={"100px"} src={e.Image.fileName} alt="" /> : null}
                                        </h1>
                                        <small>{e.time}</small>
                                    </div>
                                )
                            }
                        })
                        }
                        {AllMessages.map((e) => {
                            scrollToBottom();
                            if (Object.keys(e).length != 0) {
                                if (e.roomID) {
                                    return (
                                        <div className={(e.messages.sender == match.params.name) ? "senderChat" : "receiverChat"} key={e.id + joined}>
                                            <h1>{e.messages.message}
                                            {(e.messages.Image.imageURL) ? <img width={"100px"} src={e.messages.Image.imageURL} alt="" /> : null}
                                           
                                            </h1>
                                            <small>{e.messages.time}</small>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className={(e.sender) ? "senderChat" : "receiverChat"} key={e.id + joined}>
                                            <h1>{e.message}
                                           {(e.imageURL) ? <img width={"100px"} src={e.imageURL} alt="" /> : null}
                                            </h1>
                                            <small>{e.time}</small>
                                        </div>
                                    )
                                }
                            }
                        })}
                        <IonButton onClick={scrollToBottom} style={{ position: 'fixed', bottom: '77px', right: '14px' }} fill='clear'>
                            <IonIcon size='large' icon={caretDownCircleSharp} style={{ background: 'black', borderRadius: "50%" }}>hello</IonIcon>
                        </IonButton>
                    </div>
                    
                </IonContent>
                <IonFooter className='ion-margin-bottom'>
                    <img width={"100px"} src='' id='img' alt="" />
                    <IonItem style={{display: 'none'}}>
                    <input type='file' style={{display: 'none'}} onChange={(e)=>{
                        SendImage(e);
                    }} id='inputfile'></input>
                        
                    </IonItem>
                    <IonItem style={{ margin: '0 8px' }} className='SendMessageInput'>
                        <IonButton onClick={() =>{
                            document.getElementById('inputfile')?.click()
                        }}>
                                <IonIcon icon={image}>
                                </IonIcon>
                        </IonButton>   
                        
                        <IonInput aria-label="Primary input" id='messageToSend' color="success" placeholder="Type a message "></IonInput>
                        <IonButton fill="clear" onClick={SendMessage}>
                            <IonIcon size='large' icon={paperPlaneOutline}></IonIcon>
                        </IonButton>
                        {/* <IonButton onClick={joinRoom}>
                            join chat
                        </IonButton> */}
                    </IonItem>

                </IonFooter>
                <IonPopover trigger="popover-button" dismissOnSelect={true}>
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