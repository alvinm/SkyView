import React, { useEffect, useState } from 'react';
import './Login.css';
import { IonCol, IonIcon, IonImg, IonRow } from '@ionic/react';
import Button from '../Objects/Buttons/Index';
import { eyeOutline } from 'ionicons/icons';
import '../../pages/Home.css'

const Login = (props: any) => {
    const [email, setEmail]                         = useState<string>('');
    const [password, setPassword]                   = useState<string>('');
    const [showPassword, setShowPassword]           = useState<boolean>(false);
    const [error, setError]                         = useState<string | null>(null);
    const [user, setUser]                           = useState<any>(null);
    const [hideManualLogin, showManualLogin]        = useState<any>()


    const callLogin = async () => {
        try {
            const response = await fetch(`${props.state.secondary_host}getData?admin=select_login 
                &email=${email}
                &password=${password}`
            )

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            console.log(data);
            if(data[0].id != 0){
                props.result(data[0])
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError((error as Error).message);
        }
    };
    const handleAuthResult = (data: any) => {
        setUser(data); // Store user data in state
        console.log("Authentication Response:", data);
        if(data.message == "User Not Authenticated"){
            showManualLogin(true)
        }else{
            props.result_ad(data)
        }
    };
    
    return (
        <div className="login-container">
            <div>
                <IonRow>
                    <IonCol className='ion-text-center'>
                        <IonImg src="../../assets/images/ok-logo.png" style={{width:"128px"}} className="size-36 logo" alt="Logo" />
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>&nbsp;</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="10">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="item placeholder-container"
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="10">
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="item placeholder-container"
                            />
                        </div>
                    </IonCol>  
                    <IonCol>
                        <IonIcon icon={eyeOutline}
                            className="toggle-password size-24 ion-text-right"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </IonIcon>
                    </IonCol>
                
                </IonRow>
                <IonRow>
                    <IonCol>{error && <div className="error-message">{error}</div>}</IonCol>
                </IonRow>
                <Button
                    action="1"
                    result={callLogin}
                    label="Login"
                    background_color="#fff"
                    color="#000"
                    border="1px solid #fff"
                    border_radius="10px"
                    font_size="1em"
                    width="30%"
                    margin_left="0%"
                    
                />
            </div>
        </div>
    );
};

export default Login;
