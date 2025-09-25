import { useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import LogoIesb from '@/Components/LogoIesb.png';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '', email: '', password: '', password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#E30613] dark:bg-gray-900">
      <div className="text-center mb-8 flex flex-col items-center">
        <img src={LogoIesb} alt="IESB Logo" className="h-20 mb-4" />
        <h1 className="text-2xl font-bold text-white dark:text-gray-100">Centro Universitário IESB</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <InputLabel htmlFor="name" value="Nome" />
            <input
              id="name" value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#E30613] focus:border-[#E30613]"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

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

          <div>
            <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />
            <input
              id="password_confirmation" type="password" value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#E30613] focus:border-[#E30613]"
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <button type="submit" disabled={processing}
            className="w-full bg-[#E30613] text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">
            Registrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Já tem conta?{' '}
            <Link href={route('login')} className="font-semibold text-[#E30613] hover:underline dark:text-red-400">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
