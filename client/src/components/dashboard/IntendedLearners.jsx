import React from "react";

const IntendedLearners = ({
  learningObjectives,
  setLearningObjectives,
  requirements,
  setRequirements,
  courseFor,
  setCourseFor,
  touched,
  setTouched,
}) => {
  return (
    <div className="px-4 py-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Intended learners</h2>
      <p className="text-sm text-gray-600 mb-6">
        The following descriptions will be publicly visible on your{" "}
        <a href="#" className="text-blue-600 underline">
          Course Landing Page
        </a>{" "}
        and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
      </p>

      {/* Learning Objectives */}
      <div className="mb-10">
        <h3 className="text-lg font-medium text-gray-800 mb-1">What will students learn in your course?</h3>
        <p className="text-sm text-gray-600 mb-4">
          You must enter at least 4{" "}
          <a href="#" className="text-blue-600 underline">
            learning objectives or outcomes
          </a>{" "}
          that learners can expect to achieve after completing your course.
        </p>

        {learningObjectives.map((obj, i) => (
          <div key={i} className="mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <input
                type="text"
                placeholder={`Example: Learning outcome ${i + 1}`}
                maxLength={160}
                value={obj}
                onChange={(e) => {
                  const newArr = [...learningObjectives];
                  newArr[i] = e.target.value;
                  setLearningObjectives(newArr);
                  setTouched((t) => ({
                    ...t,
                    learningObjectives: t.learningObjectives
                      ? t.learningObjectives.map((v, idx) =>
                          idx === i ? true : v
                        )
                      : [],
                  }));
                }}
                className={`w-full flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                  touched.learningObjectives &&
                  touched.learningObjectives[i] &&
                  obj.trim() === ""
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <span className="text-xs text-gray-500">{160 - obj.length}</span>
            </div>
            {touched.learningObjectives &&
              touched.learningObjectives[i] &&
              obj.trim() === "" && (
                <span className="text-xs text-red-500 mt-1 block">
                  This field is required
                </span>
              )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setLearningObjectives([...learningObjectives, ""])}
          className="text-sm text-blue-600 hover:underline mt-1"
        >
          + Add more to your response
        </button>
      </div>

      {/* Requirements */}
      <div className="mb-10">
        <h3 className="text-lg font-medium text-gray-800 mb-1">
          What are the requirements or prerequisites for taking your course?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </p>

        {requirements.map((req, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3"
          >
            <input
              type="text"
              placeholder="Example: No programming experience needed."
              value={req}
              onChange={(e) => {
                const newArr = [...requirements];
                newArr[i] = e.target.value;
                setRequirements(newArr);
                setTouched((t) => ({
                  ...t,
                  requirements: t.requirements
                    ? t.requirements.map((v, idx) =>
                        idx === i ? true : v
                      )
                    : [],
                }));
              }}
              className={`w-full flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                touched.requirements &&
                touched.requirements[i] &&
                req.trim() === ""
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setRequirements(requirements.filter((_, idx) => idx !== i))
              }
              disabled={requirements.length === 1}
              className="text-red-600 text-xl leading-none focus:outline-none disabled:opacity-50"
            >
              &times;
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRequirements([...requirements, ""])}
          className="text-sm text-blue-600 hover:underline mt-1"
        >
          + Add more to your response
        </button>
      </div>

      {/* Who is this course for */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-1">
          Who is this course for?
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Write a clear description of your intended learners for Traincape.
        </p>
        <input
          type="text"
          placeholder="Example: Beginners interested in Python for data science"
          value={courseFor}
          onChange={(e) => {
            setCourseFor(e.target.value);
            setTouched((t) => ({ ...t, courseFor: true }));
          }}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
            touched.courseFor && courseFor.trim() === ""
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {touched.courseFor && courseFor.trim() === "" && (
          <span className="text-xs text-red-500 mt-1 block">
            This field is required
          </span>
        )}
      </div>
    </div>
  );
};

export default IntendedLearners;
+96+6
6