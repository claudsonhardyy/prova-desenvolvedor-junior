import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/ui/Button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import ConfirmModal from '@/Components/ui/ConfirmModal';

export default function UpdatePasswordForm({ className = '' }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, setData, put, errors, reset, processing } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = () => {
    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setConfirmOpen(false);
      },
    });
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Alterar Senha
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Certifique-se de usar uma senha longa, com letras, números e símbolos
          para maior segurança.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InputLabel htmlFor="current_password" value="Senha atual" />
          <input
            id="current_password"
            type="password"
            value={data.current_password}
            onChange={(e) => setData('current_password', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Nova senha" />
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirmar nova senha" />
          <input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>
      </div>

      {/* Botão que abre modal */}
      <div>
        <Button
          type="button"
          disabled={processing}
          onClick={() => setConfirmOpen(true)}
        >
          Atualizar Senha
        </Button>
      </div>

      {/* Modal estilizado */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={updatePassword}
        title="Confirmar alteração de senha"
        message="Tem certeza que deseja alterar sua senha? Você precisará usar a nova senha no próximo login."
      />
    </section>
  );
}
