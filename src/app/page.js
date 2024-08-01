import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div
        data-testid="background-div"
        style={{
          backgroundImage: 'url("https://www.sgclark.com/blog/wp-content/uploads/2023/03/starwars_starwars_new_hope_angled_stars.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          color:'white'
        }}
      >
        <div className="flex items-center justify-center min-h-screen">
            <Link
              href={`/hero`}
              className="bg-indigo-400 text-white px-4 sm:px-8 py-2 sm:py-2 hover:bg-indigo-800 rounded-md "
              style={{ marginTop: '200px' }}
              >
              Go!  
            </Link>
        </div>
      </div>
    </main>
  );
}