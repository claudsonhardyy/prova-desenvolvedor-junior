import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Dashboard({ auth, metrics = { total: 0, ativas: 0, inativas: 0 }, ultimas = [] }) {
  const data = [
    { name: 'Ativas', value: Number(metrics.ativas) || 0 },
    { name: 'Inativas', value: Number(metrics.inativas) || 0 },
  ];

  const COLORS = ['#16a34a', '#6b7280']; // verde e cinza

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-text-light dark:text-text-dark leading-tight">Dashboard</h2>}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href={route('disciplinas.index')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Total de Disciplinas</p>
            <p className="mt-2 text-3xl font-bold text-primary">{metrics.total ?? 0}</p>
          </Link>
          <Link
            href={route('disciplinas.index', { sort: 'ativa', direction: 'desc' })}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Ativas</p>
            <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{metrics.ativas ?? 0}</p>
          </Link>
          <Link
            href={route('disciplinas.index', { sort: 'ativa', direction: 'asc' })}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Inativas</p>
            <p className="mt-2 text-3xl font-bold text-gray-700 dark:text-gray-300">{metrics.inativas ?? 0}</p>
          </Link>
        </div>

        {/* Gráfico */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Disciplinas</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Últimas disciplinas (clicável) */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Últimas Disciplinas Criadas</h3>
          {ultimas.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {ultimas.map((d) => (
                <li key={d.id} className="py-2">
                  <Link
                    href={route('disciplinas.index', { id: d.id, action: 'edit' })}
                    className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md px-3 py-2 transition"
                  >
                    <div>
                      <p className="font-medium">{d.nome}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {d.codigo} — Criada em {new Date(d.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        d.ativa
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {d.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma disciplina cadastrada ainda.</p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
