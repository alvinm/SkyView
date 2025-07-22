import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect } from '@ionic/react'
import { addCircle, addCircleOutline, closeCircle } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import { getPastelColor } from '../../GlobalFunctions/Functions'

const TextToInputSave = (props:any) =>{
    const [getViewText, setViewText]        = useState<any>(true)
    const txtGeneral                        = useRef<any>()
    const [getPlaceholder, setPlaceholder]     = useState<any>()
    useEffect(()=>{
        console.log(props)
        var text:any = props.placeholder_text+' '+props.text
        setPlaceholder(text)
    },[props])
    return(
        <div>
            {getViewText &&
                <IonRow>
                    <IonCol>
                        <IonIcon icon={props.icon} className="size-20"></IonIcon>
                        <div 
                            className="text-container ion-padding"
                            style={{backgroundColor:getPastelColor(props.text)}}
                            onClick={()=>{setViewText(!getViewText)}}
                        >
                            {getPlaceholder}
                        </div>
                    </IonCol>
                </IonRow>
            }
            {!getViewText &&
                <IonRow>
                    <IonIcon icon={props.icon} className="size-20"></IonIcon>
                    <IonCol>
                        <IonInput 
                            ref={txtGeneral} 
                            placeholder={getPlaceholder}
                            ></IonInput>
                    </IonCol>
                    <IonCol size="4">
                        <IonIcon 
                            icon={closeCircle} 
                            className='size-32 ion-text-hover'
                            onClick={()=>{setViewText(!getViewText)}}
                        ></IonIcon>
                        <IonIcon 
                            icon={addCircle} 
                            className='size-32 ion-text-hover'
                            onClick={()=>{
                                //alert(txtGeneral.current.value)
                                if(txtGeneral.current.value != '')
                                    props.result(txtGeneral.current.value)
                            }}
                        ></IonIcon>
                    </IonCol>
                </IonRow>
            }
        </div>
    )
}
export default TextToInputSave