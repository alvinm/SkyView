import { IonCol, IonIcon, IonRow } from "@ionic/react"
import { calculatorOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import TextToInputSave from "../Objects/Edit/TextToInputSave"

const Rate = (props:any) =>{
    const [list , setList]                              = useState<any>()
    const [levels , setLevels]                              = useState<any>()
    const [getContractorLevelId, setContractorLevelId] = useState<any>(30)
    const callLevel = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?admin=select_list'+
            "&parent_id="+22,
        )
        const data = await response.json();
        const levels:any = data.map((x:any, i:number)=>{
            return(
                <div key={i}>
                    <IonRow className="size-24 ion-padding" onClick={()=>{setContractorLevelId(x.id)}} >
                        <IonCol><div className="text-container ion-padding">{x.list_desc}</div></IonCol>
                    </IonRow>
                </div>
            )
        })
        setLevels(levels)
    }
    const callRates = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?admin=select_level_organization_rates'+
            "&firm_id="+props.state.firm_id+
            "&level_id="+getContractorLevelId,
        )
        const data = await response.json();
        const lists:any = data.map((x:any, i:number)=>{
            return(
                <div key={i}>
                    <IonRow className="size-24">
                        <IonCol>{x.company_type}</IonCol>
                        <IonCol>{x.contractor_level}</IonCol>
                        <IonCol className="ion-text-right">
                            <TextToInputSave 
                                placeholder_text={(x.rate_to_firm/1).toFixed(2)} 
                                text={(x.rate_to_firm/1).toFixed(2)} 
                            />
                        </IonCol>
                        <IonCol className="ion-text-right">
                            <TextToInputSave 
                                placeholder_text={(x.rate_to_client/1).toFixed(2)} 
                                text={(x.rate_to_client).toFixed(2)}
                            
                            />
                        </IonCol>
                    </IonRow>
                </div>
            )
        })
        setList(lists)
    }
    useEffect(()=>{
        callRates()
    },[getContractorLevelId])
    useEffect(()=>{
        callLevel()
        callRates()
    },[props])
    return(
        <div>
             <IonRow>
                <IonCol size="3">
                    <IonRow>
                        <IonCol size="4" className="">
                            <IonIcon icon={calculatorOutline} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol size="8" className="size-24 ion-padding ion-text-bold ion-text-left">
                            Charge Rates
                        </IonCol>
                    </IonRow>
                    <div style={{overflowY:"auto", height:"65vh"}}>
                        {levels}
                    </div>
                    
                </IonCol>
                <IonCol>
                    <IonRow className="ion-text-bold size-24" style={{borderBottom:"1px solid"}}>
                        <IonCol>Compay Type</IonCol>
                        <IonCol>Contractor Level</IonCol>
                        <IonCol className="ion-text-right">Internal Rate</IonCol>
                        <IonCol className="ion-text-right">Client Rate</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div style={{height:"65vh",overflowY:"auto"}}>
                                {list}
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Rate 