import { renderHook, act } from "@testing-library/react";
import { useConfirmationDialog } from "./confirmation-dialog.hook";

describe("Test confirmation-dialog.hook", () => {
  it("1. Primer renderizado con estado inicial cerrado e item vacío", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual({
      id: "",
      name: "",
    });
  });

  it("2. Renderecido abriendo el cuadro de dialogo y validando el objeto a eliminar", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: "123",
        name: "Daniel",
      });
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual({
      id: "123",
      name: "Daniel",
    });
  });

  it("3. Abre el dialogo y lo cierra", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({ id: "123", name: "Daniel" });
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("4. Acepta el cuadro de dialogo y elimina valores del objeto a eliminar", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({ id: "123", name: "Daniel" });
      result.current.onAccept();
    });

    expect(result.current.itemToDelete).toEqual({
      id: "",
      name: "",
    });
  });
});
