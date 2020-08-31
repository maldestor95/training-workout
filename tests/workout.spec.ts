import {  Workout, workoutInterface} from '../src/workout';
import {  Serie } from '../src/serie';
import {  Session} from '../src/session'

import { Equipment } from '../src/equipment';
import { Status } from '../src/status';

import {
  expect
} from 'chai';

describe(`Training test run at ${(new Date).toLocaleTimeString()}` ,() => {
  describe('serie', () => {
    it('should be properly initialised', () => {
      const testSerie = new Serie({
        repetition: 12,weight:10
      });
      expect(testSerie.repetition).to.equal(12);
      expect(testSerie.level).to.equal(undefined);
      testSerie.changeLevel(5)
      testSerie.changeDuration(50)
      testSerie.changeWeight(10)
      testSerie.changeRepetition(10)
      expect(JSON.parse(testSerie.stringify())).to.deep.equal({ repetition: 10, weight: 10, level: 5,durationInMinutes:50 ,status:"A FAIRE"});
    })
    it('should set parameter to undefined',()=>{
      const testSerie = new Serie({repetition: 12,weight:10,level:5});
      testSerie.changeWeight(0)
      expect(testSerie.weight).to.equal(undefined)
    }) 
    it ('should clear optional attributes',()=>{
      const testSerie = new Serie({repetition: 12,weight:10,level:5});
      expect(testSerie.weight).to.equal(10)
        testSerie.reset()
        expect(testSerie.weight).to.equal(undefined)
        expect(testSerie.level).to.equal(undefined)
        expect(testSerie.durationInMinutes).to.equal(undefined)
    })
    it('should change status',()=>{
      const testSerie = new Serie({repetition: 12,weight:10,level:5});
      expect(testSerie.weight).to.equal(10)
      testSerie.changeStatus(Status.ongoing)
      expect(testSerie.status).to.equal(Status.ongoing)
      testSerie.changeStatus(Status.open)
      expect(testSerie.status).to.equal(Status.open)
      testSerie.changeStatus(Status.closed)
      expect(testSerie.status).to.equal(Status.closed)
    })
  });
  describe('workout',()=>{
    const wkData:workoutInterface={
      description:"toot",
      equipment:Equipment.legpress,
    }
    it('should create a workout',()=>{
      const wk=new Workout(wkData)
      expect(wk.getWorkoutStatus().equipment).to.equal(Equipment.legpress)
      expect(wk.getWorkoutStatus().description).to.equal(wkData.description)
    })
    it('should create add a serie to the workout',()=>{
      const wk=new Workout(wkData)
      wk.addSerie(new Serie({repetition:15,weight:30}))
      wk.addSerie(new Serie({repetition:12,weight:35}))
      wk.addSerie(new Serie({repetition:10,weight:40}))
      expect(wk.getWorkoutStatus().equipment).to.equal(Equipment.legpress)
      expect(wk.getWorkoutStatus().description).to.equal(wkData.description)
      expect(wk.serie?.length).to.equal(3)
      // console.log(wk)
    })
    it('should delete a serie',()=>{
      const wk=new Workout(wkData)
      wk.addSerie(new Serie({repetition:1,weight:30}))
      wk.addSerie(new Serie({repetition:2,weight:35}))
      wk.addSerie(new Serie({repetition:3,weight:40}))
      wk.addSerie(new Serie({repetition:4,weight:40}))
      wk.addSerie(new Serie({repetition:5,weight:40}))
      wk.addSerie(new Serie({repetition:6,weight:40}))
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
      const wk=new Workout(wkData)
      wk.addSerie(new Serie({repetition:15,weight:30}))
      wk.addSerie(new Serie({repetition:12,weight:35}))
      wk.addSerie(new Serie({repetition:10,weight:40}))
      expect(wk.serie[0].status).to.eq(Status.open)
      expect(wk.serie[1].status).to.eq(Status.open)
      let res=wk.updateProgressOnSerie(0, Status.closed)
      expect(wk.serie[0].status).to.eq(Status.closed)
      expect(res).to.eq("OK")

      res=wk.updateProgressOnSerie(-1, Status.closed)
      expect(res).to.not.eq("OK")
      res=wk.updateProgressOnSerie(3, Status.ongoing)
      expect(res).to.not.eq("OK")
    })
    it('should get the workout status',()=>{
      const wk=new Workout(wkData)
      wk.addSerie(new Serie({repetition:15,weight:30}))
      wk.addSerie(new Serie({repetition:5,weight:30}))
      wk.addSerie(new Serie({repetition:12,weight:35}))
      
      wk.serie[0].changeStatus(Status.ongoing)
      wk.serie[1].changeStatus(Status.closed)
      wk.serie[2].changeStatus(Status.open)
      expect(wk.getStatus()).to.eq(Status.ongoing)
      
      wk.serie[0].changeStatus(Status.closed)
      wk.serie[2].changeStatus(Status.closed)
      expect(wk.getStatus()).to.eq(Status.closed)
    })
  })
    /*describe('session',()=>{
      it('should create a training session',()=>{
        let trainingSession= new Session('Plan1')
        expect(trainingSession.title).to.eq('Plan1')
        expect(trainingSession.description).to.eq('')

        trainingSession= new Session('Plan2','Description du Plan2')
        expect(trainingSession.title).to.eq('Plan2')
        expect(trainingSession.description).to.eq('Description du Plan2')
      })
      it('should get training session details',()=>{
        const trainingSession= new Session('Plan1','Description du Plan')
        expect(trainingSession.title).to.eq('Plan1')
        
        const Alldetails=trainingSession.getSessionDetails()
        const {date:detailDate,...details}=Alldetails
        expect(typeof detailDate).to.eq(typeof new Date)
        expect(details).to.deep.eq({
          description:'Description du Plan',
          status:Status.open,
          title:'Plan1',
          workoutList:[]
        })
      })
      
    })
    it.only('should create a training session',()=>{
      const trainingSession= new Session('Plan1','Description du Plan')
      trainingSession.addWorkout({description:"jambes",equipment:Equipment.legpress})
      let wk:workoutInterface=trainingSession.workoutList[0]
      const ser:serieInterface={repetition:10,weight:5}
      wk.addSerie(ser)

      trainingSession.addWorkout({description:"cardio",equipment:Equipment.treadmill})
      console.log(trainingSession.getSessionDetails())
    })
    // it('should create a training session',()=>{})
  }*/
})
