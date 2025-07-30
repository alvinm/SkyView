import { IonCol, IonIcon, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas, formatDate, getPastelColor } from "../GlobalFunctions/Functions";import { arrowForward, arrowForwardCircleSharp, buildOutline, calendarOutline, chevronDownOutline, homeOutline, pencilSharp, timeOutline } from "ionicons/icons";
import ProjectStats from "./Stats/ProjectStats";
'../GlobalFunctions/Functions'
const ProjectList = (props:any) =>{
    const [list, setList]           = useState<any>()
    const [hideStats, showStats]    = useState<any>()
    const render = () =>{
        const array = props.data.map((x:any, i:number)=>{
            return(
            <div style={{border:"0px solid "+getPastelColor(x.project_name),borderRadius:"20px",marginBottom:"1vh"}}>
                <IonRow key={i} >
                    
                    <IonCol size="3">
                        <IonRow>
                            <IonCol  className="size-24 ion-padding" style={{backgroundColor:getPastelColor(x.project_name),borderRadius:"20px",marginBottom:"1vh"}}>
                                <IonRow>
                                    <IonCol>{x.project_name}</IonCol>
                                    <IonCol 
                                        size="2" 
                                        className="ion-text-hover"
                                        onClick={()=>{showStats(!hideStats)}}
                                    >
                                        <IonIcon icon={chevronDownOutline} className="size-48"></IonIcon>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="9">
                        <IonRow>
                            <IonCol size="4" className="size-24 ion-padding">
                                <IonRow className="text-container">
                                    <IonCol size="2"><IonIcon icon={homeOutline} className='size-32'></IonIcon></IonCol>
                                    <IonCol>{x.organization_name}</IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="3" className="size-24 ion-text-left ion-padding">
                                <IonRow className="text-container">
                                    <IonCol size="2"><IonIcon icon={calendarOutline} className='size-32'></IonIcon></IonCol>
                                    <IonCol>{formatDate(x.start_date)}</IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="3" className="size-24 ion-text-right ion-padding ion-text-right">
                                <IonRow className="text-container">
                                    <IonCol size="2" className='size-32'>$</IonCol>
                                    <IonCol>${addCommas((x.fee/1).toFixed(2))}</IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    <IonCol>
                                        <IonIcon icon={pencilSharp} className="size-48 ion-text-hover" style={{color:"lightblue"}}></IonIcon>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol
                                size="1"
                                onClick={()=>{
                                    var z:any=[]; 
                                    z.push({
                                        project_id:x.id,
                                        work_flow_template_id:x.work_flow_template_id,
                                        status_id:0
                                    });
                                    props.result(z[0]);
                                    props.location(x.project_name)
                                    console.log(z[0])
                                }}
                                className="ion-text-right"
                            >
                                <IonRow className="ion-padding ion-text-right">
                                    <IonCol>
                                        <IonIcon icon={arrowForwardCircleSharp} className="size-48 ion-text-hover" style={{color:"lightblue"}}></IonIcon>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                {hideStats &&
                    <IonRow >
                        <IonCol size="3">
                            <IonRow>
                                <IonCol className="size-24">{x.project_description}</IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol>
                            <ProjectStats
                                state={props.state}
                                project_id={x.id}
                            />
                        </IonCol>
                    </IonRow>
                }
            </div>
            )
        })
        setList(array)
    }
    useEffect(()=>{
        render()
    },[])
    return(
        <div>
            {list}
        </div>
    )
}
export default ProjectList