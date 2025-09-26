import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/ui/Button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import ConfirmModal from '@/Components/ui/ConfirmModal';

export default function DeleteUserForm({ className = '' }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        password: '',
    });

    const deleteUser = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => setData('password', ''),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmOpen(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Excluir Conta
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Uma vez que sua conta for excluída, todos os seus dados serão
                    permanentemente apagados. Antes de prosseguir, confirme sua senha.
                </p>
            </header>

            {/* Botão que abre modal */}
            <Button
                variant="danger"
                onClick={() => setConfirmOpen(true)}
            >
                Excluir Conta
            </Button>

            {/* Modal estilizado */}
            <ConfirmModal
                open={confirmOpen}
                onClose={closeModal}
                onConfirm={deleteUser}
                title="Excluir conta"
                message={
                    <>
                        <p>Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.</p>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Senha" />
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                                placeholder="Digite sua senha"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </>
                }
            />
        </section>
    );
}
