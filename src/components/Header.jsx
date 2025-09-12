import Link from 'next/link';
import { getSession } from '@/lib/session';
import LogoutButton from './LogoutButton'; // Hum ise agle step mein banayenge

export default async function Header() {
  const session = await getSession();

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SchoolDir
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-600 text-sm hidden sm:block">Welcome, {session.email}</span>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}