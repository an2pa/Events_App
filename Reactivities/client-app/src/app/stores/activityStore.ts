import agent from "../../app/api/agent";
import { Activity } from "../../app/models/Activity";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"

export default class ActivityStore{
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false

    constructor(){
        makeAutoObservable(this)
    }
    
    loadActivities=()=>{
        const activities=agent.Activities.list().then((response)=>
        this.activities=response
        )
        
    }

    handleSelectedActivity=(id:string)=>{
        this.selectedActivity= this.activities.find(a=> a.id===id)
    }
    handleCancelActivity=()=>{
        this.selectedActivity= undefined;
    }
    openForm=(id?: string)=>{
            id ? this.handleSelectedActivity(id) : this.handleCancelActivity()
            this.editMode==true
          }
    closeForm=()=>{
        this.editMode==false
    }

    }
