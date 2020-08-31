import {Serie, serieData} from '../src/serie'
import {Equipment} from './equipment'
import {Status} from './status'

export interface workoutInterface {
    description?: string
    equipment?:Equipment
    serie?:Array<Serie>
    addSerie?:(newSerie:Serie )=>void
    deleteSerie?:(serieNumber:number)=>string
    updateProgressOnSerie?:(serieNumber:number, newStatus:Status)=>string 

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
    deleteSerie(serieNumber:number):string{
        if (serieNumber<0 || serieNumber >this.serie.length-1) return `Error: Can't access serie #${serieNumber}`
        // console.log('before', serieNumber,this.serie)
        this.serie=[...this.serie.slice(0,serieNumber),...this.serie.slice(serieNumber+1,this.serie.length)]
        // console.log('after',this.serie)
        return "OK"
    }
    updateProgressOnSerie(serieNumber:number, newStatus:Status):string {
        if (serieNumber<0 || serieNumber >this.serie.length-1) return `Error: Can't access serie #${serieNumber}`
        
        const currentSerie:Serie=this.serie[serieNumber]
        
        if (currentSerie.status) currentSerie.changeStatus(newStatus)

        return "OK"
    }
    changeSerie(serieNumber:number, serieParameter:serieData):string {
        if (serieNumber<0 || serieNumber >this.serie.length-1) return `Error: Can't access serie #${serieNumber}`

        if (serieParameter.durationInMinutes) this.serie[serieNumber].changeDuration(serieParameter.durationInMinutes)
        if (serieParameter.level)   this.serie[serieNumber].changeLevel(serieParameter.level)
        if (serieParameter.weight)  this.serie[serieNumber].changeWeight(serieParameter.weight)
        if (serieParameter.repetition)  this.serie[serieNumber].changeRepetition(serieParameter.repetition)
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