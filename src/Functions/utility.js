export const typeNumToString = (typeNum) => {
  // get meaning of enum
  switch (typeNum) {
    case 0:
      return "Menu"
    case 1:
      return "Events"
    default:
      return "Content"
  }
}

export const typeStringToNum = (typeString) => {
  // switch back to enum
  switch (typeString) {
    case "Menu":
      return 0
    case "Events":
      return 1
    case "Content":
      return 2
    default:
      return false //something went wrong
  }
}
