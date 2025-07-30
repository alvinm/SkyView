import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect } from '@ionic/react'
import { addCircle, closeCircle, closeOutline, pencilOutline } from 'ionicons/icons'
import React, { useRef, useState } from 'react'
import { getPastelColor } from '../../GlobalFunctions/Functions'

const TextToDDL = (props:any) =>{
    const [getViewText, setViewText]        = useState<any>(true)
    const ddlGeneral                        = useRef<any>()
    const txtAddField                       = useRef<any>()
    const [hideAddField, showAddField]      = useState<any>(true)

    return(
        <div>
            {hideAddField &&
            <div>
                {getViewText &&
                    <IonRow>
                        <IonCol>
                            <IonIcon icon={props.icon} className="size-20"></IonIcon>
                            <div 
                                className="text-container ion-padding "
                                style={{backgroundColor:getPastelColor(props.text)}}
                                onClick={()=>{setViewText(!getViewText)}}
                            >
                                {props.placeholder_text}
                            </div>
                        </IonCol>
                    </IonRow>
                }
                {!getViewText &&
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Select Option</IonLabel>
                                <IonSelect 
                                    ref={ddlGeneral}
                                    onIonChange={(e)=>{
                                        var x:any = []
                                        x.push({value:e.detail.value, text:e.target.innerText})
                                        props.result(e.detail.value)
                                        
                                    }}
                                >
                                    {props.options}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size="1">
                            <IonIcon 
                                icon={addCircle} 
                                className="size-32 ion-text-hover"
                                onClick={()=>{
                                    showAddField(!hideAddField)
                                }}
                            ></IonIcon>
                        </IonCol> 
                        <IonCol size="1">
                            <IonCol>
                                <IonIcon 
                                    icon={closeCircle} 
                                    className='size-32 ion-text-hover'
                                    onClick={()=>{setViewText(!getViewText)}}
                                ></IonIcon>
                            </IonCol>
                        </IonCol>
                    </IonRow>
                }
            </div>
            }
            {!hideAddField &&
            <IonRow>
                <IonCol size="11">
                    <IonInput 
                        ref={txtAddField}
                        className="text-container ion-padding"
                        placeholder='Add Subcategory'
                    >
                    </IonInput>
                </IonCol>
                <IonCol>
                    <IonIcon 
                        icon={addCircle} 
                        className='size-32 ion-text-hover'
                        onClick={()=>{props.add_result()}}
                    ></IonIcon>
                </IonCol>
            </IonRow>
            }
        </div>
    )
}
export default TextToDDL