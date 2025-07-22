import { IonCol, IonIcon, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas, formatDate, getPastelColor } from "../GlobalFunctions/Functions";import { buildOutline, calendarOutline, homeOutline, timeOutline } from "ionicons/icons";
import ProjectStats from "./Stats/ProjectStats";
'../GlobalFunctions/Functions'
const ProjectList = (props:any) =>{
    const [list, setList]           = useState<any>()
    const render = () =>{
        const array = props.data.map((x:any, i:number)=>{
            return(
            <div>
                <IonRow key={i} onClick={()=>{
                            var z:any=[]; 
                            z.push({
                                project_id:x.id,
                                work_flow_template_id:x.work_flow_template_id
                            });
                            props.result(z[0]);
                            props.location(x.project_name)
                            console.log(z[0])
                        }}
                        >
                    
                    <IonCol size="2">
                        <IonRow>
                            <IonCol  className="size-24 ion-padding" style={{backgroundColor:getPastelColor(x.project_name),borderRadius:"20px",marginBottom:"1vh"}}>
                                {x.project_name}
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2"></IonCol>
                    <IonCol>
                        <ProjectStats
                            state={props.state}
                            project_id={x.id}
                        />
                    </IonCol>
                </IonRow>
                <IonRow style={{border:"1px solid "+getPastelColor(x.project_name),borderRadius:"20px",marginBottom:"1vh"}}>
                    <IonCol size="5">
                        <IonRow>
                            <IonCol className="size-24">{x.project_description}</IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol></IonCol>
                    <IonCol size="2" className="size-24 ion-padding">
                        <IonRow className="text-container">
                            <IonCol size="2"><IonIcon icon={homeOutline} className='size-32'></IonIcon></IonCol>
                            <IonCol>{x.organization_name}</IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2" className="size-24 ion-text-left ion-padding">
                        <IonRow className="text-container">
                            <IonCol size="2"><IonIcon icon={calendarOutline} className='size-32'></IonIcon></IonCol>
                            <IonCol>{formatDate(x.start_date)}</IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2" className="size-24 ion-text-right ion-padding">
                        <IonRow className="text-container">
                            <IonCol size="2" className='size-32'>$</IonCol>
                            <IonCol>${addCommas((x.fee/1).toFixed(2))}</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
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