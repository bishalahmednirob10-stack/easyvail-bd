export function formatMoney(amount) {
  const value = Number.parseFloat(amount || 0);

  if (Number.isNaN(value)) {
    return "Tk 0";
  }

  return `Tk ${value.toFixed(0)}`;
}
