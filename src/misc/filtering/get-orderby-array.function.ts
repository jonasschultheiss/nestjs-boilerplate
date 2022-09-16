export function getOrderByArrayFromType<Type>(object: Type): string[] {
  const propertiesList: string[] = [];
  for (const property in object) {
    propertiesList.push(property);
  }

  const propertiesWithDash = propertiesList.map(property => `-${property}`);
  return propertiesList.concat(propertiesWithDash);
}
