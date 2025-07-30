import { IonCol, IonIcon, IonRow } from "@ionic/react";
import { addCircle, addCircleOutline, businessOutline, checkmarkCircleOutline, checkmarkDoneCircle, closeCircle, documentAttachOutline, hammerOutline, listOutline, personAddOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import TextToInputSave from "../Objects/Edit/TextToInputSave";

const Admin = (props:any) =>{
    const [parentListId, setParentListId]           = useState<any>(22)
    const [list, setList]               = useState<any>()
    const [getTypeName, setTypeName]    = useState<any>()
    const callList = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?admin=select_list'+
            "&parent_id="+parentListId,
        )
        const data = await response.json();
        const lists:any = data.map((x:any, i:number)=>{
            return(
                    <IonCol size="3" key={i}>
                        <IonRow className="size-24 ion-padding"  >
                            <IonCol><div className="text-container ion-padding">{x.list_desc}</div></IonCol>
                            <IonCol size="1">
                                <IonIcon icon={x.archived_date == null?checkmarkCircleOutline:closeCircle} className={x.archived_date == null?"size-48 text-green ion-text-hover":"size-48 text-red ion-text-hover"}></IonIcon>
                            </IonCol> 
                        </IonRow>
                    </IonCol>
            )
        })
        setList(lists)
    }
    useEffect(()=>{
        callList()
    },[parentListId])
    useEffect(()=>{
        callList()
        setTypeName("Add Contractor Roles")
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol size="3">
                    <IonRow>
                        <IonCol size="4" className="">
                            <IonIcon icon={hammerOutline} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol size="8" className="size-24 ion-padding ion-text-bold ion-text-left">
                           Admin
                        </IonCol>
                    </IonRow>
                    <IonRow><IonCol></IonCol></IonRow>
                    <IonRow><IonCol></IonCol></IonRow>
                    <IonRow 
                        className='ion-padding text-container size-24 ion-text-bold' 
                        onClick={()=>{
                            setParentListId(22);
                            var x:any =<div>
                                <IonCol size="1"><IonIcon icon={personAddOutline} className="size-48"></IonIcon></IonCol>
                                <IonCol className="ion-padding">Add Contractor Roles</IonCol>
                            </div>
                            setTypeName(x)
                        }}
                    >
                        <IonCol size="1"><IonIcon icon={personAddOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Add Contractor Roles</IonCol>
                    </IonRow>
                    <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold' 
                        onClick={()=>{
                            setParentListId(1068);
                            var x:any =<div>
                                <IonCol size="1"><IonIcon icon={businessOutline} className="size-48"></IonIcon></IonCol>
                                <IonCol className="ion-padding">Add Business Types</IonCol>
                            </div>
                            setTypeName(x)
                        }}
                    >
                        <IonCol size="1"><IonIcon icon={businessOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Add Business Types</IonCol>
                    </IonRow>
                     <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold' 
                        onClick={()=>{
                            setParentListId(38);
                            var x:any =<div>
                                <IonCol size="1"><IonIcon icon={checkmarkDoneCircle} className="size-48"></IonIcon></IonCol>
                                <IonCol className="ion-padding">Add Reviewer Types</IonCol>
                            </div>
                            setTypeName(x)
                        }}
                    >
                        <IonCol size="1"><IonIcon icon={checkmarkDoneCircle} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Add Reviewer Types</IonCol>
                    </IonRow>
                     <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold'
                        onClick={()=>{
                            setParentListId(43);
                            var x:any =<div>
                                <IonCol size="1"><IonIcon icon={listOutline} className="size-48"></IonIcon></IonCol>
                                <IonCol className="ion-padding">Project Types</IonCol>
                            </div>
                            setTypeName(x)
                        }}
                    >
                        <IonCol size="1"><IonIcon icon={listOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Project Types</IonCol>
                    </IonRow>
                     <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold' 
                         onClick={()=>{
                            setParentListId(51);
                            var x:any =<div>
                                <IonCol size="1"><IonIcon icon={documentAttachOutline} className="size-48"></IonIcon></IonCol>
                                <IonCol className="ion-padding">Add Document Types</IonCol>
                            </div>
                            setTypeName(x)
                        }}
                    >
                        <IonCol size="1"><IonIcon icon={documentAttachOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Add Document Types</IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow style={{borderBottom:"1px solid"}} className="size-24 ion-text-bold">
                        <IonCol size="9" className="ion-padding">
                            {getTypeName}
                        </IonCol>
                        <IonCol>
                            <IonRow>
                                <IonCol className="">
                                    <TextToInputSave
                                        placeholder_text="Add New Type"
                                        text=""
                                        result={(e:any)=>{setParentListId}}
                                    />
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {list}
                    </IonRow>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Admin