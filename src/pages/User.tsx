// import React from 'react';
import { IonAvatar, IonButton, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, caretDownCircleSharp, ellipsisVertical, image, paperPlaneOutline, personAddOutline } from 'ionicons/icons';
import '../theme/pages/chat.css'
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { useEffect, useState, useRef } from 'react';
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

function User({ Socket, name, GetEmailFunc }) {
    const [loadedOldChat, setLoadOldChat] = useState(false);
    const [joined, setJoined] = useState(false);
    const [OldMessages, setOldMessages] = useState([{}]);
    const [AllMessages, setAllMessages] = useState([{}]);
    const [ImageMsg, setImageMsg] = useState();
    const [count, setCount] = useState(1)
    const [Messages, setMessages] = useState([{ id: count }]);
    const [MessageToSend, setMessageToSend] = useState('');
    const [ImageUrl, setImageUrl] = useState('');
    const [ChatSummaryText, setChatSummaryText] = useState('');

    const BottomElement = useRef<HTMLIonLabelElement>(null);
    const ModalElement = useRef<HTMLIonPopoverElement>(null)
    // const MessageTo = useRef<HTMLIonPopoverElement>(null)


    const match = useRouteMatch<RouteParams>()
    let history = useHistory();
   
    if (localStorage.getItem("authToken")) {
        let c: any = jwt_decode(localStorage.getItem("authToken") as string)
        if (c.userName != match.params.sender) {
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
    else {
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

    // if (name !== '' && !joined) {
    //     if(Socket){
    //         Socket.emit('join_room', match.params.room);
    //         setJoined(true);
    //         console.log('true');
    //     }
    // }

    const CheckUnReadMSG = (UserName, roomID, messageToSend, Sender) => {
        // console.log(roomID, UserName);
        axios.post('https://chatverse-backend.onrender.com/checkunreadmsg',{
            roomID: roomID,
            userName: UserName,
            messageToSend: messageToSend,
            sender: Sender,
        }).then((e)=>{
            // console.log(e)
        }).catch((err)=>{
            console.log(err);
        })
    }


    const handleEnterButton = (e) =>{
        if(e.keyCode == 13 && !e.altKey && !e.ctrlKey && !e.shiftKey){
            e.preventDefault();
         
            SendMessage();
            setTimeout(() => {
                // setMessageToSend('')
                // document.getElementById('messageToSend').value = null;
            }, 10);
        }
        if(e.keyCode == 13 && !e.altKey && !e.ctrlKey && e.shiftKey){
        }

    }

    const LeaveRoom = () => {
        Socket.emit('LeaveRoom',match.params.room)
    
    }
    
    const scrollToBottom = () => {
        const chatContainer = document.getElementById('chat');
        chatContainer?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    };
    const ChatSummarize = () => {
        let d = document.getElementById('MoreOptions') as HTMLButtonElement;
        d.style.display = 'none';
        // ModalElement.current?.dismiss();
        let c = [];
        c.push(OldMessages.map((e) => {
            return {
                message: e.message,
                sender: e.sender,
            }
        }))
        let MessageString = (JSON.stringify(c).replaceAll('"', ''));
        
        axios.post('https://chatwithbro.onrender.com/chat', {
            message: `Give me summary  of this conversation without including any greetings message for summary the Conversation - ${MessageString}`
        }).then((e) => {
            setChatSummaryText(e.data.choices[0].message.content);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(()=>{
        GetEmailFunc(match.params.sender, match.params.room);
        setTimeout(() => {
            document.getElementById('messageToSend').setFocus()
        }, 0);
    },[])

    useEffect(()=>{ 
            BottomElement.current?.scrollIntoView();
    }, [OldMessages, AllMessages]);
    
    const MessageTemplate = {
        message: '',
        id: count,
        time: new Date().toLocaleTimeString(),
        imageURL: ImageUrl
    }
    const SendImage = (e) => {
        setImageMsg(e.target.files[0])
        let url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url);
        if (document.getElementById('img')) {
            let ImgElem = document.getElementById('img') as HTMLImageElement
            ImgElem.src = url;
        }
    }   
    const SendMessage = () => {
        document.getElementById('img').src = '';
        if(MessageToSend){
            if (MessageToSend.trim() !== '' || ImageMsg) {
                MessageTemplate.message = MessageToSend;
                setMessages([...Messages, MessageTemplate]);
                setAllMessages([...AllMessages, MessageTemplate]);
                setCount(count + 1);
                const messageData = {
                    roomID: match.params.room,
                    messages: {
                        Image: {
                            data: ImageMsg,
                            contentType: 'image/jpeg',
                            imageURL: ImageUrl
                        },
                        sender: match.params.sender,
                        message: MessageToSend,
                        receiver: match.params.name,
                        time: new Date().toLocaleString(),
                        read: false,
                    },
                };
                setImageMsg(undefined);
                Socket.emit('sendMessage', messageData);
                setMessageToSend('');
                setTimeout(() => {
                    CheckUnReadMSG(messageData.messages.receiver, messageData.roomID, messageData.messages.message, messageData.messages.sender);
                }, 900);
            }
            }
    }
    useEffect(() => {
        if (!loadedOldChat) {
            
            axios.post('https://chatverse-backend.onrender.com/allmessages',
                {
                    roomID: match.params.room,
                },
                {
                    headers: {
                        authtoken: localStorage.getItem('authToken'),
                    }
                }
            ).then((e) => {
                if (e.data[0]) {
                    let Arr = (e.data[0]['messages'])
                    Arr.forEach(element => {
                        if (element.Image.data) {
                            const binaryData = element.Image.data;
                            const bufferData = Uint8Array.from(atob(binaryData), (c) => c.charCodeAt(0));
                            const blob = new Blob([bufferData], { type: 'image/jpeg' });
                            element.Image.fileName = URL.createObjectURL(blob);
                        }
                    });
                    setOldMessages(Arr);
                }
            }).catch((err) => {
                console.log(err);
            })
            setLoadOldChat(true);
        }
        if(Socket){ 
            Socket.off('receiveMessage').on('receiveMessage', (data: any) => {
                console.log('eror')
                data.id = count;
                if (data.messages.Image.data){
                    const blob =  new Blob([data.messages.Image.data], { type: 'image/jpeg' });
                    data.messages.Image.imageURL =  URL.createObjectURL(blob);
                }
                else{
                    data.messages.Image.imageURL = undefined
                }
                
                if(data.messages.sender !==  match.params.sender){
                    setAllMessages([...AllMessages, data])
                    setCount(count + 1);
                    Socket.emit('readMessage', data);
                    }
            }); 
        }
    }, [Socket, AllMessages]);

    return (
            <IonPage id='UserPAge'>

                <IonHeader> 
                    <IonToolbar>
                        <IonItem>
                            <IonIcon onClick={() => {LeaveRoom(); history.goBack(); } } icon={arrowBack}></IonIcon>
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
                                            {(e.Image.fileName) ? <img loading='lazy' width={"100px"} src={e.Image.fileName} alt="" /> : null}
                                        </h1>
                                        <small>{e.time}</small>
                                    </div>
                                )
                            }
                        })
                        }
                        {AllMessages.map((e) => {
                            // scrollToBottom();
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

                        <IonLabel ref={BottomElement}></IonLabel>

                        <IonButton onClick={scrollToBottom} style={{ position: 'fixed', bottom: '77px', right: '14px' }} fill='clear'>
                            <IonIcon size='large' icon={caretDownCircleSharp} style={{ background: 'black', borderRadius: "50%" }}>hello</IonIcon>
                        </IonButton>
                    </div>
                </IonContent>
                <IonFooter className='ion-margin-bottom'>
                    <img width={"100px"} src='' id='img' alt="" />
                    <IonItem style={{ display: 'none' }}>
                        <input type='file' style={{ display: 'none' }} onChange={(e) => {
                            SendImage(e);
                        }} id='inputfile'></input>

                    </IonItem>
                    <IonItem style={{ margin: '0 8px' }} className='SendMessageInput'>
                        <IonButton onClick={() => {
                            document.getElementById('inputfile')?.click()
                        }}>
                            <IonIcon icon={image}>
                            </IonIcon>
                        </IonButton>
                        {/* <IonItem> */}
                            <IonTextarea onKeyDown={(e) => {handleEnterButton(e)}} onIonInput={(e) => {
                                setMessageToSend(e.detail.value);
                            }}
                            aria-label="input"
                            id='messageToSend'
                            color="success" 
                            placeholder="Type a message"
                            value={MessageToSend}
                            ></IonTextarea>
                        {/* </IonItem> */}
                        <IonButton fill="clear" onClick={SendMessage}>
                            <IonIcon size='large' icon={paperPlaneOutline}></IonIcon>
                        </IonButton>
                        {/* <IonButton onClick={joinRoom}>
                            join chat
                        </IonButton> */}
                    </IonItem>

                </IonFooter>
                <IonPopover 
                    trigger="popover-button" 
                    ref={ModalElement} 
                    dismissOnSelect={false}>
                    <IonContent id='MoreOptions'>
                        <IonList>
                            {/* //This is Chat summarize feature with MOdel */}
                            <IonItem button={true} onClick={ChatSummarize} id='open-modal2' detail={false}>
                                Summary
                            </IonItem>
                            {/* Model for Chat Summary  */}
                            <IonModal 
                                onDidDismiss={()=>{ModalElement.current?.dismiss()}}
                                trigger="open-modal2"
                                initialBreakpoint={0.5}
                                breakpoints={[0, 0.25, 0.5, 0.75]}
                                // handleBehavior="cycle"
                                
                            >
                                <IonContent className="ion-padding">
                                    <div className="ion-margin-top">
                                        <IonItem>
                                        <IonLabel>
                                            <IonTitle>Chat Summary</IonTitle>
                                        </IonLabel>
                                        </IonItem>
                                        <IonText>
                                           {(ChatSummaryText) ? ChatSummaryText : 'Generating...'}                                            
                                        </IonText>
                                    </div>
                                </IonContent>
                            </IonModal>
                            <IonItem button={true} detail={false}>
                                Option 2
                            </IonItem>
                            {/* <IonItem button={true} detail={true} id="nested-trigger">
                                More options...
                            </IonItem> */}
                            {/* <IonPopover side='start' dismissOnSelect={true} trigger='nested-trigger'>
                                <IonContent>
                                    <IonList>
                                        <IonItem button={true} detail={false}>
                                            Option 1
                                        </IonItem>
                                        <IonItem button={true} detail={false}>Sub option 1</IonItem>
                                    </IonList>
                                </IonContent>
                            </IonPopover> */}
                        </IonList>
                    </IonContent>
                </IonPopover>
            </IonPage>
    )
}
export default User;