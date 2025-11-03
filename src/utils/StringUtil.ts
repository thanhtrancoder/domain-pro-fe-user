export function removeAccents(str: string): string {
  // NFD separates base characters and diacritics; regex removes combining marks
  const normalized = str.normalize("NFD");
  const without = normalized.replace(/[\u0300-\u036f]/g, "");
  // handle Vietnamese-specific đ/Đ if needed
  return without.replace(/đ/g, "d").replace(/Đ/g, "D");
}

export function keepLettersNumbersHyphen(input: string): string {
  if (input == null) {
    return input;
  }
  return input.replace(/[^a-zA-Z0-9\-.]/g, "");
}


export function transformString(input: string): string {
  if (!input) return input;

  const noAccent = removeAccents(input);

  const parts = noAccent.split(".");

  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    const penult = parts[parts.length - 2];
    return penult + "." + last;
  } else {
    return noAccent;
  }
}