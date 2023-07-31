import { useEffect, useState } from 'react';
import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonSpinner, IonPage } from '@ionic/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../theme/pages/signup.css'

function ForgotPass() {
    const [countdown, setCountdown] = useState(0);
    const [success, setSuccess] = useState(false);
    const [SentOtp, setSentOtp] = useState(false);
    const [PassWord, setPassWord] = useState(false);
    // const [PassWord, setPassWord] = useState(false);
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
            const formDataObj = (Object.fromEntries(form.entries()));
            setEmail(formDataObj.email)
            if (Email['email'] == '') {
                toast.error("Email cannot be empty", {
                    draggablePercent: 40,
                    theme: "dark",
                    autoClose: 1500,
                });
                setCountdown(0);
                return
            }
            setSuccess(true);
            axios.post('https://chatverse-backend.onrender.com/updatePass/genotp', formDataObj).then((e) => {

                setSuccess(false)
                setSentOtp(true);
                setOtp(e.data.authOtp);
                toast.success("Otp sent successfully", {
                    draggablePercent: 40,
                    theme: "dark",
                    autoClose: 1500,
                });
                setCountdown(100);
                setTimeout(() => {
                    document.getElementById("resendOtp")?.setAttribute('disabled', '');
                }, 100)
            }).catch((err) => {
                toast.error("email not found", {
                    draggablePercent: 40,
                    theme: "dark",
                    autoClose: 1800,
                });
                setSuccess(false);
            })
        }
    }
    const verifyOtp = () => {
        let c = document.getElementById('otp')?.value
        if (Otp == c) {
            setVerified(true);
            setSentOtp(false)
            setPassWord(true)
        }
        else {
            toast.error("invalid otp", {
                draggablePercent: 40,
                theme: "dark",
                autoClose: 1500,
            });
            setResendOTP(false);
            return

        }
    }

    const ChangePassWord = () => {

        let x = document.getElementById("form") as any
        const form = new FormData(x);
        const formDataObj = (Object.fromEntries(form.entries()));
        let c:any = (formDataObj.confirmPassword)
        let c2:any = (formDataObj.password)
        formDataObj.email = Email
        if(formDataObj.password != formDataObj.confirmPassword){
            toast.error("Password not match", {
                draggablePercent: 40,
                theme: "dark",
                autoClose: 1500,
            });
            return;
        }
        if( c.length < 6 || c2.length < 6){
            toast.error("Password should min of 6 digits.", {
                draggablePercent: 40,
                theme: "dark",
                autoClose: 1500,
            });
            return;

        }

        axios.post('https://chatverse-backend.onrender.com/updatePass/password', formDataObj).then((e) => {
        
        toast.success("Password changed successfully", {
            draggablePercent: 40,
            theme: "dark",
            autoClose: 1500,
        });
        setTimeout(() => {
            window.location.href = 'https://chatuniverse.vercel.app'

            // document.getElementById("resendOtp")?.setAttribute('disabled', '');
        }, 1500)


    }).catch((err) => {
        setSuccess(false);
        toast.error(err.response.data, {
            draggablePercent: 40,
            theme: "dark",
            autoClose: 1800,
        });
    });
}


    useEffect(() => {
        if (countdown > 0) {
            setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000)
        }
        if (countdown == 0) {
            setCountdown(0)
            setResendOTP(true);
            setOtp(false)
            document.getElementById("resendOtp")?.removeAttribute('disabled');
        }
    }, [verified, countdown]);

    // if (verified) {
    //     // setTimeout(() => {
    //     //     window.location.href = ('/chat')
    //     // }, 4000)
    //     return (
    //         <Card title="verified successfully" message="you will be automatically redirected to homepage, please wait." img="https://cdn-icons-png.flaticon.com/512/1478/1478873.png" />
    //     )
    // }


    return (

        <>
            <IonPage>

                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Forget your account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ToastContainer position="top-center" limit={1} />
                <IonContent class="ion-padding page-container">
                    <form id='form' action="" onSubmit={GetOtp}>

                        {
                            (verified) ?
                                <>
                                    <IonInput type='password' minlength={6} name='password' label="password" labelPlacement="floating"
                                        fill="solid" placeholder="" required
                                    ></IonInput>
                                    <IonInput type='password' minlength={6} name='confirmPassword' label="confirmPassword" labelPlacement="floating"
                                        fill="solid" placeholder="" required
                                    ></IonInput>
                                </>
                                :
                                <IonInput type='email' name='email' label="email" labelPlacement="floating" counter={true}
                                    fill="solid" placeholder="" required
                                ></IonInput>
                        }

                        {(!PassWord) ?
                            <>
                                {(SentOtp) ? (<IonInput className='ion-margin-vertical' id='otp' type='tel' name='OTP' label="OTP" labelPlacement="floating" maxlength={6}
                                    fill="solid" placeholder="" required
                                ></IonInput>) : null}

                                {(!SentOtp) ?
                                    (<IonButton id='submitBtn' style={{ marginTop: "15px" }} className='submitBtn' type='submit' fill="outline">
                                        {(success) ? "Sending " : "Generate OTP"}
                                        {(success) ? (<IonSpinner></IonSpinner>) : null}
                                    </IonButton>) : (
                                        <IonButton id='submitBtn' onClick={verifyOtp} type='submit' className='submitBtn' fill="outline">Verify</IonButton>
                                    )
                                }
                                {(SentOtp) ? <IonButton id='resendOtp' style={{ marginTop: "10px" }} className='submitBtn' fill='outline' onClick={GetOtp}>
                                    {(success) ? "Sending verification code " : `Resend ${(countdown == 0) ? "" : countdown}`}
                                    {(success) ? (<IonSpinner></IonSpinner>) : null}
                                </IonButton> : null}
                            </> :
                                <IonButton id='submitBtn' onClick={ChangePassWord} type='submit' className='submitBtn' fill="outline">Change Password</IonButton>
                        }
                    </form>


                </IonContent> </IonPage>

        </>
    );
}

export default ForgotPass;