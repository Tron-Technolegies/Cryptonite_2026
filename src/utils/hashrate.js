export const normalizeHashrate = (value, unit) => {
  switch (unit) {
    case "TH/s":
      return value * 1_000; // → GH/s
    case "GH/s":
      return value;
    case "MH/s":
      return value / 1_000;
    default:
      return value;
  }
};
