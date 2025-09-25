import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/Components/Button';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
                <div className="mx-auto max-w-7xl px-6 flex justify-between items-center h-16">
                    
                    {/* Nome Institucional */}
                    <div className="flex items-center">
                        <span className="text-primary font-extrabold text-xl tracking-wide drop-shadow-sm">
                            Centro Universitário IESB
                        </span>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href={route('dashboard')} className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium transition">
                            Dashboard
                        </Link>
                        <Link href={route('profile.edit')} className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium transition">
                            Perfil
                        </Link>
                        <form method="POST" action={route('logout')}>
                            <Button type="submit">Sair</Button>
                        </form>
                        {/* Botão Dark Mode */}
                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="ml-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        >
                            🌙
                        </button>
                    </div>

                    {/* Menu mobile */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 dark:text-gray-200 hover:text-primary focus:outline-none"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Dropdown Mobile */}
                {menuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 shadow-inner px-6 py-4 space-y-4">
                        <Link href={route('dashboard')} className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                            Dashboard
                        </Link>
                        <Link href={route('profile.edit')} className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                            Perfil
                        </Link>
                        <form method="POST" action={route('logout')}>
                            <Button type="submit" className="w-full">Sair</Button>
                        </form>
                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="w-full px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        >
                            🌙 Dark Mode
                        </button>
                    </div>
                )}
            </nav>

            {/* Header dinâmico */}
            {header && (
                <header className="bg-gray-100 dark:bg-gray-800 shadow-sm">
                    <div className="mx-auto max-w-7xl px-6 py-6">
                        {header}
                    </div>
                </header>
            )}

            {/* Conteúdo */}
            <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </div>
    );
}
