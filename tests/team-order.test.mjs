import assert from 'node:assert/strict';
import test from 'node:test';
import { sortTeamMembers } from '../src/lib/team-order.ts';

const athlete = (id, name) => ({ id, name, role: 'Atleta' });

test('athletes sort by name regardless of surname, insertion or manual order', () => {
  const members = [
    { ...athlete('3', 'Daniel Valdés'), sortOrder: 0 },
    { ...athlete('1', 'Matías Cáceres'), sortOrder: 99 },
    { ...athlete('2', 'Daniela Guerrero'), sortOrder: 1 },
  ];
  assert.deepEqual(sortTeamMembers(members).map((member) => member.id), ['3', '2', '1']);
  assert.deepEqual(members.map((member) => member.id), ['3', '1', '2']);
  assert.deepEqual(sortTeamMembers([...members].reverse()).map((member) => member.id), ['3', '2', '1']);
});

test('Spanish collation handles accents, multiple given names, whitespace and single names', () => {
  const members = [athlete('5', 'Ros'), athlete('3', '  Miguel Ángel Brito  '), athlete('4', 'Juan   Cáceres'), athlete('2', 'Ana alvarez'), athlete('1', 'Zoe Álvarez')];
  assert.deepEqual(sortTeamMembers(members).map((member) => member.id), ['2', '4', '3', '5', '1']);
});

test('coaches remain first and each group sorts by name', () => {
  const members = [athlete('a', 'Ana Brito'), { id: 'coach', name: 'Miguel Brito', role: 'Entrenador' }, athlete('z', 'Zoe Brito')];
  assert.deepEqual(sortTeamMembers(members).map((member) => member.id), ['coach', 'a', 'z']);
  assert.deepEqual(sortTeamMembers([]), []);
});
