import { IonCol, IonFooter, IonIcon, IonImg, IonInput, IonLabel, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import ProjectList from "../Project/Project";
import TaskList from "../Task/Task";
import TaskCategoryList from "../Task/TaskType/TaskCategory";
import { formatDateTime, getPastelColor } from "../GlobalFunctions/Functions";
import NotesChat from "../Task/objects/Note/NotesChat";
import '../Task/objects/Note/NotesChat.css'
import { attachOutline, brushOutline, businessOutline, calculatorOutline, clipboardOutline, closeOutline, hammerOutline, homeSharp, lockClosed, peopleOutline, sendOutline } from "ionicons/icons";
import DocumentController from "../DocumentController/DocumentController";
import '../DocumentController/DocumentController.css'
import Timesheet from "../Task/objects/Timesheet/Timesheet";
import '../Task/objects/Timesheet/Timesheet.css'
import MyTasks from "../MyTasks/Index";
import Users from "../Users/Index";
import Rate from "../Rates/Index";
import Admin from "../Admin/Index";
const HomeView = (props:any) =>{

    /**envvariables */
    const [taskId, setTaskId]                           = useState<any>(0)
    const [projectId, setProjectId]                     = useState<any>(0)
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
    const [getMyTasks, setMyTasks]                      = useState<any>()
    const [getUsers, setUsers]                          = useState<any>()
    const [getRates, setRates]                          = useState<any>()
    const [getAdmin, setAdmin]                          = useState<any>()


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
            case 3:setMyTasks(true);break;
            case 4:setUsers(true);break;
            case 5:setRates(true);break;
            case 6:setAdmin(true);break;
        }
    }
    const resetView =()=>{
        setProjectView(false);
        setTaskView(false);
        setMyTasks(false);
        setUsers(false);
        setRates(false);
        setAdmin(false);
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
        setView(3)
    },[])
    return(
        <div style={{position:"absolute", left:"5%",width:"90%", height:"90vh",top:"2.5vh"}}>
            <IonRow className="ion-padding" style={{borderBottom:"4px solid lightblue", marginBottom:"1vh"}}>
                <IonCol>
                    <IonImg src="../../public/images/skyview.png" style={{width:"120px"}}></IonImg>
                </IonCol>
                <IonCol size="2" className="ion-text-right ion-padding size-22">
                    <IonRow className="text-container">
                        <IonCol size="1">
                            <IonIcon icon={lockClosed} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol className="ion-padding ion-text-center">
                            <IonLabel>{props.state.email}</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="2">
                    <IonRow 
                        style={{ backgroundColor: "#DEF1FF" }}
                        className='ion-padding size-24 text-container-borderless ion-text-bold'
                        onClick={()=>{
                            setView(1)
                        }}
                    >
                        <IonCol size="1">
                            <IonIcon icon={businessOutline} className="size-48" style={{color:"#005BD3"}}></IonIcon>
                        </IonCol>
                        <IonCol size="11" className="ion-padding"  style={{color:"#005BD3"}}>
                            &nbsp;Projects
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="2">
                    <IonRow className='ion-padding size-24 text-container ion-text-bold'
                        onClick={()=>{
                            setView(3)
                        }}
                    >
                        <IonCol size="1">
                            <IonIcon icon={clipboardOutline} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol size="11" className="ion-padding">
                            &nbsp;My Tasks
                        </IonCol>
                    </IonRow>
                </IonCol>
                
                <IonCol size="2">
                    <IonRow className='ion-padding size-24 text-container ion-text-bold'
                        onClick={()=>{
                            setView(4)
                        }}
                    >
                        <IonCol size="1">
                            <IonIcon icon={peopleOutline} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol size="11" className="ion-padding">
                            &nbsp;System Users
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="2">
                    <IonRow className='ion-padding size-24 text-container ion-text-bold'
                        onClick={()=>{
                            setView(5)
                        }}
                    >
                        <IonCol size="1">
                            <IonIcon icon={calculatorOutline} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol size="11" className="ion-padding">
                            &nbsp;Charge Rates
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="2">
                    <IonRow className='ion-padding size-24 text-container ion-text-bold'
                        onClick={()=>{
                            setView(6)
                        }}
                    >
                        <IonCol size="1">
                            <IonIcon icon={hammerOutline} className="size-48"></IonIcon>
                        </IonCol>
                        <IonCol size="11" className="ion-padding">
                            &nbsp;Admin
                        </IonCol>
                    </IonRow>
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
            <IonRow>
                <IonCol size="3">
                    <IonRow className='ion-padding size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={businessOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Project Home</IonCol>
                    </IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={brushOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Create New Project</IonCol>
                    </IonRow>
                    <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={businessOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Existing Project</IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow className='ion-padding'>
                        <IonCol style={{overflowY:"auto",height:"70vh"}}>
                            {projectObject}
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            }
            {taskView && 
            <IonRow className='ion-padding'>
                <IonCol size="3">
                    <IonRow className='ion-padding size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={businessOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Project Home</IonCol>
                    </IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={brushOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Create New Project</IonCol>
                    </IonRow>
                    <IonRow><IonCol></IonCol></IonRow>
                    <IonRow className='ion-padding text-container size-24 ion-text-bold'>
                        <IonCol size="1"><IonIcon icon={businessOutline} className="size-48"></IonIcon></IonCol>
                        <IonCol className="ion-padding">Existing Project</IonCol>
                    </IonRow>
                </IonCol>
                <IonCol style={{overflowY:"auto",height:"70vh"}}>
                    {taskCategoryObject}
                </IonCol>
            </IonRow>
            }
            {getMyTasks &&
            <div>
                <MyTasks
                    state={props.state}
                    chat = {(e:any)=>{setTaskNoteData(e.data);setTaskId(e.task_id);setProjectId(e.project_id);console.log(e)}}
                    timesheet = {(e:any)=>{setTimesheetParams(e);}}
                    location={(e:any)=>{setPageLocation(e)}}
                    result={(e:any)=>{console.log(e);setTaskId(e)}}
                />
            </div>
            }
            {getUsers &&
            <div>
                <Users
                    state={props.state}
                />
            </div>
            }
            {getRates &&
            <div>
                <Rate
                    state={props.state}
                />
            </div>
            }
            {getAdmin &&
            <div>
                <Admin
                    state={props.state}
                />
            </div>
            }
        </div>
    )
}
export default HomeView