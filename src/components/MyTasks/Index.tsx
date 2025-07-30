import { IonBadge, IonCol, IonIcon, IonRow } from "@ionic/react"
import { calendarOutline, chatboxEllipsesOutline, checkmarkCircle, checkmarkCircleOutline, checkmarkDoneCircleOutline, clipboardOutline, closeCircleOutline, homeOutline, listOutline, personAddOutline, personOutline, timeOutline } from "ionicons/icons"
import React, { useState } from "react"
import { formatDate, getPastelColor } from "../GlobalFunctions/Functions"
import TextToSearchList from "../Objects/Edit/TextToSearchList"
import TaskList from "../Task/Task"

const MyTasks = (props:any) =>{
    const [list, setList]                   = useState<any>()
    const [getStatusCode, setStatusCode]    = useState<any>()
    const [getStatusIcon, setStatusIcon]    = useState<any>()
    const [getStatusName, setStatusName]    = useState<any>()
    const callTaskByStatus = (status_id:any, status_name:any,status_icon:any,status_code:any) =>{
        setStatusCode(status_code)
        setStatusIcon(status_icon)
        setStatusName(status_name)
        
        var data:any = []
        data.push(
            {
                project_id:0,
                work_flow_category_id:0,
                work_flow_template_id:0,
                status_id:status_id
            }
        )
        const taskList:any = <TaskList 
            state = {props.state}
            data = {data[0]}
            chat = {(e:any)=>{props.chat(e)}}

        />
        setList(taskList)
    }

    return(

        <IonRow>
            <IonCol size="3">
                <IonRow className="size-24 ion-padding" >
                    <IonCol size="1">
                        <IonIcon icon={clipboardOutline} className="size-48"></IonIcon>
                    </IonCol>
                    <IonCol size="11" className="ion-text-left ion-padding ion-text-bold">My Tasks Home</IonCol>
                </IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow 
                    className="text-container" 
                    
                    onClick={()=>{callTaskByStatus(18,"Tasks Assigned To Me", listOutline,1)}}
                >
                    <IonCol>
                        <IonRow className="size-24 ion-padding" >
                            <IonCol size="1">
                                <IonIcon icon={listOutline} className="size-48"></IonIcon>
                            </IonCol>
                            <IonCol size="11" className="ion-text-left ion-padding">Tasks Assigned To Me</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow 
                    className="text-container" 
                    
                    onClick={()=>{callTaskByStatus(19,"Submitted By Me For Approval",checkmarkCircleOutline,2)}}
                >
                    <IonCol>
                        <IonRow className="size-24 ion-padding">
                            <IonCol size="1">
                                <IonIcon icon={checkmarkCircleOutline} className="size-48"></IonIcon>
                            </IonCol>
                            <IonCol size="11" className="ion-text-left ion-padding">Submitted By Me For Approval</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow 
                    className="text-container" 
                    
                    onClick={()=>{callTaskByStatus(21,"Rejected Tasks For My Attention",closeCircleOutline,3)}}
                >
                    <IonCol>
                        <IonRow className="size-24 ion-padding">
                            <IonCol size="1">
                                <IonIcon icon={closeCircleOutline} className="size-48"></IonIcon>
                            </IonCol>
                            <IonCol size="11" className="ion-text-left ion-padding">Rejected Tasks For My Attention</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow 
                    className="text-container" 
                    
                    onClick={()=>{callTaskByStatus(20,"Approved Tasks", checkmarkDoneCircleOutline,4)}}
                >
                    <IonCol>
                        <IonRow className="size-24 ion-padding">
                            <IonCol size="1">
                                <IonIcon icon={checkmarkDoneCircleOutline} className="size-48"></IonIcon>
                            </IonCol>
                            <IonCol size="11" className="ion-text-left ion-padding">Approved Tasks</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonCol>
            <IonCol size="9" >
                <IonRow>
                    <IonCol size="12" className="ion-text-bold size-24"  style={{borderBottom:"0px solid lightblue"}}>
                        <IonRow >
                            <IonCol size="1"><IonIcon icon={getStatusIcon} className="size-48"></IonIcon></IonCol>
                            <IonCol size="3" className="ion-text-left ion-padding">{getStatusName}</IonCol>
                            <IonCol></IonCol>
                            <IonCol size="2">
                                <div className="ion-padding text-container ion-text-center">All</div>
                            </IonCol>
                            <IonCol size="2">
                                <div className="ion-padding text-container ion-text-center">Over Due</div>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow >
                    <IonCol style={{borderBottom:"0px solid lightblue", marginBottom:"1vh",backgroundColor:"#DEF1FF", color:"#005BD3", borderRadius:"20px"}}>
                            <IonRow className="ion-padding" >
                                <IonCol size="1">
                                    <IonRow>
                                        <IonCol></IonCol>
                                        <IonCol></IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol size="3" className="" >
                                    <IonRow>
                                        <IonCol className="size-24">
                                            <div><b>Task</b></div>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="size-18">Description</IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol size="2" className="ion-text-left">
                                    <IonRow>
                                        <IonCol className="size-24">
                                            <b>Assigned User</b>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol size="2" className="ion-text-left">
                                    <IonRow>
                                        <IonCol className="size-24">
                                            <b>Reviewer</b>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol size="2" className="ion-text-left ">
                                    <div className="" >
                                        <IonRow>
                                            <IonCol className="size-24"><b>Start Date</b></IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                                <IonCol size="2" className="ion-text-left ">
                                    <div className="">
                                        <IonRow>
                                            <IonCol className="size-24"><b>Duration</b></IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                    </IonCol>
                </IonRow>
                <div style={{overflowY:"auto",height:"75vh"}}>
                    {list}
                </div>
            </IonCol>
        </IonRow>
    )
}
export default MyTasks