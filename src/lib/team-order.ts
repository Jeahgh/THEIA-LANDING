const nameCollator = new Intl.Collator('es', { sensitivity: 'base' });

export function sortTeamMembers<T extends { id: string; name: string; role: string }>(members: readonly T[]): T[] {
  return [...members].sort((first, second) => {
    const coachOrder = Number(second.role === 'Entrenador') - Number(first.role === 'Entrenador');
    return coachOrder
      || nameCollator.compare(first.name.trim(), second.name.trim())
      || nameCollator.compare(first.id, second.id);
  });
}
