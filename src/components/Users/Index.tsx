import { IonCol, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import { add, businessOutline, checkmarkCircleOutline, checkmarkOutline, closeCircleOutline, peopleOutline, person, personAddOutline, saveOutline } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import TextToInputSave from '../Objects/Edit/TextToInputSave'
import ImageController from '../DocumentController/DocumentController'
import TextToDDL from '../Objects/Edit/TextToDDL'
import { getPastelColor } from '../GlobalFunctions/Functions'

const Users = (props:any) =>{
    const[getEmail, setEmail]                       = useState<any>()
    const[getForename, setForename]                 = useState<any>()
    const[getSurname, setSurname]                   = useState<any>()
    const[getRole, setRole]                         = useState<any>("")
    const[getCompanyTypeId, setCompanyTypeId]       = useState<any>(4)

    const[getForenameView, setForenameView]         = useState<any>()
    const[getSurnameView, setSurnameView]           = useState<any>()
    const[getShopNameView, setShopNameView]         = useState<any>()
    const [getCountryOptions, setCountryOptions]    = useState<any>()                      

    const[userList, setUserList]                    = useState<any>()
    const[getContractorLevelData, setContractorLevelData]   = useState<any>()
    const[newUser, showNewUser]                     = useState<any>()

    const callList = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?admin=select_list'+
            "&parent_id="+22,
        )
        const data = await response.json();
         const list:any = data.map((x:any, i:number)=>{
            return(
                <IonSelectOption value={x.id}>
                    {x.list_desc}
                </IonSelectOption>
            )
        })
        setContractorLevelData(list)
    }
    const callUsers = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?dbo=select_users'+
            "&contact_id="+props.state.user_id+
            "&company_type_id="+getCompanyTypeId,
        )
        const data = await response.json();
        
        const list:any = data.map((x:any, i:number)=>{
            return(
                <IonRow className="size-24">
                    <IonCol><div className="text-container ion-padding" style={{backgroundColor:getPastelColor(x.user_name)}}>{x.user_name}</div></IonCol>
                    <IonCol><div className="text-container ion-padding" >{x.email}</div></IonCol>
                    <IonCol><div className="text-container ion-padding" >{x.contractor_level}</div></IonCol>
                    <IonCol className="ion-text-right">{(x.rate_to_firm/1).toFixed(2)}</IonCol>
                    <IonCol className="ion-text-right">{(x.rate_to_client/1).toFixed(2)}</IonCol>
                    <IonCol size="1" className='ion-text-center'>
                        {x.is_active = 1?
                                <IonIcon icon={checkmarkCircleOutline} className='size-48 text-green'></IonIcon>:
                                <IonIcon icon={closeCircleOutline} className='size-48 text-red'></IonIcon>
                        }
                    </IonCol>
                </IonRow>
            )
        })
        setUserList(list)
    }
   
    useEffect(()=>{
        callUsers()
    },[getCompanyTypeId])
    useEffect(()=>{
        callUsers()
        callList()
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol size="1" className="">
                    <IonIcon icon={peopleOutline} className="size-48"></IonIcon>
                </IonCol>
                <IonCol size="2" className="size-24 ion-padding ion-text-bold ion-text-left">
                    Users
                </IonCol>
                {!newUser &&<IonCol></IonCol>}
                {!newUser &&
                <IonCol>
                    <IonRow>
                        <IonCol  className="size-16 ion-padding ion-text-bold" onClick={()=>{setCompanyTypeId(35)}}>
                            <div className="ion-padding text-container ion-text-center">Startup</div>
                        </IonCol>
                        <IonCol  className="size-16 ion-padding ion-text-bold" onClick={()=>{setCompanyTypeId(36)}}>
                            <div className="ion-padding text-container ion-text-center">Micro</div>
                        </IonCol>
                        <IonCol  className="size-16 ion-padding ion-text-bold" onClick={()=>{setCompanyTypeId(4)}}>
                            <div className="ion-padding text-container ion-text-center">Small</div>
                        </IonCol>
                        <IonCol  className="size-16 ion-padding ion-text-bold" onClick={()=>{setCompanyTypeId(34)}}>
                            <div className="ion-padding text-container ion-text-center">Medium</div>
                        </IonCol>
                        <IonCol  className="size-16 ion-padding ion-text-bold" onClick={()=>{setCompanyTypeId(33)}}>
                            <div className="ion-padding text-container ion-text-center">Large</div>
                        </IonCol>
                    </IonRow>
                </IonCol>
                }

                {newUser &&
                    <IonCol className='ion-text-left size-24 ion-text-bold' style={{borderBottom:"1px solid #000"}}>
                        <IonIcon icon={personAddOutline} className="size-48"></IonIcon>
                        &nbsp;Add New Consultant
                    </IonCol>
                }
            </IonRow>
            <IonRow>
                <IonCol size="3">
                    <IonRow className='ion-padding text-container size-24 ion-text-bold' onClick={()=>{showNewUser(!newUser)}}>
                        <IonCol size="1"><IonIcon icon={personAddOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Add New Consultant</IonCol>
                    </IonRow>
                    <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={peopleOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Existing Consultant</IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    {!newUser &&
                    <IonRow className="size-24 ion-text-bold ion-padding" style={{backgroundColor:"lightblue",color:"darkblue", borderRadius:"20px"}}>
                        <IonCol>Contractor<br/>&nbsp;<br/>&nbsp;</IonCol>
                        <IonCol>Email</IonCol>
                        <IonCol>Role</IonCol>
                        <IonCol className="ion-text-right ion-padding">Firm Rate</IonCol>
                        <IonCol className="ion-text-right ion-padding">Client Rate</IonCol>
                        <IonCol size="1" className='ion-text-center ion-padding'>Status</IonCol>
                    </IonRow>
                    }
                    {newUser &&
                    <div>
                        <IonRow><IonCol></IonCol></IonRow>
                        <IonRow className="size-24">
                            <IonCol size="2">
                                <TextToInputSave 
                                    placeholder_text={"Forename"}
                                    text={""}
                                    result={(e:any)=>{setForename(e)}}
                                />
                            </IonCol>
                            <IonCol size="2">
                                <TextToInputSave 
                                    placeholder_text={"Surname"}
                                    text={""}
                                    result={(e:any)=>{setSurname(e)}}
                                />
                            </IonCol>
                            <IonCol size="2">
                                <TextToInputSave 
                                    placeholder_text={"Email"}
                                    text={""}
                                    result={(e:any)=>{setEmail(e)}}
                                />
                            </IonCol>
                            <IonCol size="2">
                                <TextToDDL
                                    placeholder_text={"Contractor Level"}
                                    options={getContractorLevelData}
                                    text={getRole}
                                    result={(e:any)=>{setRole(e.text)}}
                                />
                            </IonCol>
                            <IonCol></IonCol>
                            <IonCol size="1" className="ion-padding">
                                <div className='text-container ion-text-center ion-padding'>
                                    <IonIcon icon={add} className='size-48'></IonIcon>
                                </div>
                            </IonCol>
                        </IonRow>
                    </div>
                    }
                    {!newUser &&
                        <div>
                            {userList}
                        </div>
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Users