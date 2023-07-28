export function getAge(date: Date) {
  const timeDiff = Math.abs(Date.now() - date.getTime());
  const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  return age;
}

export function isAnAdult(birthday: Date, ageToBeAdult = 18) {
  return getAge(birthday) >= ageToBeAdult;
}