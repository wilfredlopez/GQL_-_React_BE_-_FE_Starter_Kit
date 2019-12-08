export function turnSecondsToMinutes(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + Math.round(s);
}
