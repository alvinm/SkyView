import { IonCol, IonIcon, IonRow } from "@ionic/react";
import { apps, checkmarkCircleOutline, personRemoveOutline, shieldCheckmarkOutline, timeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

const CategoryStats = (props:any) =>{
    const [stats, setStats]         = useState<any>()

    const callCategoryStats = () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_project_category_stats"+
            "&project_id="+props.project_id+
            "&work_flow_category_id="+props.work_flow_category_id, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data=>{
            var list:any = data.map((x:any, i:number)=>{
                return(
                <IonRow key={i}>
                    <IonCol size="2">
                        <div className="ion-text-center text-container ion-padding size-24">
                            <div><IonIcon icon={apps} className="size-32"></IonIcon>&nbsp;Tasks</div>
                            {x.tasks}
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div className="ion-text-center text-container ion-padding size-24">
                            <div><IonIcon icon={checkmarkCircleOutline} className="size-32 text-green"></IonIcon>&nbsp;Complete</div>
                            {x.complete}
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div className="ion-text-center text-container ion-padding size-24">
                            <div><IonIcon icon={checkmarkCircleOutline} className="size-32 text-grey"></IonIcon>&nbsp;Active</div>
                            {x.active}
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div className="ion-text-center text-container ion-padding size-24">
                            <div><IonIcon icon={checkmarkCircleOutline} className="size-32 text-orange"></IonIcon>&nbsp;Approval</div>
                            {x.awaiting_approval}
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div className="ion-text-center text-container ion-padding size-24">
                            <div><IonIcon icon={personRemoveOutline} className="size-32 text-red"></IonIcon>&nbsp;Unassigned</div>
                            {x.awaiting_approval}
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div className="ion-text-center text-container ion-padding size-24">
                            <div><IonIcon icon={timeOutline} className="size-32 text-green"></IonIcon>&nbsp;Budget Hrs</div>
                            {(x.budget_hours/1).toFixed(2)}
                        </div>
                    </IonCol>
                </IonRow>
                )
            })
            setStats(list)
        })
    }
    useEffect(()=>{
        callCategoryStats()
    },[props])
    return(
        <div>
            {stats}
        </div>
    )
}
export default CategoryStats