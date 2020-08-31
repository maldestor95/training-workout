import {Serie,serieInterface} from '../src/serie'
import {Equipment} from './equipment'
import {Status} from './status'




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