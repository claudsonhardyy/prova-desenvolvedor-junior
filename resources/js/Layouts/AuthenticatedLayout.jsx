import { useState } from 'react';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
            {/* Navbar */}
            <nav className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        
                        {/* Nome IESB */}
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-primary">
                                Centro Universitário IESB
                            </Link>
                        </div>

                        {/* Links Desktop */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-6">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                            <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                                Perfil
                            </NavLink>

                            {/* Logout */}
                            <form method="POST" action={route('logout')}>
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
                                >
                                    Sair
                                </button>
                            </form>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => document.documentElement.classList.toggle('dark')}
                                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                title="Alternar modo claro/escuro"
                            >
                                🌙
                            </button>
                        </div>

                        {/* Menu Mobile */}
                        <div className="sm:hidden flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dropdown Mobile */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden bg-surface-light dark:bg-surface-dark px-6 py-4 space-y-4">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                            Perfil
                        </ResponsiveNavLink>
                        <form method="POST" action={route('logout')}>
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                            <ResponsiveNavLink as="button">Sair</ResponsiveNavLink>
                        </form>
                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="w-full px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            🌙 Dark Mode
                        </button>
                    </div>
                )}
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-surface-light dark:bg-surface-dark shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Conteúdo */}
            <main className="py-6">{children}</main>
        </div>
    );
}
