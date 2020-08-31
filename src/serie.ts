import {Status} from './status'

export interface serieData {
    repetition: number;
    weight ? : number;
    level ? : number;
    durationInMinutes ? : number
}
export interface serieInterface extends serieData{
    changeWeight?:(newWeight: number)=>void
    changeLevel?:(newLevel: number)=>void
    changeDuration?:(newduration: number)=>void
    reset?:()=>void
    stringify?:()=>string
    changeStatus?:(newStatus:Status)=>void
}

export class Serie implements serieInterface{
    repetition: number;
    weight ? : number;
    level ? : number;
    durationInMinutes ? : number
    status?:Status=Status.open

    constructor(DataSerie: serieData) {
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