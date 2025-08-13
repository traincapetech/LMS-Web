import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const Captions = ({ captions, setCaptions, touched, setTouched }) => {
  const [language, setLanguage] = useState("English (US)");
  const [enabled, setEnabled] = useState(true);

  return (
    <section className="max-w-6xl mx-auto bg-white rounded shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Captions</h1>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>

          {/* Enable/Disable button */}
          <button
            onClick={() => setEnabled((prev) => !prev)}
            className={`px-4 py-2 border rounded text-sm font-medium ${
              enabled
                ? "border-purple-500 text-purple-600 hover:bg-purple-50"
                : "border-gray-300 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {enabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 py-6">
        <p className="text-gray-600 mb-6">
          Learners of all levels of language proficiency highly value subtitles as it helps follow, understand and
          memorize the content. Also having subtitles ensures the content is accessible for those that are deaf or hard
          of hearing is crucial.
          <a href="#" className="text-indigo-600 underline ml-1">
            Learn more.
          </a>
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded p-4 flex items-start gap-3">
          <FaInfoCircle className="text-indigo-500 mt-1" />
          <p className="text-sm text-indigo-800">
            When you add video lectures to your course via the{" "}
            <a href="#" className="text-indigo-600 underline">
              Curriculum
            </a>{" "}
            you will be able to add captions to those videos here.
          </p>
        </div>

        {/* Optional caption plan input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption Plan (optional)
          </label>
          <textarea
            className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 ${
              touched?.captions && captions.trim() === "" ? "border-red-500" : ""
            }`}
            rows={3}
            placeholder="Describe your plan for captions/subtitles."
            value={captions}
            onChange={(e) => {
              setCaptions(e.target.value);
              setTouched((t) => ({ ...t, captions: true }));
            }}
          />
          {touched?.captions && captions.trim() === "" && (
            <span className="text-red-600 text-sm mt-1 block">This field is required</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Captions;
