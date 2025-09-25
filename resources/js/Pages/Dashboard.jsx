import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, metrics }) {
  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-text-light dark:text-text-dark leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total de Disciplinas</p>
            <p className="mt-2 text-3xl font-bold text-primary">{metrics.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ativas</p>
            <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{metrics.ativas}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Inativas</p>
            <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">{metrics.inativas}</p>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Gerencie as Disciplinas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Cadastre, edite e exclua disciplinas do sistema.</p>
          </div>
          <Link
            href={route('disciplinas.index')}
            className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition"
          >
            Ir para Disciplinas
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
