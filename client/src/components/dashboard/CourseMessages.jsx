import React from "react";

const CourseMessages = ({
  welcomeMsg,
  setWelcomeMsg,
  congratsMsg,
  setCongratsMsg,
  touched,
  setTouched,
}) => {
  const inputBase =
    "w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorBorder = "border-red-500";
  const errorText = "text-red-600 text-sm mt-1";

  return (
    <div className="p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-2">Course messages</h2>
      <p className="text-gray-600 mb-6">
        Customize the messages learners receive when they join or complete your
        course on Traincape.
      </p>

      {/* Welcome Message */}
      <textarea
        rows={4}
        placeholder="Welcome message..."
        className={`${inputBase} ${
          touched.welcomeMsg && welcomeMsg.trim() === "" ? errorBorder : "border-gray-300"
        } mb-2`}
        value={welcomeMsg}
        onChange={(e) => {
          setWelcomeMsg(e.target.value);
          setTouched((t) => ({ ...t, welcomeMsg: true }));
        }}
      />
      {touched.welcomeMsg && welcomeMsg.trim() === "" && (
        <span className={errorText}>This field is required</span>
      )}

      {/* Congratulations Message */}
      <textarea
        rows={4}
        placeholder="Congratulations message..."
        className={`${inputBase} mt-6 ${
          touched.congratsMsg && congratsMsg.trim() === "" ? errorBorder : "border-gray-300"
        }`}
        value={congratsMsg}
        onChange={(e) => {
          setCongratsMsg(e.target.value);
          setTouched((t) => ({ ...t, congratsMsg: true }));
        }}
      />
      {touched.congratsMsg && congratsMsg.trim() === "" && (
        <span className={errorText}>This field is required</span>
      )}
    </div>
  );
};

export default CourseMessages;
