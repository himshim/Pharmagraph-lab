export function gauss(x: number, mu: number, sigma: number, amp: number) {
  const exponent = -((x - mu) ** 2) / (2 * sigma * sigma);
  return amp * Math.exp(exponent);
}