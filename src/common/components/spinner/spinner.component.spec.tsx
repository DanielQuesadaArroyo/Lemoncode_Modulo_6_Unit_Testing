// @vitest-environment jsdom
import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { trackPromise } from "react-promise-tracker";

import { SpinnerComponent } from "./spinner.component";

describe("common/SpinnerComponent", () => {
  it("Comprobamos el estado inicial del spinner", async () => {
    // Arrange
    const promise = new Promise((resolve) => setTimeout(resolve, 100));
    // Act
    render(<SpinnerComponent />);

    // Assert
    const modal = screen.queryByTestId("spinner-modal");
    expect(modal).not.toBeInTheDocument();
  });
});

describe("common/SpinnerComponent", () => {
  it("Comprobamos que aparece el spinner y desaparece al finalizar promesa", async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 100));
    // Act
    render(<SpinnerComponent />);

    act(() => {
      trackPromise(promise);
    });

    // Assert
    const modal = screen.getByTestId("spinner-modal");
    expect(modal).toBeInTheDocument();

    // Promesa finaliza y revisamos que el spinner desaparezca
    await waitFor(() => {
      expect(screen.queryByTestId("spinner-modal")).not.toBeInTheDocument();
    });
  });
});
