export function mapping<S extends object, D extends object>(source: S): D {
  return source as unknown as D;
}
