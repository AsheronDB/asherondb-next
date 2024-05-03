export function degreesToRadians(degrees: number) {
  return degrees * 0.0174533
}

export function toHexStr(n: number) {
  return ("00000000" + n.toString(16)).substr(-8)
};
