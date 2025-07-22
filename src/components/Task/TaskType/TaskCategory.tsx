import { IonCol, IonIcon, IonLabel, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas, formatDate, getPastelColor } from "../../GlobalFunctions/Functions";import TaskList from "../Task";
import { addCircleOutline, chevronDown } from "ionicons/icons";
import $ from 'jquery'
import "./TaskCategory.css"
import CategoryStats from "../Stats/CategoryStats";

const TaskCategoryList = (props:any) =>{
    const [list, setList]           = useState<any>()
    const [stats, setStats]         = useState<any>()
    const showTasks = (category:any) =>{
       
        if($("."+category).is(':visible')){
            $("."+category).hide()
        }else{
            $("."+category).show()
        }
    }
    
    const render = () =>{
        const array = props.data.map((x:any, i:number)=>{
            return(
            <div key={i} className="ion-padding">
            <div style={{marginBottom:"1vh",border:"1px solid "+getPastelColor(x.name),borderRadius:"20px"}}>
                <IonRow  
                    style={{borderBottom:"1px solid #eee", fontWeight:"bold"}}
                    className="ion-padding"
                >
                    <IonCol size="3" className="ion-padding">
                        <div className="ion-padding size-24 ion-text-bold"
                            style={{backgroundColor:getPastelColor(x.name),borderRadius:"20px"}}

                        >
                            <IonRow>
                                <IonCol >
                                    <IonLabel onClick={()=>{props.result(x.work_flow_category_id)}}>
                                        {x.name}
                                    </IonLabel>
                                </IonCol>
                                <IonCol size='1'>
                                    <IonIcon 
                                        icon={chevronDown} 
                                        className="size-32 ion-text-hover"
                                        onClick={()=>{showTasks("category-"+x.work_flow_category_id)}}
                                    ></IonIcon>
                                </IonCol>
                            </IonRow>
                        </div>
                    </IonCol> 
                    <IonCol size="9" className="ion-text-left">
                        <CategoryStats
                            state={props.state}
                            work_flow_category_id={x.work_flow_category_id}
                            project_id={x.project_id}
                        />
                    </IonCol>
                </IonRow>
                
                </div>
                <div 
                    style={{marginBottom:"1vh",border:"1px solid "+getPastelColor(x.name),borderRadius:"20px"}}
                    className={"category-"+x.work_flow_category_id+ " hide-category"}
                >
                <IonRow >
                    <IonCol>
                            <IonRow className="ion-padding" >
                                <IonCol size="1">
                                    <IonRow>
                                        <IonCol> </IonCol>
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
                                <IonCol></IonCol>
                                <IonCol size="2" className="ion-text-left">
                                    <IonRow>
                                        <IonCol className="size-24">
                                            <b>Assigned User</b>
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
                            <TaskList
                                state = {props.state}
                                data = {x}
                                chat = {(e:any)=>{props.chat(e)}}
                                timesheet = {(e:any)=>{props.timesheet(e)}}
                            />
                    </IonCol>
                </IonRow>
                </div>
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
export default TaskCategoryList