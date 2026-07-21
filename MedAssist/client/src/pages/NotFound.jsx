import { Link } from "react-router-dom";
import { FaTriangleExclamation } from "react-icons/fa6";

function NotFound() {
  return (
    <section className="min-h-screen bg-blue-50 flex items-center justify-center px-6">

      <div className="text-center">

        <FaTriangleExclamation className="text-7xl text-red-500 mx-auto" />

        <h1 className="text-8xl font-bold text-gray-800 mt-6">
          404
        </h1>

        <h2 className="text-3xl font-semibold mt-4 text-gray-700">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          Back to Home
        </Link>

      </div>

    </section>
  );
}

export default NotFound;