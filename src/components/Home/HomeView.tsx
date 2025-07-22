import { IonCol, IonFooter, IonIcon, IonInput, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import ProjectList from "../Project/Project";
import TaskList from "../Task/Task";
import TaskCategoryList from "../Task/TaskType/TaskCategory";
import { formatDateTime, getPastelColor } from "../GlobalFunctions/Functions";
import NotesChat from "../Task/objects/Note/NotesChat";
import '../Task/objects/Note/NotesChat.css'
import { attachOutline, closeOutline, homeSharp, sendOutline } from "ionicons/icons";
import DocumentController from "../DocumentController/DocumentController";
import '../DocumentController/DocumentController.css'
import Timesheet from "../Task/objects/Timesheet/Timesheet";
import '../Task/objects/Timesheet/Timesheet.css'
const HomeView = (props:any) =>{

    /**envvariables */
    const [taskId, setTaskId]                           = useState<any>()
    const [projectId, setProjectId]                     = useState<any>()
    const [processId, setProcessId]                     = useState<any>()
    const [workFlowTemplateId, setWorkFlowTemplateId]   = useState<any>()
    const [pageLocation, setPageLocation]               = useState<any>()
    const [documentParams, setDocumentParams]           = useState<any>()
    const [timesheetParams, setTimesheetParams]         = useState<any>()

    /**array data */
    const [projectData, setProjectData]                 = useState<any>(null)
    const [taskData, settaskData]                       = useState<any>(null)
    const [taskCategorytData, setTaskCategoryData]      = useState<any>(null)
    const [taskNoteData, setTaskNoteData ]              = useState<any>()
    
    /**array objects */
    const [projectObject , setProjectObject]            = useState<any>()
    const [taskObject , setTaskObject]                  = useState<any>()
    const [taskCategoryObject, setTaskCategoryObject]   = useState<any>()

    /**views */
    const [projectView, setProjectView]                 = useState<any>()
    const [taskView, setTaskView]                       = useState<any>()



    const callProject = async () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_project"+
            "&contact_id="+props.state.user_id, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
            setProjectData(data)
            
            console.log(data)
            const object:any = <ProjectList
                state={props.state}
                data = {data}
                location={(e:any)=>{setPageLocation(e)}}
                result={(e:any)=>{
                    setProjectId(null)
                    console.log(e);
                    setWorkFlowTemplateId(e.work_flow_template_id);
                    setProjectId(e.project_id)}}
            />
            setProjectObject(object)
        })
    }
    const callTaskCategory = async () =>{
        var z:any = null
        setTaskCategoryObject(z)
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?admin=select_work_flow_category"+
            "&work_flow_template_id="+workFlowTemplateId+
            "&project_id="+projectId, 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then(response => response.json())
        .then(data =>{
            setTaskCategoryData(data)
            console.log(data)
            const object:any = <TaskCategoryList
                state= {props.state}
                data = {data}
                chat = {(e:any)=>{setTaskNoteData(e.data);setTaskId(e.task_id);setProjectId(e.project_id);console.log(e)}}
                timesheet = {(e:any)=>{setTimesheetParams(e);}}
                location={(e:any)=>{setPageLocation(e)}}
                result={(e:any)=>{console.log(e);setTaskId(e)}}
            />
            setTaskCategoryObject(object)
        })
    }
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };
    const [showDocumentLoader, setShowDocumentController] = useState(false);

    const toggleDocumentController = () => {
        setShowDocumentController(!showDocumentLoader);
    };
    const [showTimesheetLoader, setShowTimesheetLoader] = useState(false);

    const toggleTimesheetLoader = () => {
        setShowTimesheetLoader(!showTimesheetLoader);
    };

    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1:setProjectView(true);callProject();setPageLocation(null);break;
            case 2:setTaskView(true);callTaskCategory();break;
        }
    }
    const resetView =()=>{
        setProjectView(false);
        setTaskView(false);
    }
    useEffect(()=>{
        if(timesheetParams != null){
            setShowTimesheetLoader(true)
        }else{
            setShowTimesheetLoader(false)
        }

    },[timesheetParams])
    useEffect(()=>{
        if(documentParams != null){
            setShowDocumentController(true)
            toggleChat()
        }else{
            setShowDocumentController(false)
            toggleChat()
        }

    },[documentParams])
    useEffect(()=>{
        if(taskNoteData != null)
            toggleChat()
    },[taskNoteData])
    useEffect(()=>{
        setView(2)
    },[projectId])

    useEffect(()=>{
        setView(1)
    },[])
    return(
        <div style={{position:"absolute", left:"10%",width:"80%", height:"90vh",top:"10vh"}}>
            <IonRow className='ion-padding size-24'>
                <IonCol size="1">
                    <IonIcon icon={homeSharp} className="size-48" 
                        onClick={()=>{
                            setView(1)
                        }}
                    ></IonIcon>
                </IonCol>
                <IonCol size="2">
                    <div className=" ion-padding" style={{backgroundColor:getPastelColor(pageLocation),borderRadius:"24px"}}>{pageLocation}</div>
                </IonCol>
            </IonRow>
            {showChat &&
                <div className="chat-container">
                    <NotesChat
                        user_id={props.state.user_id}
                        state={props.state}
                        project_id={projectId}
                        task_id={taskId}
                        data={taskNoteData}
                        close={()=>{toggleChat(); var x:any = null; setShowChat(x)}}
                        add_document={(e:any)=>{setDocumentParams(e)}}
                    />
                </div>
            }
            {showDocumentLoader &&
                <div className="document-container">
                    <DocumentController
                        params={documentParams}
                        state={props.state}
                        close={()=>{toggleDocumentController();setTaskNoteData(formatDateTime(new Date())); var x:any = null; setShowTimesheetLoader(x)}}
                    />
                </div>
            }
            {showTimesheetLoader &&
                <div className="timesheet-container">
                    <Timesheet
                        params={timesheetParams}
                        state={props.state}
                        update_task={(e:any)=>{}}
                        close={()=>{toggleTimesheetLoader(); var x:any = null; setShowTimesheetLoader(x)}}
                    />
                </div>
            }
            {projectView &&
            <IonRow className='ion-padding'>
                <IonCol style={{overflowY:"auto",height:"70vh"}}>
                    {projectObject}
                </IonCol>
            </IonRow>
            }
            {taskView && 
            <IonRow className='ion-padding'>
                <IonCol style={{overflowY:"auto",height:"70vh"}}>
                    {taskCategoryObject}
                </IonCol>
            </IonRow>
            }
            
        </div>
    )
}
export default HomeView