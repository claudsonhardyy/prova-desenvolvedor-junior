import { useForm, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/ui/Button';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Redefinir Senha" />

            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                Redefinir Senha
            </h2>

            <form onSubmit={submit} className="space-y-4">
                {/* Email */}
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

                {/* Nova senha */}
                <div>
                    <InputLabel htmlFor="password" value="Nova senha" />
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar senha */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar nova senha" />
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    Redefinir Senha
                </Button>
            </form>
        </GuestLayout>
    );
}
