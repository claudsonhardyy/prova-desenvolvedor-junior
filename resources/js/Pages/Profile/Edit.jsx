import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Button from '@/Components/ui/Button';

export default function Edit({ auth, user }) {
  const { flash } = usePage().props;

  // formulário nome/email
  const {
    data: dataProfile,
    setData: setDataProfile,
    patch: patchProfile,
    errors: errorsProfile,
    processing: processingProfile,
  } = useForm({
    name: user.name || '',
    email: user.email || '',
  });

  // formulário senha
  const {
    data: dataPassword,
    setData: setDataPassword,
    patch: patchPassword,
    errors: errorsPassword,
    processing: processingPassword,
    reset: resetPassword,
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submitProfile = (e) => {
    e.preventDefault();
    patchProfile(route('profile.update'));
  };

  const submitPassword = (e) => {
    e.preventDefault();
    patchPassword(route('profile.password.update'), {
      onSuccess: () => resetPassword(),
    });
  };

  const submitDelete = (e) => {
    e.preventDefault();
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      router.delete(route('profile.destroy'));
    }
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-text-light dark:text-text-dark leading-tight">Perfil</h2>}
    >
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* feedback */}
        {flash?.success && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-3">
            {flash.success}
          </div>
        )}

        {/* Atualizar nome/email */}
        <form
          onSubmit={submitProfile}
          className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow space-y-4"
        >
          <h3 className="text-lg font-semibold">Informações do Usuário</h3>

          <div>
            <InputLabel htmlFor="name" value="Nome" />
            <input
              id="name"
              type="text"
              value={dataProfile.name}
              onChange={(e) => setDataProfile('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
            />
            <InputError message={errorsProfile.name} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="email" value="E-mail" />
            <input
              id="email"
              type="email"
              value={dataProfile.email}
              onChange={(e) => setDataProfile('email', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
            />
            <InputError message={errorsProfile.email} className="mt-2" />
          </div>

          <Button type="submit" disabled={processingProfile}>
            Salvar
          </Button>
        </form>

        {/* Alterar senha */}
        <form
          onSubmit={submitPassword}
          className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow space-y-4"
        >
          <h3 className="text-lg font-semibold">Alterar Senha</h3>

          <div>
            <InputLabel htmlFor="current_password" value="Senha atual" />
            <input
              id="current_password"
              type="password"
              value={dataPassword.current_password}
              onChange={(e) => setDataPassword('current_password', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
            />
            <InputError message={errorsPassword.current_password} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password" value="Nova senha" />
            <input
              id="password"
              type="password"
              value={dataPassword.password}
              onChange={(e) => setDataPassword('password', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
            />
            <InputError message={errorsPassword.password} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password_confirmation" value="Confirmar nova senha" />
            <input
              id="password_confirmation"
              type="password"
              value={dataPassword.password_confirmation}
              onChange={(e) => setDataPassword('password_confirmation', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
            />
            <InputError message={errorsPassword.password_confirmation} className="mt-2" />
          </div>

          <Button type="submit" disabled={processingPassword}>
            Alterar Senha
          </Button>
        </form>

        {/* Excluir conta */}
        <form
          onSubmit={submitDelete}
          className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg shadow space-y-4"
        >
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Excluir Conta</h3>
          <p className="text-sm text-red-700 dark:text-red-300">
            Esta ação é irreversível. Sua conta será removida permanentemente.
          </p>
          <Button type="submit" variant="danger">
            Excluir conta
          </Button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
