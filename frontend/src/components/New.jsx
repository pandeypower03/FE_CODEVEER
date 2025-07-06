import React from "react";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle, Clock } from "lucide-react";


const New = () => {
  return (
    <div className="h-screen flex">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Problem Title</h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full text-blue-600 bg-blue-100">
              difficulty
            </span>
          </div>

          {/* Problem Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Acceptance: 80%</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Companies: 5</span>
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
              Problem description goes here...
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Tag1
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Tag2
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Companies</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                Company1
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                Company2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm">
                <Play className="h-4 w-4 mr-1" />
                Run
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language="javascript"
            value={`function solution(nums, target) {\n  // Write your code here\n}`}
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
        <div className="h-48 bg-gray-50 border-t border-gray-200 p-4">
          <h3 className="font-semibold mb-2">Last Submission Result</h3>
          <div className="text-gray-500">No submissions yet.</div>
        </div>
      </div>
    </div>
  );
};

export default New;
