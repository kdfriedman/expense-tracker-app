const capitalizeAllStrings = (string) => {
  const hasSpaces = /\s/g.test(string);
  if (!hasSpaces) {
    return string[0].toUpperCase() + string.slice(1);
  }
  const listOfJoinedStrings = string.split(" ");
  const capitalizedString = listOfJoinedStrings
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(" ");
  return capitalizedString;
};

export default capitalizeAllStrings;
