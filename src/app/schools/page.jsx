// This is a Server Component, so we can fetch data directly
import Link from "next/link";
import Image from "next/image";
async function getSchools() {
  // We use an absolute URL because this fetch runs on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`, {
    cache: 'no-store', // This ensures we always get the latest data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch schools');
  }
  return res.json();
}

export default async function ShowSchoolsPage() {
  const data = await getSchools();
  const schools = data.schools;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Our Schools Directory</h1>
          <Link href="/add-school" className="w-full sm:w-auto px-5 py-3 text-center font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
            + Add New School
          </Link>
        </div>

        {schools.length === 0 ? (
          <p className="text-center text-gray-500">No schools have been added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-48">
                  {/* 2. Replace the <img> tag with the <Image> component */}
                  <Image
                    src={school.image || 'https://via.placeholder.com/400x300.png?text=No+Image'} 
                    alt={`Image of ${school.name}`}
                    fill // 'fill' makes the image cover the container
                    style={{ objectFit: 'cover' }} // Ensures the image is not distorted
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">{school.name}</h2>
                  <p className="text-gray-600 mt-2 text-sm">{school.address}</p>
                  <p className="text-gray-500 mt-1 text-sm">{school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}