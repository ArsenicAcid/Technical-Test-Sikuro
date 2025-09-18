import { describe, it, expect } from "vitest"
import { formatCurrency } from "./formatCurrency"

describe("formatCurrency", () => {
  it("formats integer values as EUR currency", () => {
    const result = formatCurrency(1)
    expect(result).toMatch("1.00 €")
  })

  it("formats decimal values correctly", () => {
    const result = formatCurrency(9.99)
    expect(result).toMatch("9,99 €")
  })

  it("formats large numbers with grouping", () => {
    const result = formatCurrency(1234567.89)
    expect(result).toMatch("1.234.567,89 €")
  })

  it("handles zero correctly", () => {
    const result = formatCurrency(0)
    expect(result).toMatch("0,00 €")
  })

  it("handles negative numbers correctly", () => {
    const result = formatCurrency(-5.5)
    expect(result).toMatch("-5,50 €")
  })
})
