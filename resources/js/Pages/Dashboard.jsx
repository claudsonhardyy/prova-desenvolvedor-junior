import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard({ auth, metrics, ultimas }) {
  const data = [
    { name: 'Ativas', value: metrics.ativas },
    { name: 'Inativas', value: metrics.inativas },
  ];

  const COLORS = ['#22c55e', '#ef4444']; // verde / vermelho

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">Total de Disciplinas</p>
            <p className="text-2xl font-bold">{metrics.total}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">Ativas</p>
            <p className="text-2xl font-bold text-green-600">{metrics.ativas}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">Inativas</p>
            <p className="text-2xl font-bold text-red-600">{metrics.inativas}</p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Visão Geral
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Últimas disciplinas */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Últimas Disciplinas
          </h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {ultimas.length === 0 && (
              <li className="py-2 text-gray-500 dark:text-gray-400">Nenhuma disciplina cadastrada.</li>
            )}
            {ultimas.map((d) => (
              <li key={d.id} className="py-2 flex justify-between">
                <span>{d.nome} ({d.codigo})</span>
                <span className={d.ativa ? "text-green-600" : "text-red-600"}>
                  {d.ativa ? "Ativa" : "Inativa"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
