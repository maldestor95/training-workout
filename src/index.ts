import {Serie, Workout} from './workout'
import {Equipment} from './equipment'

const ser= new Serie({repetition:12,level:2,weight:100})
ser.repetition=10
console.log(ser)

console.log(Object.values(Equipment))
const wk=new Workout({description:"toto",repetition:10,equipment:Equipment.legpress })
wk.changeDuration(10)
console.log(wk)
