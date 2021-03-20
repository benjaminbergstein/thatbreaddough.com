const toHumanName = (fieldName: string) => fieldName
  .replace(/([A-Z])/g, ' $1')
  .replace(/^[a-z]/g, (letter) => letter.toUpperCase());

export { toHumanName };
