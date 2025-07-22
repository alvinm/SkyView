import { IonCol, IonContent, IonIcon, IonPage, IonRow } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

import ImageUpload from "../DocumentUpload/DocumentUpload";
import { banOutline, cameraOutline, close, cloudUploadOutline } from "ionicons/icons";
import './DocumentController.css'

const DocumentController = (props:any) =>{
    return (
        <div>
        <IonRow>
            <IonCol className="ion-text-right">
                <IonIcon onClick={()=>{props.close()}} icon={close} className="size-36 ion-text-hover"></IonIcon>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <ImageUpload
                    state={props.state}
                    params={props.params}
                    result={()=>{props.close()}}
                />
            </IonCol>
        </IonRow>
        </div>
    );
};
export default DocumentController