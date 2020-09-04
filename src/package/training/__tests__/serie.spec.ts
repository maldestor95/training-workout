import * as training from '../index'
import {
  expect
} from 'chai';
describe(`Package Training: test serie.ts at ${(new Date).toLocaleTimeString()}`, () => {
  it('should be properly initialised', () => {
    const testSerie = new training.Serie({
      repetition: 12,
      weight: 10
    });
    expect(testSerie.repetition).to.equal(12);
    expect(testSerie.level).to.equal(undefined);
    testSerie.changeLevel(5)
    testSerie.changeDuration(50)
    testSerie.changeWeight(10)
    testSerie.changeRepetition(10)
    expect(JSON.parse(testSerie.stringify())).to.deep.equal({
      repetition: 10,
      weight: 10,
      level: 5,
      durationInMinutes: 50,
      status: "A FAIRE"
    });
  })
  it('should set parameter to undefined', () => {
    const testSerie = new training.Serie({
      repetition: 12,
      weight: 10,
      level: 5
    });
    testSerie.changeWeight(0)
    expect(testSerie.weight).to.equal(undefined)
  })
  it('should clear optional attributes', () => {
    const testSerie = new training.Serie({
      repetition: 12,
      weight: 10,
      level: 5
    });
    expect(testSerie.weight).to.equal(10)
    testSerie.reset()
    expect(testSerie.weight).to.equal(undefined)
    expect(testSerie.level).to.equal(undefined)
    expect(testSerie.durationInMinutes).to.equal(undefined)
  })
  it('should change status', () => {
    const testSerie = new training.Serie({
      repetition: 12,
      weight: 10,
      level: 5
    });
    expect(testSerie.weight).to.equal(10)
    testSerie.changeStatus(training.Status.ongoing)
    expect(testSerie.status).to.equal(training.Status.ongoing)
    testSerie.changeStatus(training.Status.open)
    expect(testSerie.status).to.equal(training.Status.open)
    testSerie.changeStatus(training.Status.closed)
    expect(testSerie.status).to.equal(training.Status.closed)
  })
});