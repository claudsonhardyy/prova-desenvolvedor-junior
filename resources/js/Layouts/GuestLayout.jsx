import Logoiesb from '@/Components/Logoiesb.png';

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      {/* Logo IESB */}
      <div className="mb-6">
        <img src={Logoiesb} alt="Centro Universitário IESB" className="w-32 h-auto" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}
