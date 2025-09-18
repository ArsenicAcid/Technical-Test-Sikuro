import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";
import Header from "./Header";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  render(<Header />);

  it("renders navigation links", () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });
});
