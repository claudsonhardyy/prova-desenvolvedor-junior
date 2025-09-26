import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/Components/ui/Button";

export default function ConfirmModal({ open, onClose, onConfirm, title, message }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fundo escuro */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Container central */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
              {/* Título */}
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </Dialog.Title>

              {/* Mensagem */}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {message}
              </div>

              {/* Botões */}
              <div className="mt-4 flex justify-end gap-3">
                <Button variant="secondary" onClick={onClose}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                  Confirmar
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
