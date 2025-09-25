import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth }) {
    const { data, setData, put, errors } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('profile.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-text-light dark:text-text-dark leading-tight">
                    Perfil
                </h2>
            }
        >
            <Head title="Perfil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-surface-light dark:bg-surface-dark shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-text-light dark:text-text-dark mb-4">
                            Informações do Perfil
                        </h3>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-sm focus:border-primary dark:focus:border-primary focus:ring focus:ring-primary-light dark:focus:ring-primary-dark"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-sm focus:border-primary dark:focus:border-primary focus:ring focus:ring-primary-light dark:focus:ring-primary-dark"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-red-700 transition"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
