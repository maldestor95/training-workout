import * as training from '../index'
import { expect } from 'chai';

describe(`Package Training: test workout.ts at ${(new Date).toLocaleTimeString()}` ,() => {
    const wkData:training.workoutData={
      description:"toot",
      equipment:training.Equipment.legpress,
    }
    const wk=new training.Workout(wkData)
    wk.addSerie(new training.Serie({repetition:15,weight:30}))
    wk.addSerie(new training.Serie({repetition:5,weight:30}))
    wk.addSerie(new training.Serie({repetition:12,weight:35}))
    it('should create a workout',()=>{
      const wk=new training.Workout(wkData)
      expect(wk.getWorkoutStatus().equipment).to.equal(training.Equipment.legpress)
      expect(wk.getWorkoutStatus().description).to.equal(wkData.description)
    })
    it('should create add a serie to the workout',()=>{
      const wk=new training.Workout(wkData)
      wk.addSerie(new training.Serie({repetition:15,weight:30}))
      wk.addSerie(new training.Serie({repetition:12,weight:35}))
      wk.addSerie(new training.Serie({repetition:10,weight:40}))
      expect(wk.getWorkoutStatus().equipment).to.equal(training.Equipment.legpress)
      expect(wk.getWorkoutStatus().description).to.equal(wkData.description)
      expect(wk.serie?.length).to.equal(3)
      // console.log(wk)
    })
    it('should delete a serie',()=>{
      const wk=new training.Workout(wkData)
      wk.addSerie(new training.Serie({repetition:1,weight:30}))
      wk.addSerie(new training.Serie({repetition:2,weight:35}))
      wk.addSerie(new training.Serie({repetition:3,weight:40}))
      wk.addSerie(new training.Serie({repetition:4,weight:40}))
      wk.addSerie(new training.Serie({repetition:5,weight:40}))
      wk.addSerie(new training.Serie({repetition:6,weight:40}))
      wk.deleteSerie(2)
      expect(wk.serie?.length).to.equal(5)
      wk.deleteSerie(-1)
      expect(wk.serie?.length).to.equal(5)
      wk.deleteSerie(10)
      expect(wk.serie?.length).to.equal(5)
      wk.deleteSerie(3)
      expect(wk.serie?.length).to.equal(4)
      expect(wk.serie[3].repetition).to.equal(6)

    })
    it('should update progression on the workout',()=>{
      const wk=new training.Workout(wkData)
      wk.addSerie(new training.Serie({repetition:15,weight:30}))
      wk.addSerie(new training.Serie({repetition:12,weight:35}))
      wk.addSerie(new training.Serie({repetition:10,weight:40}))
      expect(wk.serie[0].status).to.eq(training.Status.open)
      expect(wk.serie[1].status).to.eq(training.Status.open)
      let res=wk.updateProgressOnSerie(0, training.Status.closed)
      expect(wk.serie[0].status).to.eq(training.Status.closed)
      expect(res).to.eq("OK")

      res=wk.updateProgressOnSerie(-1, training.Status.closed)
      expect(res).to.not.eq("OK")
      res=wk.updateProgressOnSerie(3, training.Status.ongoing)
      expect(res).to.not.eq("OK")
    })
    it('should get the workout status',()=>{
      const wk=new training.Workout(wkData)
      wk.addSerie(new training.Serie({repetition:15,weight:30}))
      wk.addSerie(new training.Serie({repetition:5,weight:30}))
      wk.addSerie(new training.Serie({repetition:12,weight:35}))
      
      wk.serie[0].changeStatus(training.Status.ongoing)
      wk.serie[1].changeStatus(training.Status.closed)
      wk.serie[2].changeStatus(training.Status.open)
      expect(wk.getStatus()).to.eq(training.Status.ongoing)
      
      wk.serie[0].changeStatus(training.Status.closed)
      wk.serie[2].changeStatus(training.Status.closed)
      expect(wk.getStatus()).to.eq(training.Status.closed)
    })
    it('should close the workout',()=>{
      expect(wk.getStatus()).to.eq(training.Status.ongoing)
      wk.closeAllSerie()
      expect(wk.getStatus()).to.eq(training.Status.closed)

    })
})
