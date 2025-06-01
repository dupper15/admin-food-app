export function formatID(id) {
  if (!id || typeof id !== "string") return "";
  const start = id.slice(0, 4).toUpperCase();
  const end = id.slice(-4).toUpperCase();
  return `#${start}...${end}`;
}
