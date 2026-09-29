/** Accent-insensitive search key: strips Vietnamese diacritics, đ → d, lower-case. */
export const fold = (x: string) =>
  x
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()

export const pad2 = (n: number) => String(n).padStart(2, '0')
