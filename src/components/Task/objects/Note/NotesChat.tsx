// NotesChat.tsx
import React, { useEffect, useRef, useState } from 'react';
import { IonCol, IonContent, IonIcon, IonInput, IonPage, IonRow } from '@ionic/react';
import './NotesChat.css'; // We’ll define styles here
import { render } from '@testing-library/react';
import { formatDate, formatDateTime, getIconForMimeType, getPastelColor } from '../../../GlobalFunctions/Functions';
import { attachOutline, closeOutline, sendOutline } from 'ionicons/icons';

const NotesChat = (props:any) => {
    const [notes, setNotes]     = useState<any>()
    const txtNote:any           = useRef()
    const callTaskDocument = async (id:any) =>{
    let Controller = new AbortController();
        
    try {
        const response = await fetch(
        `${props.state.secondary_host}getDocument?dbo=select_document&id=${id}`,
        { signal: Controller.signal }
        );

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the file as a blob
        const blob = await response.blob();

        // Create an object URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary <a> element
        const a = document.createElement('a');
        a.href = url;

       // Optional: get filename from response headers, fallback to default
       const contentDisposition = response.headers.get('content-disposition');
       console.log(response.headers)
       let filename = `document_${id}`;
       if (contentDisposition) {
           const match = contentDisposition.match(/filename="?(.+)"?/);
           if (match?.[1]) {
               filename = match[1];
           }
       }
       filename = filename.replaceAll('"','')
       console.log(filename)
//
        //// Add file extension if needed (PDF as an example)
        //if (!filename.includes('.')) {
        //    filename += '.pdf'; 
        //}
//
            a.download = filename;

            // Append, trigger click, and clean up
            document.body.appendChild(a);
            a.click();
            a.remove();

            // Revoke the object URL
            window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Download failed:', error);
    }
}

    const callTaskNote = () =>{
        var n:any = null
        setNotes(n)
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_note"+
            "&contact_id="+props.state.user_id+
            "&project_id="+props.project_id+
            "&task_id="+props.task_id, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
           var noteList = data.map((x:any, i:number) => {
                console.log("chat alignment=> "+props.user_id+":"+x.created_by)
                return (
                    <IonRow key={i} >
                        <IonCol
                            size="12"
                            
                        >
                            <IonRow >
                                <IonCol 
                                    size={props.user_id == x.created_by ? "12" :"12"} 
                                    className={props.user_id == x.created_by ? 'ion-text-right' : 'ion-text-left'}
                                >
                                    <div className={props.user_id == x.created_by ? "ion-padding chat-bubble sent":"ion-padding chat-bubble received"}>
                                        <div style={{textAlign:"left",color:getPastelColor(props.user_id === x.created_by ? "You":x.name)}} className="">{props.user_id === x.created_by ? 'You' : x.name}</div>
                                        <div style={{textAlign: 'left'}} className="">{
                                            x.is_note==1?
                                                x.note:
                                                <div 
                                                    className="ion-text-hover-blue"
                                                    onClick={()=>{callTaskDocument(x.version)}}
                                                >
                                                    <IonIcon icon={getIconForMimeType(x.mime_type)} className='size-36'></IonIcon> 
                                                    &nbsp; {x.note}
                                                </div>
                                        }
                                        </div>
                                        <div style={{textAlign:"right",color:"#777",fontSize:"0.8em"}} className="">{formatDateTime(x.created_date)}</div>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                );
            })
            setNotes(noteList)
        })
    }
    const insertNote = (project_id:any, task_id:any) =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=insert_note"+
            "&project_id="+project_id+
            "&task_id="+task_id+
            "&created_by="+props.user_id+
            "&note="+txtNote.current.value, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
            txtNote.current.value = ""
            callTaskNote()
        })
    }
   
    useEffect(()=>{
        console.log(props)
        callTaskNote()
    },[props])
    return(
        <div style={{width:"100%"}}>
            <IonRow className="chat-header">
                <IonCol></IonCol>
                <IonCol size="1">
                    <IonIcon icon={closeOutline} className="size-48" onClick={(e:any)=>{props.close()}}></IonIcon>
                </IonCol>
            </IonRow>
            {notes}
            <IonRow className="chat-footer size-24 ion-padding">
                <IonCol size="1" className="ion-text-center ion-padding" onClick={(e:any)=>{
                    var z:any = [];
                    z.push({
                        project_id:props.project_id,
                        process_id:0,
                        task_id:props.task_id, 
                        user_id:props.state.user_id
                    })
                    props.add_document(z[0])}}>
                    <IonIcon icon={attachOutline} className="size-48"></IonIcon>
                </IonCol>
                <IonCol className=' ion-padding'>
                    <IonInput ref={txtNote} type="text" placeholder="Type a message" />
                </IonCol>
                <IonCol size="1" className="ion-text-center ion-padding ion-text-hover" onClick={()=>{insertNote(props.project_id,props.task_id)}}>
                    <IonIcon icon={sendOutline} className="size-42" ></IonIcon>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default NotesChat;
