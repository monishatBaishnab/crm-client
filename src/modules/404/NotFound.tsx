import { MoveLeft } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-[#F8F8F8] flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="shrink-0 min-w-96 bg-white rounded-lg p-10 space-y-5 text-center">
        <h2 className="text-3xl font-bold text-red-500">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="mt-5">
          <Link to="/" className="text-purple-500 flex items-center justify-center gap-2">
            <MoveLeft /> Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
