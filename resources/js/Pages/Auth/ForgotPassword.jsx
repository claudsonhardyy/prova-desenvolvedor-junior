import { useForm, Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/ui/Button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Senha" />

            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                Esqueceu sua senha?
            </h2>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Digite seu e-mail e enviaremos um link para redefinir sua senha.
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="E-mail" />
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    Enviar link de redefinição
                </Button>

                <div className="flex justify-center">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition"
                    >
                        Voltar ao login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
