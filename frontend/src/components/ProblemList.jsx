
import React, { useState, useEffect} from "react";
import { useContext } from "react"; 
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "./reusablecomponents/Navbar";
import { Link } from "react-router-dom";
import { getProblemListAPI } from "../apis";
import { CheckCircle, Circle, Clock } from "lucide-react";


const ProblemList = () => {
  const { logout } = useContext(AuthContext);

     const [filter, setFilter] = useState("all");
    const [problems, setproblems] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    async function fetchProblems() {
      const cached = localStorage.getItem("PROBLEM_LIST");
      // Step 1: Try from localStorage first
      if (cached) {
        const parsed = JSON.parse(cached);
        setproblems(parsed);
        setLoading(false);
        return;
      }
      // Step 2: Fetch from API if not cached
      const result = await getProblemListAPI();
      if (result && result.success !== false) {
        const problemData = result.data || result.problems || result;
        setproblems(problemData);
        localStorage.setItem("PROBLEM_LIST", JSON.stringify(problemData)); // store in localStorage
      } else {
        setError(result.message || "Failed to fetch problems");
      }

      setLoading(false);
    }

    fetchProblems();
  }, []);
  
    if (loading) return <p>Loading problemss...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(problems)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredproblems =
    filter === "all"
      ? problems
      : problems.filter((p) => p.difficulty === filter);

  return (
    <div className="max-w-13xl mx-auto px-4 py-8">
      <Navbar  />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Problems</h1>

        {/* Filter buttons */}
        <div className="flex space-x-2">
          {["all", "easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === level
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* problemss table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acceptance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Companies
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredproblems.map((problems) => (
                <tr key={problems.status} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {problems.status === "passed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : problems.status === null ? (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/solve/${
                        problems.problem_id || problems.id
                      }`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {problems.title}
                    </Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                        problems.difficulty
                      )}`}
                    >
                      {problems.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {problems.acceptance_rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {problems.companies.slice(0, 2).join(", ")}
                    {problems.companies.length > 2 && "..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={handlelogout}>Log Out</button>
    </div>
  );
};

export default ProblemList;

