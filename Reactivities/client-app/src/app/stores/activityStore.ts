import agent from "../../app/api/agent";
import { Activity } from "../../app/models/Activity";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"

export default class ActivityStore{
    activities: Activity[] = [];

    constructor(){
        makeAutoObservable(this)
    }
    
    loadActivities=()=>{
        const activities=agent.Activities.list().then((response)=>
        this.activities=response
        )
        
    }
}