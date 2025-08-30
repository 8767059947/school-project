import Link from 'next/link';
import { PlusIcon, ListBulletIcon } from '@heroicons/react/24/outline';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tight">
          School Directory Project
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          This application allows you to add new schools to a directory and view the complete list.
        </p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-6">
        <Link
          href="/add-school"
          className="flex items-center justify-center gap-3 w-full sm:w-64 px-6 py-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
        >
          <PlusIcon className="h-6 w-6" />
          <span>Add a New School</span>
        </Link>

        <Link
          href="/schools"
          className="flex items-center justify-center gap-3 w-full sm:w-64 px-6 py-4 font-semibold text-gray-800 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-300"
        >
          <ListBulletIcon className="h-6 w-6" />
          <span>View All Schools</span>
        </Link>
      </div>
    </main>
  );
}
