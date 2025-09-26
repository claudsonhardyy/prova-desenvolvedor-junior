import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((payload) => {
    const id = crypto.randomUUID();
    const toast = { id, ...payload };
    setToasts((t) => [...t, toast]);
    const ttl = payload.ttl ?? 3500;
    setTimeout(() => remove(id), ttl);
  }, [remove]);

  const api = useMemo(
    () => ({
      success: (m) => push({ type: "success", message: m }),
      error: (m) => push({ type: "error", message: m }),
      info: (m) => push({ type: "info", message: m }),
      warning: (m) => push({ type: "warning", message: m }),
    }),
    [push]
  );

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <ToastContainer toasts={toasts} onClose={remove} />
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed z-[9999] top-4 right-4 space-y-2">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={() => onClose(t.id)} />
      ))}
    </div>
  );
}

function Toast({ type, message, onClose }) {
  const styles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-500 text-white",
  }[type ?? "info"];

  return (
    <div
      className={`shadow-lg rounded-md px-4 py-3 text-sm flex items-start gap-3 ${styles}`}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="opacity-80 hover:opacity-100 transition"
        aria-label="Fechar"
      >
        ×
      </button>
    </div>
  );
}
