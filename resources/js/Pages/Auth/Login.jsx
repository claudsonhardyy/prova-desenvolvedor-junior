import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import LogoIesb from '@/Components/LogoIesb.png';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#E30613] dark:bg-gray-900">
      <div className="text-center mb-8 flex flex-col items-center">
        <img src={LogoIesb} alt="IESB Logo" className="h-20 mb-4" />
        <h1 className="text-2xl font-bold text-white dark:text-gray-100">Centro Universitário IESB</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

        <form onSubmit={submit} className="space-y-6">
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <input
              id="email" type="email" value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#E30613] focus:border-[#E30613]"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password" value="Senha" />
            <input
              id="password" type="password" value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#E30613] focus:border-[#E30613]"
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox" checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#E30613] focus:ring-[#E30613]"
              />
              <span className="ml-2">Lembrar-me</span>
            </label>

            {canResetPassword && (
              <Link href={route('password.request')} className="text-sm text-[#E30613] hover:underline dark:text-red-400">
                Esqueceu a senha?
              </Link>
            )}
          </div>

        <button type="submit" disabled={processing}
          className="w-full bg-[#E30613] text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">
          Entrar
        </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Não tem conta?{' '}
            <Link href={route('register')} className="font-semibold text-[#E30613] hover:underline dark:text-red-400">
              Registrar-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
