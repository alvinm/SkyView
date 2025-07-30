import { IonBadge, IonCol, IonIcon, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas, formatDate, getPastelColor } from "../GlobalFunctions/Functions";import { calendarOutline, chatboxEllipsesOutline, checkmarkCircle, checkmarkCircleOutline, checkmarkDoneCircleOutline, person, personAddOutline, personOutline, timeOutline } from "ionicons/icons";
import TextToSearchList from "../Objects/Edit/TextToSearchList";
import NotesChat from "./objects/Note/NotesChat";
'../GlobalFunctions/Functions'
const TaskList = (props:any) =>{
    const [list, setList]                   = useState<any>()
    const [contactData, setContactData]     = useState<any>()

    const setTaskStatus = (task_id:any) =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=update_task_status"+
            "&task_id="+task_id+
            "&contact_id="+props.state.user_id+
            "&status_id="+18, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data=>{
            setContactData(data)
        })
    }
    const callTaskContacts = (task_id:any) =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=selet_task_contacts"+
            "&task_id="+task_id,
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data=>{
            callTask()
        })
    }
    const reloadTimesheetHoursById = () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_timesheet_by_id"+
            "&id="+props.timesheet_id, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data=>{
            $("#hours_"+props.timesheet_id).text(data[0].hours)
        })
    }
    const callTask = async () =>{
        var s:any = null
        setList(s)
        var status_id = props.data.status_id == undefined ? 0 : props.data.status_id
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_task"+
            "&contact_id="+props.state.user_id+
            "&project_id="+props.data.project_id+
            "&work_flow_category_id="+props.data.work_flow_category_id+
            "&work_flow_template_id="+props.data.work_flow_template_id+
            "&status_id="+status_id
            , 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
            const array = data.map((x:any, i:number)=>{
            return(
            <div>
                {props.data.status_id != undefined  &&
                    <IonRow key={i} >
                        <IonCol size="2" className="ion-padding size-24 text-container" style={{backgroundColor:getPastelColor(x.project_name)}}>{x.project_name}</IonCol>
                    </IonRow>
                }
                <IonRow className="ion-padding">
                    <IonCol size="1">
                        <IonRow>
                            <IonCol>
                                <IonIcon 
                                    
                                    icon={checkmarkCircle} className={
                                        x.status_id == 19? "ion-text-hover size-42 text-orange"   :
                                        x.status_id == 20? "ion-text-hover size-42 text-green"    :
                                        x.status_id == 21? "ion-text-hover size-42 text-red"      : "ion-text-hover size-42 text-grey" 
                                    }
                                    onClick={()=>{
                                        if(x.duration/1 > 0 && x.note_count/1 > 0){
                                            setTaskStatus(x.id)
                                        }else{
                                            alert("Please add a note and/or time on timesheet.")
                                        }
                                    }}
                                ></IonIcon>
                            </IonCol>
                            <IonCol onClick={()=>{
                                    var z:any=[];
                                    z.push({
                                        project_id:props.data.project_id|x.project_id,
                                        task_id:x.id,
                                        user_id:props.state.user_id,
                                        data:x
                                    })
                                    props.chat(z[0])
                                }} 
                                className="ion-text-hover"
                            >
                                <IonIcon icon={chatboxEllipsesOutline} className="size-42" ></IonIcon>
                                <IonBadge style={{position:"absolute",top:"0px",padding:"5px",borderRadius:"5px"}}>
                                    {x.note_count}
                                </IonBadge>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="3" className="text-container ion-padding" style={{marginBottom:"1vh"}}>
                        <IonRow>
                            <IonCol className="size-20">
                                <div><b>{x.name}</b></div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>{x.description}</IonCol>
                        </IonRow>
                    </IonCol>
                    
                    <IonCol size="2" className="ion-text-left">
                        <IonRow>
                            <IonCol className="size-18">
                                <TextToSearchList
                                    icon={x.assigned == null ? personAddOutline :personOutline}
                                    text= {x.assigned}
                                    placeholder="assign user"
                                />
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2" className="ion-text-left">
                        <IonRow>
                            <IonCol className="size-18">
                                <TextToSearchList
                                    icon={x.reviewer == null ? checkmarkDoneCircleOutline :checkmarkDoneCircleOutline}
                                    text= {x.reviewer}
                                    placeholder="reviewer"
                                />
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2" className="ion-text-right ion-padding">
                        <div className="text-container ellipsis-text ion-padding" >
                            <IonRow>
                                <IonCol size="1"><IonIcon icon={calendarOutline} className="size-36"></IonIcon></IonCol>
                                <IonCol className="size-20">{formatDate(x.start_date)}</IonCol>
                            </IonRow>
                        </div>
                        
                    </IonCol>
                    <IonCol size="2" className="ion-text-right ion-padding">
                        <div 
                            className="text-container ellipsis-text ion-padding"
                            onClick={()=>{
                                var z:any=[];
                                z.push({
                                    project_id:props.data.project_id,
                                    task_id:x.id,
                                    user_id:props.state.user_id,
                                })
                                props.timesheet(z[0])
                            }}
                        >
                            <IonRow>
                                <IonCol size="1"><IonIcon icon={timeOutline} className="size-36"></IonIcon></IonCol>
                                <IonCol className="size-20">
                                    <span id={"hours_"+x.id}>{(x.actual_contractor_hours/1).toFixed(2)}</span>/{(x.budget_task_hours/1).toFixed(2)}
                                </IonCol>
                            </IonRow>
                        </div>
                    </IonCol>
                </IonRow>
            </div>
            )
        })
        setList(array)
        })
    }
    useEffect(()=>{
        reloadTimesheetHoursById()
    },[props.timesheet_id])
    useEffect(()=>{
        callTask()
    },[props])
    return(
        <div>
            {list}
        </div>
    )
}
export default TaskList