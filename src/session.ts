import {Status } from './status'
import { workoutInterface } from './workout'

export interface sessionInterface{
    date:Date,
    description?:string,
    title:string
    status:Status
    workoutList?:Array<workoutInterface>
}
export class Session implements sessionInterface{
    date:Date=new Date
    description? =""
    title:string
    status:Status=Status.open
    workoutList:Array<workoutInterface>=[]

    constructor(title:string, description?:string){
        this.date=new Date()
        this.description=description?description:""
        this.status=Status.open
        this.title=title
    }
    getSessionDetails():sessionInterface{
        return this
    }
    addWorkout(workout:workoutInterface):void{
        this.workoutList.push(workout)
    }
    
}