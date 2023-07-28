export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const camel2title = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
