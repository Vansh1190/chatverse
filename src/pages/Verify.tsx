import { useEffect, useState } from 'react';
import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonSpinner } from '@ionic/react';
import axios from 'axios';
import Card from '../components/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../theme/pages/signup.css'
import jwt_decode from 'jwt-decode'

function PageOne() {
    const [countdown, setCountdown] = useState(0);
    const [success, setSuccess] = useState(false);
    const [SentOtp, setSentOtp] = useState(false);
    const [Otp, setOtp] = useState(false);
    const [Email, setEmail] = useState({});
    const [verified, setVerified] = useState(false);
    const [ResendOTP, setResendOTP] = useState(false)

    let GetOtp = (event: any) => {
        event.preventDefault();
        if (!Otp || ResendOTP) {
            setResendOTP(false);
            let x = document.getElementById("form") as HTMLFormElement
            const form = new FormData(x);
            form.append('authToken', localStorage.getItem('authToken') as string);
            const formDataObj = (Object.fromEntries(form.entries()));
            
            setEmail(formDataObj);
            if(Email['email'] == ''){
                toast.error("Email cannot be empty", {
                    draggablePercent: 40,
                    theme: "dark",
                    autoClose: 1500,

                });
                setCountdown(0);
                return
            }
            setSuccess(true);
            axios.post('https://chatverse-backend.onrender.com/auth/genotp', formDataObj).then((e) => {

                setSuccess(false)
                setSentOtp(true);
                setOtp(e.data.authOtp);
                toast.success("Otp sent successfully", {
                    draggablePercent: 40,
                    theme: "dark",
                    autoClose: 1500,
                });
                setCountdown(100);
                setTimeout(()=>{
                    document.getElementById("resendOtp")?.setAttribute('disabled', '');
            },100)


            }).catch((err) => {
                console.log(err, "err");
                setSuccess(false);
                toast.error(err.response.data, {
                    draggablePercent: 40,
                    theme: "dark",
                    autoClose: 1800,
                });
            })
        }
    }
    const verifyOtp = () => {
        let c = document.getElementById('otp')?.value
        if (Otp == c) {
            axios.post('https://chatverse-backend.onrender.com/auth/verify', Email).then((e) => {
                if (e.data.status == 200) {
                    localStorage.setItem("authToken", e.data.authToken);
                    setVerified(true);
                }
            }).catch((Err) => {
                console.log(Err)
            })
        }
        else {
            console.log(c, 'err not');
            toast.error("invalid otp", {
                draggablePercent: 40,
                theme: "dark",
                autoClose: 1500,
            });
            setResendOTP(false);
            return 
                
        }
    }



    useEffect(() => {
        if(!verified){
            let c:any = jwt_decode(localStorage.getItem("authToken") as string)
            document.getElementsByName('email')[0].value = c.email;
        }
        if(countdown >0){
            setTimeout(()=>{
                setCountdown(countdown-1);
            },1000)
        }
        if(countdown == 0){
            setCountdown(0)
            setResendOTP(true);
            document.getElementById("resendOtp")?.removeAttribute('disabled');
        }
    }, [verified, countdown]);

    if (verified) {
        setTimeout(() => {
            window.location.href= ('/chat')
        }, 5000)
        return (
            <Card title="verified successfully" message="you will be automatically redirected to homepage, please wait." img="https://cdn-icons-png.flaticon.com/512/1478/1478873.png" />
        )
    }


    return (

        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>verify with e-mail</IonTitle>
                </IonToolbar>
            </IonHeader>
            <ToastContainer position="top-center" limit={1} />
            <IonContent class="ion-padding page-container">
                <form id='form' action="" onSubmit={GetOtp}>

                    <IonInput type='email' name='email' readonly label="email" labelPlacement="floating" counter={true}
                        fill="solid" placeholder="" required
                    ></IonInput>
                    {(SentOtp) ? (<IonInput className='ion-margin-vertical' id='otp' type='tel' name='OTP' label="OTP" labelPlacement="floating" maxlength={6}
                        fill="solid" placeholder="" required
                    ></IonInput>) : null}
                    {(!SentOtp) ?
                        (<IonButton id='submitBtn' style={{marginTop:"15px"}} className='submitBtn' type='submit' fill="outline">

                            {(success ) ? "Sending " : "Generate OTP"}
                            {(success ) ? (<IonSpinner></IonSpinner>) : null}
                        </IonButton>) : (
                            <IonButton id='submitBtn' onClick={verifyOtp} type='submit' className='submitBtn' fill="outline">Verify</IonButton>
                        )
                    }
                    {(SentOtp) ? <IonButton id='resendOtp' style={{marginTop:"10px"}} className='submitBtn' fill='outline'  onClick={GetOtp}>
                        {(success) ? "Sending verification code " : `Resend ${(countdown == 0)? "":countdown}`}
                        {(success) ? (<IonSpinner></IonSpinner>) : null}
                    </IonButton> : null}
                </form>


            </IonContent>
        </>
    );
}

export default PageOne;