export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-center text-primary mb-6">
                    Centro Universitário IESB
                </h1>
                {children}
            </div>
        </div>
    );
}
