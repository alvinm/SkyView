import React, { useEffect, useRef, useState } from 'react';
import { IonCol, IonContent, IonIcon, IonInput, IonPage, IonRow } from '@ionic/react';
import { checkmarkDoneCircleSharp, close } from 'ionicons/icons';
import { formatDate } from '../../../GlobalFunctions/Functions';

const Timesheet = (props:any) =>{
    const [timesheet, setTimesheet]         = useState<any>()

    const setContactTimesheet = (id:any, hours:any, date:any) =>{
        alert(hours)
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=insert_contact_task_timesheet"+
            "&id="+id+
            "&contact_id="+props.params.user_id+
            "&task_id="+props.params.task_id+
            "&hours="+hours+
            "&date="+date, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
            callContactTimesheet()
            props.update_task(id)
        })
    }
    const callContactTimesheet = () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_contact_task_timesheet"+
            "&contact_id="+props.params.user_id+
            "&task_id="+props.params.task_id, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
            const list:any = data.map((x:any, i:number)=>{
                return(
                    <IonRow className="size-22">
                        <IonCol size="5">{x.day_of_week} ({formatDate(x.date)})</IonCol>
                        <IonCol size="3">
                            {(x.duration/1).toFixed(2)}
                        </IonCol>
                        <IonCol size="3">
                            <div 
                                style={{border:"1px dashed #000",borderRadius:"24px", height:"32px",padding:"3px",paddingLeft:"20px"}} 
                                className="ion-text-hover" 
                                contentEditable
                                onKeyUp={(e)=>{setContactTimesheet(x.id,e.currentTarget.innerText, formatDate(x.date))}}
                            >
                                {(x.hours/1).toFixed(2)}
                            </div>
                        </IonCol>
                        <IonCol size="1">
                            <IonIcon 
                                icon={checkmarkDoneCircleSharp} 
                                className={
                                    x.complete/1 == 1 && (x.hours == x.duration)?   "size-42 text-green":
                                    x.complete/1 == 1 && (x.hours > x.duration)?    "size-42 text-red":
                                    x.complete/1 == 1 && (x.hours < x.duration)?    "size-42 text-green":
                                    "size-42 text-black"
                                }
                            >
                            </IonIcon>
                        </IonCol>
                    </IonRow>
                )
            })
            setTimesheet(list)
        })
    }
    useEffect(()=>{
        callContactTimesheet()
    },[props])
    return(
        <div className="ion-padding">
            <IonRow className="ion-text-bold size-24 bg-white">
                <IonCol size="5">Timesheet</IonCol>
                <IonCol size="3"></IonCol>
                <IonCol size="3"></IonCol>
                <IonCol size="1">
                    <IonIcon icon={close} className='size-42 ion-text-hover' onClick={()=>{props.close()}} ></IonIcon> 
                </IonCol>
            </IonRow>
            <IonRow className="ion-text-bold size-24">
                <IonCol size="5">Day Of Week</IonCol>
                <IonCol size="3">Budget</IonCol>
                <IonCol size="3">Actual Hours</IonCol>
                <IonCol size="1">Status</IonCol>
            </IonRow>
            {timesheet}
        </div>
    )
}
export default Timesheet