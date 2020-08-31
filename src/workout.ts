import {Equipment} from './equipment'
import {Status} from './status'


export interface serieInterface {
    repetition: number;
    weight ? : number;
    level ? : number;
    durationInMinutes ? : number
}


export class Serie {
    repetition?: number;
    weight ? : number;
    level ? : number;
    durationInMinutes ? : number
    status?:Status=Status.open

    constructor(DataSerie: serieInterface) {
        this.repetition = DataSerie.repetition
        if (DataSerie.weight) this.weight = DataSerie.weight
        if (DataSerie.level) this.level = DataSerie.level
        if (DataSerie.durationInMinutes) this.durationInMinutes = DataSerie.durationInMinutes
    }
    changeWeight(newWeight: number):void {
        
        this.weight = newWeight<=0?undefined:newWeight
    }
    changeLevel(newLevel: number):void {
        this.level = newLevel<=0?undefined:newLevel
    }
    changeDuration(newduration: number):void {
        this.durationInMinutes = newduration<=0?undefined:newduration
    }
    reset():void {
        this.weight=undefined
        this.level=undefined
        this.durationInMinutes=undefined
    }
    stringify():string{
        return JSON.stringify(this)
    }
    changeStatus(newStatus:Status):void{
        this.status=newStatus
    }
}

export interface workoutInterface {
    description?: string
    equipment?:Equipment
    serie?:Array<Serie>
    addSerie?:(newSerie:Serie )=>void

}

export class Workout {
    private description: string 
    private equipment:Equipment
    serie:Array<Serie>
    constructor(workoutDetails: workoutInterface) {
        this.serie=[]
        this.description=""
        
        this.equipment=workoutDetails.equipment?workoutDetails.equipment:Equipment.none
        if(workoutDetails.description) this.description = workoutDetails.description
    }
    addSerie(newSerie:Serie ):void {
        if (newSerie!=undefined) {
            this.serie.push(newSerie)
        }
    }
    updateProgressOnSerie(serieNumber:number, newStatus:Status):string {
        if (serieNumber<0 || serieNumber >this.serie.length-1) return `Error: Can't access serie #${serieNumber}`
        
        const currentSerie:Serie=this.serie[serieNumber]
        
        if (currentSerie.status) currentSerie.changeStatus(newStatus)

        return "OK"
    }
    setDescription(newDescription:string):void{
        this.description=newDescription
    }
    setEquipment(newEquipment:Equipment):void{
        this.equipment=newEquipment
    }
    getStatus():Status{
        const isOngoing:number= this.serie.filter(x=>x.status!=Status.closed).length
        return isOngoing>0?Status.ongoing:Status.closed
    }
    getWorkoutStatus():workoutInterface{
        return     {
            description:this.description,
            equipment:this.equipment,
            serie:this.serie
        }
    }
}