import { Link } from '@inertiajs/react';
import LogoIesb from '@/Components/LogoIesb.png';

export default function Welcome({ canLogin, canRegister }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#E30613] dark:bg-gray-900 text-white">
      <div className="text-center mb-8 flex flex-col items-center">
        <img src={LogoIesb} alt="IESB Logo" className="h-20 mb-4" />
        <h1 className="text-3xl font-bold text-white dark:text-gray-100">Centro Universitário IESB</h1>
        <p className="mt-2 text-lg opacity-90 dark:text-gray-300">Bem-vindo ao sistema acadêmico</p>
      </div>

      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Acesse sua conta</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Faça login ou registre-se para começar</p>

        <div className="flex flex-col gap-4">
          {canLogin && (
            <Link href={route('login')} className="bg-[#E30613] text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">
              Login
            </Link>
          )}
          {canRegister && (
            <Link href={route('register')}
              className="bg-white border border-[#E30613] text-[#E30613] py-2 px-4 rounded-lg font-semibold hover:bg-[#E30613] hover:text-white transition dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white">
              Registrar-se
            </Link>
          )}
        </div>
      </div>

      <footer className="mt-10 text-sm opacity-80 dark:text-gray-400">
        © {new Date().getFullYear()} Centro Universitário IESB
      </footer>
    </div>
  );
}
