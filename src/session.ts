import {Status,StateEnum } from './status'
import { workoutInterface , workoutData, Workout} from './workout'

export interface sessionInterface{
    date:Date,
    description?:string,
    title:string
    status:Status
    workoutList:Array<workoutInterface>
    getSessionDetails:(sessionStatus:StateEnum)=>Array<workoutInterface>
    addWorkout?:(workout:workoutData)=>void
    closeWorkout?:(workoutNumber:number)=>string
    isSessionComplete:()=>boolean
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
    getSessionDetails(sessionStatus:StateEnum=StateEnum.all):Array<workoutInterface>{
        switch (sessionStatus) {
            case StateEnum.open:
                return this.workoutList.filter(wk=>wk.getStatus()==Status.ongoing)
            case StateEnum.closed:
                return this.workoutList.filter(wk=>wk.getStatus()==Status.closed)
            case StateEnum.all:
                return this.workoutList
            default:
                return this.workoutList
        }
    }
    addWorkout(workout:workoutData):void{
        this.workoutList.push(new Workout(workout))
    }
    closeWorkout(workoutNumber:number):string{
        if (workoutNumber<0 || workoutNumber >this.workoutList.length-1 ) return `Err: cannot access workout #${workoutNumber}`
        this.workoutList.map(wk=>{
            if (this.workoutList.indexOf(wk)==workoutNumber){
                wk.closeAllSerie?wk.closeAllSerie():null
            }
        })
        return "OK"
    }
    isSessionComplete():boolean{
        const numberOfOpenWorkout=this.workoutList.filter(wk=>wk.getStatus()==Status.ongoing).length
        return numberOfOpenWorkout>0?false:true
    }

    
}