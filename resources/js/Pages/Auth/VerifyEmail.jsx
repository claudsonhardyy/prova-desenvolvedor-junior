import { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const { props } = usePage();

    useEffect(() => {
        if (status === 'verification-link-sent') {
            alert('Um novo link de verificação foi enviado para seu e-mail.');
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar E-mail" />

            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                Verifique seu e-mail
            </h2>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Antes de continuar, confirme seu e-mail clicando no link que enviamos.
                Se você não recebeu, podemos enviar outro.
            </p>

            <form onSubmit={submit} className="space-y-4">
                <Button type="submit" className="w-full" disabled={processing}>
                    Reenviar link de verificação
                </Button>
            </form>

            <div className="mt-4 flex justify-between">
                <Link
                    href={route('profile.edit')}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition"
                >
                    Editar perfil
                </Link>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-red-600 hover:text-red-800 transition"
                >
                    Sair
                </Link>
            </div>
        </GuestLayout>
    );
}
