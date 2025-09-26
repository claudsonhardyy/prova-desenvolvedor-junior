import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/ui/Button';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Registrar" />

      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Criar uma conta
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <InputLabel htmlFor="name" value="Nome" />
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="email" value="E-mail" />
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

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

        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />
          <input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={processing}>
            Registrar
          </Button>
        </div>

        <div className="flex justify-center">
          <Link
            href={route('login')}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition"
          >
            Já possui conta? Entrar
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
