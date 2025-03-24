"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const postsPerPage = 5;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.id.toString().includes(search)
  );

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <div
      className={`flex min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 p-5 transition-all duration-300 ${
          darkMode ? "bg-gray-800" : "bg-pink-800 text-white"
        }`}
      >
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="mt-4 space-y-3">
          <li>
            <a href="#" className="block p-2 hover:bg-yellow-600 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-yellow-600 rounded">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-yellow-600 rounded">
              Profile
            </a>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center bg-white dark:bg-gray-700 p-4 shadow-md rounded">
          <span className="text-lg font-semibold">
            {user ? `Welcome, ${user.email}!` : " Welcome to Dashboard"}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
            >
              {darkMode ? (
                <SunIcon className="w-6 h-6 text-yellow-500" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-900" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="mt-6 bg-white dark:bg-gray-700 p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>

          <input
            type="text"
            placeholder="Search by title or ID"
            className="w-full p-2 border rounded mb-4 dark:bg-gray-600 dark:text-white"
            onChange={(e) => setSearch(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          {loading ? (
            <p className="text-gray-500 animate-pulse">Loading posts...</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="border p-2">ID</th>
                      <th className="border p-2">Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-500 text-secondary"
                      >
                        <td className="border p-2 text-center">{post.id}</td>
                        <td className="border p-2">{post.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <span>Page {page}</span>
                <button
                  disabled={page * postsPerPage >= filteredPosts.length}
                  onClick={() => setPage(page + 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
