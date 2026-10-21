export type AdminSearchParams = Record<string, string | string[] | undefined>;
export type AdminFilterField = {
  name: string;
  label: string;
  allLabel: string;
  options: { value: string; label: string }[];
};

export const visibilityFilter: AdminFilterField = {
  name: 'visibility', label: 'Visibilidad', allLabel: 'Todos',
  options: [{ value: 'visible', label: 'Visibles' }, { value: 'hidden', label: 'Ocultos' }],
};

const scalar = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? '';
export const normalizeAdminText = (value: string) => value.trim().normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('es').replace(/\s+/g, ' ');

export function readAdminFilters(params: AdminSearchParams | undefined, fields: AdminFilterField[]) {
  const query = scalar(params?.q).trim();
  const values = Object.fromEntries(fields.map((field) => {
    const value = scalar(params?.[field.name]);
    return [field.name, field.options.some((option) => option.value === value) ? value : ''];
  }));
  return { query, values };
}

export function filterAdminItems<T>(
  items: T[], filters: ReturnType<typeof readAdminFilters>,
  describe: (item: T) => { text: string; values: Record<string, string> },
) {
  const words = normalizeAdminText(filters.query).split(' ').filter(Boolean);
  return items.filter((item) => {
    const { text, values } = describe(item);
    const normalized = normalizeAdminText(text);
    return words.every((word) => normalized.includes(word)) &&
      Object.entries(filters.values).every(([name, value]) => !value || values[name] === value);
  });
}
