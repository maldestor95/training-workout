import * as training from '../index'
import { expect } from 'chai';

describe(`Training test run at ${(new Date).toLocaleTimeString()}` ,() => {
  describe('serie', () => {
    it('should be properly initialised', () => {
      const testSerie = new training.Serie({
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
      const testSerie = new training.Serie({repetition: 12,weight:10,level:5});
      testSerie.changeWeight(0)
      expect(testSerie.weight).to.equal(undefined)
    }) 
    it ('should clear optional attributes',()=>{
      const testSerie = new training.Serie({repetition: 12,weight:10,level:5});
      expect(testSerie.weight).to.equal(10)
        testSerie.reset()
        expect(testSerie.weight).to.equal(undefined)
        expect(testSerie.level).to.equal(undefined)
        expect(testSerie.durationInMinutes).to.equal(undefined)
    })
    it('should change status',()=>{
      const testSerie = new training.Serie({repetition: 12,weight:10,level:5});
      expect(testSerie.weight).to.equal(10)
      testSerie.changeStatus(training.Status.ongoing)
      expect(testSerie.status).to.equal(training.Status.ongoing)
      testSerie.changeStatus(training.Status.open)
      expect(testSerie.status).to.equal(training.Status.open)
      testSerie.changeStatus(training.Status.closed)
      expect(testSerie.status).to.equal(training.Status.closed)
    })
  });
  describe('workout',()=>{
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
  describe('session',()=>{
    const trainingSession= new training.Session('Plan1','Description du Plan')
    trainingSession.addWorkout({description:"jambes",equipment:training.Equipment.legpress})
    const wk:training.workoutInterface=trainingSession.workoutList[0]
    wk.addSerie(new training.Serie({repetition:15,weight:30}))
    wk.addSerie(new training.Serie({repetition:12,weight:35}))
    wk.addSerie(new training.Serie({repetition:10,weight:40}))

    it('should create a training session',()=>{
      let trainingSession= new training.Session('Plan1')
      expect(trainingSession.title).to.eq('Plan1')
      expect(trainingSession.description).to.eq('')

      trainingSession= new training.Session('Plan2','Description du Plan2')
      expect(trainingSession.title).to.eq('Plan2')
      expect(trainingSession.description).to.eq('Description du Plan2')
    })
    it('should get training session details',()=>{
      const trainingSession= new training.Session('Plan1','Description du Plan')
      expect(trainingSession.title).to.eq('Plan1')
      
      let workouts=trainingSession.getSessionDetails(training.StateEnum.all)
      expect(workouts.length).to.eq(0)
      
      trainingSession.addWorkout({description:'1st'})
      trainingSession.workoutList[0].addSerie(new training.Serie({repetition:5,durationInMinutes:60}))

      workouts=trainingSession.getSessionDetails(training.StateEnum.all)
      expect(workouts.length).to.eq(1)
      workouts=trainingSession.getSessionDetails(training.StateEnum.open)
      expect(workouts.length).to.eq(1)
      workouts=trainingSession.getSessionDetails(training.StateEnum.closed)
      expect(workouts.length).to.eq(0)
      
      trainingSession.workoutList[0].updateProgressOnSerie?trainingSession.workoutList[0].updateProgressOnSerie(0,training.Status.closed):null
      
      workouts=trainingSession.getSessionDetails(training.StateEnum.all)
      expect(workouts.length).to.eq(1)
      workouts=trainingSession.getSessionDetails(training.StateEnum.open)
      expect(workouts.length).to.eq(0)
      workouts=trainingSession.getSessionDetails(training.StateEnum.closed)
      expect(workouts.length).to.eq(1)


    })
    it('should create a training session',()=>{
      
      trainingSession.addWorkout({description:"cardio",equipment:training.Equipment.treadmill})
      let wk1:training.workoutInterface=trainingSession.workoutList[1]
      wk1.addSerie(new training.Serie({repetition:10,weight:40}))
      wk1.addSerie(new training.Serie({repetition:15,weight:45}))

      trainingSession.addWorkout({description:"cardio2",equipment:training.Equipment.none})
      wk1=trainingSession.workoutList[2]
      wk1.addSerie(new training.Serie({repetition:1,durationInMinutes:15}))
      wk1.addSerie(new training.Serie({repetition:1,durationInMinutes:10}))

      expect(trainingSession.workoutList.length).to.eq(3)
      expect(trainingSession.workoutList[0].getStatus()).to.eq(training.Status.ongoing)

    })
    it('should close a workout within the session',()=>{
      expect(trainingSession.workoutList.length).to.eq(3)
      trainingSession.closeWorkout(-1)
      expect(trainingSession.workoutList.length).to.eq(3)

      trainingSession.closeWorkout(10)
      expect(trainingSession.workoutList.length).to.eq(3)

      expect(trainingSession.workoutList[0].getStatus()).to.eq(training.Status.ongoing)      
      trainingSession.closeWorkout(0) 
      expect(trainingSession.workoutList[0].getStatus()).to.eq(training.Status.closed)  

      expect(trainingSession.workoutList.length).to.eq(3)
    })
    it('should check is session is complete',()=>{
      expect(trainingSession.isSessionComplete()).to.eq(false)
      trainingSession.workoutList.map(wk=>wk.closeAllSerie?wk.closeAllSerie():null)
      expect(trainingSession.isSessionComplete()).to.eq(true)
    })
  })
})
