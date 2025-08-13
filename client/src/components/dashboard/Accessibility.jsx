import React from "react";

const Accessibility = ({ accessibility, setAccessibility, touched, setTouched }) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-sm space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Accessibility (optional)</h2>
        <p className="text-gray-600 mt-1">
          Describe how you will make your course accessible to all learners, including those with disabilities.
        </p>
      </div>

      {/* Info Box */}
      <div className="border border-purple-200 bg-purple-50 p-4 rounded-md text-sm text-gray-700 space-y-2">
        <p className="font-semibold">Create accessible learning content</p>
        <p>
          Accessibility provides a person with a disability access to — and benefits of — the same information,
          interactions, and services as a person without a disability in a way that’s sensible, meaningful, and usable.
        </p>
        <p>
          Some may think that accessibility is primarily aimed at helping people with physical disabilities, such as
          those with hearing or vision loss. However, making content accessible to everyone isn’t just the equitable
          thing to do — it helps broaden your reach.
        </p>
        <a
          href="https://www.udemy.com/teaching-center/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-700 underline"
        >
          Learn more about creating accessible content
        </a>
      </div>

      {/* Textarea Input */}
      <div>
        <textarea
          rows={3}
          className={`w-full border ${
            touched.accessibility && accessibility.trim() === ""
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="E.g. Provide transcripts, use accessible colors, etc."
          value={accessibility}
          onChange={(e) => {
            setAccessibility(e.target.value);
            setTouched((t) => ({ ...t, accessibility: true }));
          }}
        />
        {touched.accessibility && accessibility.trim() === "" && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}
      </div>

      {/* Checklist */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Accessibility Checklists</h3>

        <div className="space-y-3">
          <label className="flex items-start space-x-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1" />
            <span>Captions in this course meet these guidelines</span>
          </label>

          <label className="flex items-start space-x-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1" />
            <span>Audio content in this course meets these guidelines</span>
          </label>

          <label className="flex items-start space-x-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1" />
            <span>Materials attached to this course meet these guidelines</span>
          </label>
        </div>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-base font-semibold text-gray-800 mb-2">Accessibility Resources</h4>
        <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
          <li>
            <a href="#" className="underline">Creating accessible learning content</a>
          </li>
          <li>
            <a href="#" className="underline">Audio content for accessible learning</a>
          </li>
          <li>
            <a href="#" className="underline">Visual content for accessible learning</a>
          </li>
          <li>
            <a href="#" className="underline">Creating accessible resource documents</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Accessibility;
