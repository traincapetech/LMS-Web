import React from "react";
import axios from "axios";

const CourseLandingPage = ({
  landingTitle,
  setLandingTitle,
  landingSubtitle,
  setLandingSubtitle,
  landingDesc,
  setLandingDesc,
  thumbnailFile,
  setThumbnailFile,
  thumbnailUrl,
  setThumbnailUrl,
  touched,
  setTouched
}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Course landing page</h2>
      <p className="text-gray-600 mb-5">Add a strong title, subtitle, and course description to improve conversions.</p>

      {/* Title */}
      <input
        type="text"
        className={`w-full px-4 py-2 rounded-md border ${
          touched.landingTitle && landingTitle.trim() === "" ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1`}
        placeholder="Course Title"
        value={landingTitle}
        onChange={e => {
          setLandingTitle(e.target.value);
          setTouched(t => ({ ...t, landingTitle: true }));
        }}
      />
      {touched.landingTitle && landingTitle.trim() === "" && (
        <p className="text-red-500 text-sm mb-4">This field is required</p>
      )}

      {/* Subtitle */}
      <input
        type="text"
        className={`w-full px-4 py-2 rounded-md border ${
          touched.landingSubtitle && landingSubtitle.trim() === "" ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1`}
        placeholder="Subtitle"
        value={landingSubtitle}
        onChange={e => {
          setLandingSubtitle(e.target.value);
          setTouched(t => ({ ...t, landingSubtitle: true }));
        }}
      />
      {touched.landingSubtitle && landingSubtitle.trim() === "" && (
        <p className="text-red-500 text-sm mb-4">This field is required</p>
      )}

      {/* Description */}
      <textarea
        rows={5}
        className={`w-full px-4 py-2 rounded-md border ${
          touched.landingDesc && landingDesc.trim() === "" ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1`}
        placeholder="Full course description..."
        value={landingDesc}
        onChange={e => {
          setLandingDesc(e.target.value);
          setTouched(t => ({ ...t, landingDesc: true }));
        }}
      />
      {touched.landingDesc && landingDesc.trim() === "" && (
        <p className="text-red-500 text-sm mb-4">This field is required</p>
      )}

      {/* Thumbnail Upload */}
      <div className="mt-6">
        <label className="block font-semibold text-gray-800 mb-2">Course Thumbnail Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async e => {
            const file = e.target.files[0];
            setThumbnailFile(file);
            if (file) {
              const localUrl = URL.createObjectURL(file);
              setThumbnailUrl(localUrl);

              const formData = new FormData();
              formData.append("thumbnail", file);
              try {
                const res = await axios.post("https://lms-backend-5s5x.onrender.com/api/upload/thumbnail", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });
                setThumbnailUrl(res.data.url);
                URL.revokeObjectURL(localUrl);
              } catch (err) {
                console.error("Upload error:", err);
                alert("Warning: Image upload failed, using local preview.");
              }
            }
          }}
          className="w-full border-2 border-dashed border-gray-300 px-4 py-2 rounded-md text-sm"
        />

        {/* File Info */}
        {thumbnailFile && (
          <div className="mt-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
            📁 Selected file: {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}

        {/* Preview */}
        {thumbnailUrl && (
          <div className="mt-4">
            <p className="font-medium text-gray-800 mb-2">Thumbnail Preview:</p>
            <img
              src={thumbnailUrl}
              alt="Thumbnail Preview"
              className="w-48 h-32 rounded-md border border-gray-200 object-contain bg-gray-100 shadow"
              onError={e => {
                console.error("Image failed to load:", e.target.src);
                alert("Failed to load image preview. Please try uploading again.");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLandingPage;
