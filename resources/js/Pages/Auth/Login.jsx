import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/ui/Button';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Login" />

      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Acesse sua conta
      </h2>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        {/* Email */}
        <div>
          <InputLabel htmlFor="email" value="E-mail" />
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        {/* Senha */}
        <div>
          <InputLabel htmlFor="password" value="Senha" />
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        {/* Lembrar-me */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Lembrar-me
          </label>
        </div>

        {/* Botão login */}
        <div>
          <Button type="submit" className="w-full" disabled={processing}>
            Entrar
          </Button>
        </div>

        {/* Links extras */}
        <div className="flex items-center justify-between">
          <Link
            href={route('password.request')}
            className="text-sm text-primary hover:text-primary-dark transition"
          >
            Esqueceu sua senha?
          </Link>

          <Link
            href={route('register')}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition"
          >
            Criar conta
          </Link>
        </div>

      </form>
    </GuestLayout>
  );
}
