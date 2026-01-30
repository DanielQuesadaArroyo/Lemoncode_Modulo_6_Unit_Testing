import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

describe("common/ConfirmationDialogComponent", () => {
  it("1. Verificar que el diálogo se renderiza cuando está abierto", () => {
    // ARRANGE
    // Creamos un objeto con todas las props que necesita el componente
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: "Eliminar empleado",
      labels: {
        closeButton: "Cancelar",
        acceptButton: "Aceptar",
      },
      children: <p>¿Seguro que quiere borrar a ...?</p>,
    };

    // ACT
    // render() renderiza el componente en un DOM virtual para testing
    render(<ConfirmationDialogComponent {...props} />);

    // ASSERT
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Eliminar empleado")).toBeInTheDocument();
    expect(
      screen.getByText("¿Seguro que quiere borrar a ...?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toHaveClass(
      "MuiButton-containedSecondary",
    );
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
    expect(screen.getByText("Aceptar")).toHaveClass(
      "MuiButton-containedPrimary",
    );
  });

  it("2. Verificar que el diálogo NO se renderiza cuando está cerrado", () => {
    // ARRANGE - props con isOpen en false
    const props = {
      isOpen: false,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: "Eliminar empleado",
      labels: {
        closeButton: "Cancelar",
        acceptButton: "Aceptar",
      },
      children: <p>¿Seguro que quiere borrar a ...?</p>,
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    // ASSERT
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Eliminar empleado")).not.toBeInTheDocument();
    expect(
      screen.queryByText("¿Seguro que quiere borrar a ...?"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cancelar")).not.toBeInTheDocument();
    expect(screen.queryByText("Aceptar")).not.toBeInTheDocument();
  });

  it("3. Verificar que se llama a onClose al hacer clic en cerrar", () => {
    // ARRANGE
    // Si vamos a interactuar con el componente necesitamos un mock y
    // no podemos poner directamente vi.fn() en las props porque
    // no podríamos verificar que se llamó
    const onCloseMock = vi.fn();
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: onCloseMock, // Usamos nuestro mock específico
      title: "Eliminar empleado",
      labels: {
        closeButton: "Cancelar",
        acceptButton: "Aceptar",
      },
      children: <p>¿Seguro que quiere borrar a ...?</p>,
    };

    // ACT - Renderizamos y simulamos un click en el botón de cerrar
    const { rerender } = render(<ConfirmationDialogComponent {...props} />);
    const closeButton = screen.getByText("Cancelar");
    fireEvent.click(closeButton);

    // ASSERT
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    // ASSERT
    rerender(<ConfirmationDialogComponent {...props} isOpen={false} />);
    // He querido probar que el componente se desmonta, pero no es así,
    // simplemente cambia su visibilidad usando aria-hidden="true"
    const dialog = screen.getByRole("dialog", { hidden: true });
  });

  it("4. Verificar que se llaman onAccept y onClose al aceptar", () => {
    const onAcceptMock = vi.fn();
    const onCloseMock = vi.fn();

    const props = {
      isOpen: true,
      onAccept: onAcceptMock,
      onClose: onCloseMock,
      title: "Eliminar empleado",
      labels: {
        closeButton: "Cancelar",
        acceptButton: "Aceptar",
      },
      children: <p>¿Seguro que quiere borrar a ...?</p>,
    };

    // ACT - Renderizamos y simulamos un click en el botón de cerrar
    // render() devuelve un objeto con utilidades, incluyendo rerender()
    const { rerender } = render(<ConfirmationDialogComponent {...props} />);
    // Buscamos el botón por su texto
    const acceptButton = screen.getByText("Aceptar");
    // fireEvent.click() simula un click del usuario en el elemento
    fireEvent.click(acceptButton);

    expect(onAcceptMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    // ASSERT
    rerender(<ConfirmationDialogComponent {...props} isOpen={false} />);
    // He querido probar que el componente se desmonta, pero no es así,
    // simplemente cambia su visibilidad usando aria-hidden="true"
    const dialog = screen.getByRole("dialog", { hidden: true });
  });

  it("5. Verificar que se puede pasar un ReactNode como título", () => {
    // ARRANGE
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: <div style={{ color: "rgb(255, 0, 0)" }}>Eliminar empleado</div>,
      labels: {
        closeButton: "Cancelar",
        acceptButton: "Aceptar",
      },
      children: <p>¿Seguro que quiere borrar a ...?</p>,
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    // ASSERT
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Eliminar empleado")).toBeInTheDocument();
    expect(screen.getByText("Eliminar empleado")).toHaveStyle(
      "color: rgb(255, 0, 0)",
    );

    expect(
      screen.getByText("¿Seguro que quiere borrar a ...?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toHaveClass(
      "MuiButton-containedSecondary",
    );
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
    expect(screen.getByText("Aceptar")).toHaveClass(
      "MuiButton-containedPrimary",
    );
  });

  it("6. Verificar que se puede pasar un ReactNode como children", () => {
    // ARRANGE
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: "Eliminar empleado",
      labels: {
        closeButton: "Cancelar",
        acceptButton: "Aceptar",
      },
      children: <p>¿Seguro que quiere borrar a ...?</p>,
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    // ASSERT
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText("¿Seguro que quiere borrar a ...?"),
    ).toBeInTheDocument();
  });
});
