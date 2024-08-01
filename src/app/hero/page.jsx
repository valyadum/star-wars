'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';

function Hero() {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sw-api.starnavi.io/people/?page=${page}`
        );
        setHeroes([...heroes, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching heroes:', error);
        setError('Error fetching heroes: Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  if (error) return <div className="text-white m-20">{error}</div>;

  return (
    <div className="container mx-auto p-4 h-screen overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Heroes of the Star Wars
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        {loading && heroes.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 bg-white bg-opacity-10">
            <thead className="bg-gray-50 bg-opacity-50">
              <tr >
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  №
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Height
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white bg-opacity-50 divide-y divide-gray-200">
              {heroes.length &&
                heroes?.map((hero, index) => (
                  <tr
                    key={hero.id}
                    className={
                      index % 2 === 0
                        ? 'bg-white bg-opacity-50'
                        : 'bg-gray-100 bg-opacity-50'
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{hero.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hero?.height}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hero?.mass}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hero?.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/hero/${hero?.id}`}
                        className="bg-indigo-400 text-white px-4 sm:px-8 py-2 sm:py-2 hover:bg-indigo-800 rounded-md"
                      >
                        More info..
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </Suspense>
      <button
        className=" mt-4 bg-indigo-400 text-white px-4 sm:px-8 py-2 sm:py-2 hover:bg-indigo-800 rounded-md"
        onClick={() => setPage(page + 1)}
      >
        Load more...
      </button>
      {loading && heroes.length > 0 && <p>Loading...</p>}
    </div>
  );
}

export default Hero;
