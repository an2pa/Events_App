import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import {v4 as uuid} from 'uuid';
import agent from '../../app/api/agent';
import { response } from 'express';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const [activities, setActivities]= useState<Activity[]>([]);
  const {activityStore}= useStore()
  useEffect(()=>{
    agent.Activities.list().then((response)=>
    setActivities(response)
    )
  }, [])

  const [selectedActivity, setActivity]= useState<Activity | undefined>(undefined);

  const [editMode, setEditMode]= useState(false);

  const [createMode, setCreateMode]= useState(false);
  function handleSelectedActivity(id: string){

    agent.Activities.details(id).then((response)=>
    setActivity(response)
    )
    
  }
  function handleCancleActivity(){
    setActivity(undefined);
  }

  function openForm(id?: string){
    id ? handleSelectedActivity(id) : handleCancleActivity()
    setEditMode(true)
  }
  function openCreateForm(){
    setCreateMode(true)
  }
  function closeForm(){
    setEditMode(false)
    setCreateMode(false)
  }

 function handleEdit(activity: Activity) {
  console.log(activity)
  if(activity.id){
    agent.Activities.edit(activity).then(()=>{
    setActivities([...activities.filter(x => x.id !== activity.id), activity])
    setEditMode(false)
    setActivity(activity)
    }
    )
  }
}
function handleCreate(activity: Activity){
  activity.id=uuid()
  console.log(activity)
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities, activity]);
      setCreateMode(false)
      setActivity(activity)
      }
      )
  }


 /* activity.id
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id:uuid()}]);
  setEditMode(false);
  setActivity(activity);*/

function handleDeleteActivity(id: string){
  agent.Activities.delete(id).then(()=>
  setActivities([...activities.filter(x=>x.id!=id)])
  )
}

  return (
    < >
      
       <NavBar openform={openCreateForm}/>

       <Container style={{marginTop:'7em'}}>
       <h1>{activityStore.title}</h1> 
       <Button content="add exclam" onClick={activityStore.setTitle}/>
       <ActivityDashboard 
       activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectedActivity}
       cancelActivity={handleCancleActivity}
       editMode={editMode}
       createMode={createMode}
       openForm={openForm}
       closeForm={closeForm}
       create={handleCreate}
       edit={handleEdit}
       deleteActivity={handleDeleteActivity}
       />

      </Container>
    </>
  );
}

export default observer(App);
