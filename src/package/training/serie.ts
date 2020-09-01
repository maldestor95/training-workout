import {Status as StatusEnum} from './status'

export interface serieInterface{
    repetition: number;
    weight ? : number;
    level ? : number;
    durationInMinutes ? : number
    changeWeight?:(newWeight: number)=>void
    changeLevel?:(newLevel: number)=>void
    changeDuration?:(newduration: number)=>void
    changeRepetition?:(newRepetition: number)=>void
    reset?:()=>void
    stringify?:()=>string
    changeStatus?:(newStatus:StatusEnum)=>serieInterface
}

export class Serie implements serieInterface{
    repetition: number;
    weight ? : number;
    level ? : number;
    durationInMinutes ? : number
    status?:StatusEnum=StatusEnum.open

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
    changeRepetition(newRepetition: number):void {
        this.repetition = newRepetition<=0?0:newRepetition
    }
    reset():void {
        this.weight=undefined
        this.level=undefined
        this.durationInMinutes=undefined
    }
    stringify():string{
        return JSON.stringify(this)
    }
    changeStatus(newStatus:StatusEnum):serieInterface{
        this.status=newStatus
        return this
    }
}