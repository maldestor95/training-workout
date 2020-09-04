import * as training from '../index'
import { expect } from 'chai';

describe(`Package Training: test session.ts at ${(new Date).toLocaleTimeString()}`, () => {
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
