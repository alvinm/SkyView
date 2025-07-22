import { IonCol, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { getLocation } from '../components/GlobalFunctions/Functions'
import DistanceSlider from '../components/Objects/Range';

import { arrowBackCircleOutline, toggleOutline } from 'ionicons/icons';
import Login from '../components/Logins/LoginIndex';
import HomeView from '../components/Home/HomeView'

const Home: React.FC = () => {
  const [getUserId, setUserId]            = useState<any>()
  
  const [getHomeView, setHomeView]        = useState<any>()
  const [getLoginView, setLoginView]      = useState<any>()
  const [getAdminView, setAdminView]      = useState<any>()
  const [getCalendarView, setCalendarView]  = useState<any>()


  const [getEmail, setEmail]              = useState<any>()
  const [getUserTypeId, setUserTypeId]    = useState<any>()
  const [getFirmId, setFirmId]            = useState<any>()
  const [getForename, setForename]        = useState<any>()
  const [getSurname, setSurname]          = useState<any>()
  const [getUserImageUrl, setUserImageUrl]    = useState<any>()

  //const [getView, setView]                = useState<any>(0)
  const getUserColor = (userId: string) => {
    const colors = ["#FFB3BA", "#BAE1FF", "#BAFFC9", "#FFD93D"];
    const index = parseInt(userId, 10) % colors.length;
    return colors[index];
  };

  const users = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" }
  ];

  const tasks = [
    {
      id: "task-1",
      userId: "1",
      title: "Prepare report",
      start: "2025-07-01T09:00:00",
      end: "2025-07-01T11:00:00"
    },
    {
      id: "task-2",
      userId: "2",
      title: "Client meeting",
      start: "2025-07-01T10:00:00",
      end: "2025-07-01T12:00:00"
    },
    {
      id: "task-3",
      userId: "3",
      title: "Research",
      start: "2025-07-01T08:00:00",
      end: "2025-07-01T10:00:00"
    }
  ];
  const state:any ={
    //primary_host            : 'https://www.intelrock.com?',
    secondary_host          : 'http://localhost:3000/',
    //secondary_host          : 'https://specifies-broken-cage-permanent.trycloudflare.com/',
    user_id                 : getUserId,
    forename                : getForename,
    surname                 : getSurname,
    email                   : getEmail,
    user_type_id            : getUserTypeId,
    firm_id                 : getFirmId,
    user_image_url          : getUserImageUrl,
  }
  
  
  const setView = (v:any) =>{
    resetView()
    console.log("switch to:"+v)
    switch(v){
      case 0:setLoginView(true); break;
      case 1:setAdminView(true);break;
      case 2:setHomeView(true);break;
      case 3:setCalendarView(true);break;
    }
  }

  const resetView = ()=>{
    setAdminView(false);
    setLoginView(false);
    setHomeView(false);
    setCalendarView(false)
  }


  useEffect(()=>{
    setView(0)
  },[])

  return (
    <div> 
      <IonRow><IonCol>&nbsp;</IonCol></IonRow>
      {getLoginView &&
      <div>
        <Login 
          state={state}
          result={(e:any)=>{
            setEmail(e.email)
            setUserId(e.id)
            setForename(e.forename)
            setSurname(e.surname)
            setUserTypeId(e.contact_type_id)
            setFirmId(e.firm_id)
            setUserImageUrl(e.image_url)
            console.log(e)
            if(e.id/1 > 0){
              setView(2)
              console.log('logged in')
            }else{
              setView(0)
              console.log('not logged in')
            }
          }}
        />
      </div>
      }
      {getHomeView &&
      <div>
        <HomeView
          state={state}
        />
      </div>
      }
      
    </div>  
  )
};

export default Home;
