import assert from 'node:assert/strict';
import test from 'node:test';
import { getRaceSchedule, getCompactRaceName, getRaceDaysRemaining, getRaceStatus } from '../src/lib/race-schedule.ts';

const race = (id, date, status = 'registration_open') => ({
  id, date, status, name: 'Coquimbo', location: 'Coquimbo, Chile', type: 'triatlon',
  distance: '5150', registrationUrl: 'https://example.com/inscripcion',
});

test('past races finish after midnight in Chile and no longer occupy the next three places', () => {
  const races = [race('last', '2026-11-05'), race('fourth', '2027-02-01'), race('second', '2026-12-06'), race('first', '2026-11-22'), race('third', '2027-01-01')];
  assert.equal(getRaceSchedule(races, new Date('2026-11-06T02:59:00Z')).upcoming[0].id, 'last');
  const after = getRaceSchedule(races, new Date('2026-11-06T03:00:00Z'));
  assert.deepEqual(after.upcoming.slice(0, 3).map(({ id }) => id), ['first', 'second', 'third']);
  assert.equal(after.all[0].status, 'finished');
  assert.equal(after.all[0].registrationUrl, races[0].registrationUrl);
  assert.equal(races[0].status, 'registration_open');
});

test('dates determine state even when a legacy manual state disagrees', () => {
  const now = new Date('2026-10-08T12:00:00Z');
  const schedule = getRaceSchedule([race('future', '2027-01-01', 'finished'), race('past', '2026-10-07', 'upcoming')], now);
  assert.deepEqual(schedule.upcoming.map((item) => item.id), ['future']);
  assert.equal(schedule.all[0].status, 'finished');
  assert.equal(schedule.all[1].status, 'upcoming');
  assert.equal(getRaceStatus('2026-10-08', '2026-10-08'), 'upcoming');
  assert.equal(getRaceStatus('2026-10-08', '2026-10-09'), 'finished');
});

test('rescheduling a completed competition to the future makes it upcoming again', () => {
  const moved = { ...race('moved', '2026-10-01', 'finished'), date: '2026-11-29' };
  assert.equal(getRaceSchedule([moved], new Date('2026-10-21T12:00:00Z')).upcoming[0].id, 'moved');
});

test('compact titles include distance without duplicating it when already named', () => {
  assert.equal(getCompactRaceName({ name: 'Coquimbo', distance: '5150' }), 'Coquimbo 5150');
  assert.equal(getCompactRaceName({ name: 'Valdivia 70.3', distance: '70.3' }), 'Valdivia 70.3');
  assert.equal(getCompactRaceName({ name: 'Valdivia', distance: 'Full' }), 'Valdivia Full');
  assert.equal(getCompactRaceName({ name: 'Santiago 10K / 21K', distance: '10K/21K' }), 'Santiago 10K / 21K');
  assert.equal(getCompactRaceName({ name: 'Coquimbo' }), 'Coquimbo');
});

test('countdown uses calendar days across Chile daylight saving and year boundaries', () => {
  assert.equal(getRaceDaysRemaining('2026-10-17', '2026-10-08'), 9);
  assert.equal(getRaceDaysRemaining('2026-11-29', '2026-10-08'), 52);
  assert.equal(getRaceDaysRemaining('2026-09-06', '2026-09-05'), 1);
  assert.equal(getRaceDaysRemaining('2027-01-01', '2026-12-31'), 1);
  assert.equal(getRaceDaysRemaining('2028-03-01', '2028-02-28'), 2);
  assert.equal(getRaceDaysRemaining('2026-10-08', '2026-10-08'), 0);
  assert.equal(getRaceDaysRemaining('2026-10-04', '2026-10-08'), -4);
});
