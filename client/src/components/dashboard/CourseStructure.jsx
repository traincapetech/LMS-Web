import React from "react";

const CourseStructure = ({ structure, setStructure, touched, setTouched }) => {
  const isError = touched?.structure && structure.trim() === "";

  return (
    <section className="max-w-6xl mx-auto bg-white shadow rounded">
      {/* Header */}
      <div className="border-b py-6 px-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Course structure
        </h1>
      </div>

      {/* Content */}
      <div className="md:flex md:gap-8 px-6 py-8">
        {/* LEFT */}
        <div className="md:flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            There's a course in you. Plan it out.
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Planning your course carefully will create a clear learning path for students
            and help you once you film. Think through each lecture's goal, estimated video
            length, practical activities you’ll include, and how you’ll create introductions
            and summaries.
          </p>

          {/* Textarea */}
          <label
            htmlFor="course-structure"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course structure
          </label>
          <textarea
            id="course-structure"
            rows={6}
            placeholder="E.g. Section 1: Introduction, Section 2: Advanced Topics..."
            value={structure}
            onChange={(e) => {
              setStructure(e.target.value);
              setTouched((t) => ({ ...(t || {}), structure: true }));
            }}
            className={`w-full p-4 border rounded-lg resize-none outline-none focus:ring-2 transition ${
              isError
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {isError && (
            <p className="text-red-600 text-sm mt-2">This field is required</p>
          )}

          {/* Tips */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium">Start with your goals.</p>
                <p className="text-sm text-gray-600">
                  Setting goals (learning objectives) helps decide what content to include.
                </p>
              </div>
              <div>
                <p className="font-medium">Use short, focused lectures.</p>
                <p className="text-sm text-gray-600">
                  Keep videos between 2–10 mins for easy learning.
                </p>
              </div>
              <div>
                <p className="font-medium">Add practice activities.</p>
                <p className="text-sm text-gray-600">
                  Include quizzes, assignments, and projects.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Requirements
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              <li>Your course must have at least five lectures.</li>
              <li>Total video content must be at least 30 minutes.</li>
              <li>
                Course must be educational and free from promotional content.
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mt-8 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Resources</h3>
            <div className="space-y-4 text-sm">
              <div>
                <a href="#" className="font-medium text-indigo-600 underline">
                  Traincape Trust & Safety
                </a>
                <p className="text-gray-600">
                  Our policies for instructors and students.
                </p>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600 underline">
                  Join the instructor community
                </a>
                <p className="text-gray-600">
                  Connect with other Traincape instructors.
                </p>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600 underline">
                  How to create an online course — Traincape Guide
                </a>
                <p className="text-gray-600">
                  Learn course creation from Traincape’s instructor team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="mt-8 md:mt-0 md:w-80">
          <div className="bg-white border rounded-lg shadow p-6 text-center">
            <div className="mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2995/2995464.png"
                alt="Resources"
                className="w-16 h-16 mx-auto"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">
              Our library of resources
            </h4>
            <p className="text-gray-600 mb-4 text-sm">
              Tips and guides to structuring a course students love.
            </p>
            <a
              href="#"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 text-sm font-medium"
            >
              Teaching Center
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CourseStructure;
