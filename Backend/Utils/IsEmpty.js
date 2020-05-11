exports.isEmpty = (Data) =>
  typeof Data === undefined ||
  typeof Data === null ||
  (typeof Data === "string" && Data.trim().length === 0) ||
  (typeof Data === "object" && Object.keys(Data).length === 0);
