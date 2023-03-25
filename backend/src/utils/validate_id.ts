export function getStringAsNumberSafe(id: string) {
  const idAsNumber = parseInt(id);
  if (isNaN(idAsNumber)) {
    throw Error("No number.")
  }
  return idAsNumber;
}
