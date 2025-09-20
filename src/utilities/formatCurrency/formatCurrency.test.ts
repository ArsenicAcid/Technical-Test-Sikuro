import { formatCurrency } from "./formatCurrency"

describe("formatCurrency", () => {
  it("formats a positive number correctly", () => {
    const result = formatCurrency(1234.56)
    expect(result).toMatch(/€?\s?\d{1,3}([.,\u202F]\d{3})*([.,]\d{2})?\s?€?/)
  })

  it("formats zero correctly", () => {
    const result = formatCurrency(0)
    expect(result).toMatch(/€?\s?0([.,]00)?\s?€?/)
  })

  it("formats a negative number correctly", () => {
    const result = formatCurrency(-987.65)
    expect(result).toMatch(/-?\s?\d{1,3}([.,\u202F]\d{3})*([.,]\d{2})?\s?€?/)
  })

  it("formats a large number correctly", () => {
    const result = formatCurrency(123456789.99)
    expect(result).toMatch(/€?\s?\d{1,3}([.,\u202F]\d{3})*([.,]\d{2})?\s?€?/)
  })
})
