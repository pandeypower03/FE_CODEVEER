import React from "react";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle, Clock } from "lucide-react";
import {  useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; 

import { useContext } from "react"; 
import { AuthContext } from "./AuthProvider";
import {
  getproblembyidAPI,
  runCodeAndEvaluateAPI,
  submitcodeAPI,
} from "../apis";
import { useNavigate } from "react-router-dom";
const New = () => {
  const { id } = useParams(); // ← 'id' will be "123" from the URL
  console.log("Solving problem ID:", id);
  const { logout } = useContext(AuthContext);
const [message, setmessage] = useState([]);
  const [problems, setproblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [code, setCode] = useState(
    `function solution(nums, target) {\n  // Write your code here\n}`
  );
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    navigate("/");
  };
  const versionMap = {
    python: "3.10.0",
    javascript: "18.15.0",
    java: "15.0.2",
    cpp: "10.2.0",
  };
  
  useEffect(() => {
    const fetchProblem = async () => {
      console.log("hi iam inside get")
      const data = await getproblembyidAPI(id);
      // console.log("*********",data)
      console.log(data)
      if (data?.success) {
        setproblems(data.problem.data);
      } else {
        setError(data.message);
      }
      setLoading(false);
    };

    fetchProblem();
  }, [id]);
 
  useEffect(() => {
    // Set default code template
    setCode(getDefaultCode(language));
  }, [language]);

  const getDefaultCode = (lang) => {
    const templates = {
      javascript: `function solution(nums, target) {
    // Write your code here
    
}`,
      python: `def solution(nums, target):
    # Write your code here
    pass`,
      java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
    };
    return templates[lang] || templates.javascript;
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  const handleRun = async()=> {
    try {
      const response = await runCodeAndEvaluateAPI({
        problemId: id,
        code,
        language,
        version:versionMap[language]
      });
      console.log(response)
      setResult(response);
    } catch (err) {
      setResult({ error: err.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null); // Clear old result
    console.log("🚀 handleSubmit called"); 
    try {
      const response = await submitcodeAPI({
        problemId: id,
        code,
        language,
        version: versionMap[language], // or dynamic version map if you have one
      });

      if (response.success) {
        alert(response.message);
        setmessage(response.message);
        
        setResult({
          message: "Code submitted successfully ✅",
          data: response.data,
        });
      } else {
        alert(response.message || "Submission failed ❌"); 
        setResult({
          message: response.message || "Submission failed ❌",
        });
      }
    } catch (err) {
      setResult({
        message: err.message || "Something went wrong ❌",
      });
    } finally {
      setSubmitting(false);
    }
  }
  
  return (
    <div className="h-screen flex">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {problems?.title || "Loading..."}
            </h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full text-blue-600 bg-blue-100">
              {problems?.difficulty || "difficulty"}
            </span>
          </div>

          {/* Problem Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Acceptance: {problems?.acceptance_rate || "?"}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Companies: {problems?.companies?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {["description", "submissions", "discussions"].map((tab) => (
            <button
              key={tab}
              className="px-6 py-3 text-sm font-medium capitalize text-gray-500 hover:text-gray-700"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <pre className="whitespace-pre-wrap font-sans">
              {problems?.description || "Loading problem description..."}
            </pre>
          </div>

          <div className="flex flex-wrap gap-2">
            {problems?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Companies</h3>
            <div className="flex flex-wrap gap-2">
              {problems?.companies?.map((company, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <div className="flex space-x-2">
              <button
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                onClick={() => handleRun(false)}
              >
                <Play className="h-4 w-4 mr-1" />
                Run
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                <Clock className="h-4 w-4 mr-1" />
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={setCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Result Panel (optional placeholder) */}
        <div className="h-48 bg-white border-t border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 text-base mb-3">
            Test Cases
          </h3>

          {!result ? (
            <div className="text-gray-400 italic">No submissions yet.</div>
          ) : (
            <div className="space-y-4">
              {result?.results?.map((test, index) => (
                <div
                  key={index}
                  className={`border rounded-md p-3 text-sm shadow-sm ${
                    test.passed
                      ? "border-green-400 bg-green-50"
                      : "border-red-400 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      Test Case #{test.test_case_number}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        test.passed
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {test.passed ? "Passed" : "Failed"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 font-medium">Input:</p>
                      <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                        {test.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">
                        Expected Output:
                      </p>
                      <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                        {test.expected_output}
                      </pre>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Your Output:</p>
                      <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                        {test.actual_output}
                      </pre>
                    </div>
                    {test.error_output && (
                      <div className="col-span-2">
                        <p className="text-red-600 font-medium">Error:</p>
                        <pre className="bg-red-100 p-2 rounded whitespace-pre-wrap text-red-700">
                          {test.error_output}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handlelogout}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default New;
