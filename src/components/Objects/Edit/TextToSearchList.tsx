import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect } from '@ionic/react'
import { addCircle, closeCircle } from 'ionicons/icons'
import React, { useRef, useState } from 'react'
import { getPastelColor } from '../../GlobalFunctions/Functions'

const TextToSearchList = (props:any) =>{
    const [getViewText, setViewText]        = useState<any>(true)
    const txtGeneral                        = useRef<any>()
    return(
        <div>
            {getViewText &&
                <IonRow>
                    <IonCol>
                        <IonRow 
                            className={props.text != null?"text-container ion-padding": "text-container-empty ion-padding"}

                            style={{backgroundColor:getPastelColor(props.text),border:props.text != null? "none":"1px dashed #ccc"}}
                            onClick={()=>{setViewText(!getViewText)}}
                        >
                            <IonCol size="2">
                                <IonIcon icon={props.icon} className="size-32"></IonIcon>
                            </IonCol>
                            <IonCol>
                                {props.text != null? props.text: "Assign User"}
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            }
            {!getViewText &&
                <IonRow>
                    <IonCol>
                        <IonInput 
                            ref={txtGeneral} 
                            placeholder={props.placeholder+' '+ props.text}
                            value={props.text}
                            onKeyUp={(e)=>{props.result(e.currentTarget.value)}}
                            ></IonInput>
                    </IonCol>
                    <IonCol size="1">
                        <IonIcon 
                            icon={closeCircle} 
                            className='size-32 ion-text-hover'
                            onClick={()=>{setViewText(!getViewText)}}
                        ></IonIcon>
                    </IonCol>
                </IonRow>
            }
        </div>
    )
}
export default TextToSearchList