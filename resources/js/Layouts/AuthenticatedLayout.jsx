import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import DarkModeToggle from '@/Components/DarkModeToggle';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import LogoIesb from '@/Components/LogoIesb.png';
import ConfirmModal from '@/Components/ui/ConfirmModal';

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  // 🔹 estados do modal de logout
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // 🔹 função que envia o logout via POST
  const handleLogout = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = route('logout');

    const token = document.querySelector('meta[name="csrf-token"]').content;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = '_token';
    input.value = token;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="min-h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark transition-colors duration-300">
      <nav className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo + Nome */}
            <div className="flex items-center">
              <img src={LogoIesb} alt="IESB" className="h-9 mr-3" />
              <Link href="/" className="text-lg font-bold text-primary drop-shadow-sm">
                Centro Universitário IESB
              </Link>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex sm:items-center sm:space-x-6">
              <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
              </NavLink>
              <NavLink href={route('disciplinas.index')} active={route().current('disciplinas.index')}>
                Disciplinas
              </NavLink>
              <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                Perfil
              </NavLink>

              <DarkModeToggle />

              {/* Botão de Logout → abre modal */}
              <button
                onClick={() => setLogoutConfirmOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Sair
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <DarkModeToggle />
              <button
                onClick={() => setShowingNavigationDropdown((p) => !p)}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Abrir menu"
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

        {/* Mobile dropdown */}
        {showingNavigationDropdown && (
          <div className="sm:hidden bg-surface-light dark:bg-surface-dark px-6 py-4 space-y-2 transition-colors duration-300">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('disciplinas.index')} active={route().current('disciplinas.index')}>
              Disciplinas
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>
              Perfil
            </ResponsiveNavLink>
            <ResponsiveNavLink
              as="button"
              onClick={() => setLogoutConfirmOpen(true)}
            >
              Sair
            </ResponsiveNavLink>
          </div>
        )}
      </nav>

      {/* Header */}
      {header && (
        <header className="bg-surface-light dark:bg-surface-dark shadow transition-colors duration-300">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      {/* Conteúdo */}
      <main className="py-6">{children}</main>

      {/* 🔹 Modal de logout */}
      <ConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        title="Confirmar logout"
        message="Tem certeza que deseja sair da sua conta?"
      />
    </div>
  );
}
