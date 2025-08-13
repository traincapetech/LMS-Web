import React, { useState, useEffect } from "react";

const bytesToMB = (b) => (b / 1024 / 1024).toFixed(2);

const SetupTestVideo = ({ testVideo, setTestVideo, touched, setTouched }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isError = touched?.testVideo && !testVideo;

  useEffect(() => {
    if (testVideo) {
      const url = URL.createObjectURL(testVideo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [testVideo]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setTestVideo(file);
    setTouched((t) => ({ ...(t || {}), testVideo: true }));
    // console.log for dev
    // console.log("Test video selected:", file?.name);
  };

  return (
    <section className="max-w-6xl mx-auto bg-white rounded shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Setup &amp; test video
        </h1>
      </div>

      {/* Main content */}
      <div className="md:flex md:gap-8 px-6 py-8">
        {/* LEFT: content + uploader */}
        <div className="md:flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Arrange your ideal studio and get early feedback
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            It's important to set up your audio and video correctly now — fixing issues after recording is harder.
            Use this short test video to check audio levels, framing, lighting and clarity. Our team will review and
            provide feedback so your final course looks professional.
          </p>

          {/* Uploader */}
          <label htmlFor="test-video-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Upload a test video
          </label>
          <div>
            <input
              id="test-video-upload"
              type="file"
              accept="video/*"
              onChange={onFileChange}
              className="hidden"
            />

            {/* Clickable dashed area */}
            <label
              htmlFor="test-video-upload"
              className={[
                "relative flex flex-col items-center justify-center gap-3 w-full min-h-[140px] p-4 rounded-lg cursor-pointer transition-shadow",
                "border-2 border-dashed",
                isError ? "border-red-400 bg-red-50 hover:shadow-sm" : "border-gray-200 hover:shadow-md",
              ].join(" ")}
            >
              <svg
                className="w-10 h-10 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 7v10a2 2 0 002 2h8" />
              </svg>

              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">Click to upload or drag & drop a short test video</p>
                <p className="text-xs text-gray-500">Accepted: MP4, MOV, WEBM — keep under 200MB</p>
              </div>
            </label>

            {/* Preview or selected info */}
            <div className="mt-4">
              {testVideo ? (
                <div className="rounded-md border bg-indigo-50 border-indigo-100 p-3">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-700">✅ Selected: {testVideo.name}</p>
                      <p className="text-xs text-indigo-700/80 mt-1">{bytesToMB(testVideo.size)} MB</p>
                      <div className="mt-3">
                        {/* video preview */}
                        {previewUrl && (
                          <video
                            src={previewUrl}
                            controls
                            className="w-full max-h-48 rounded-md border"
                          />
                        )}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            // keep file but mark touched true already
                          }}
                          className="px-3 py-1.5 text-sm rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                        >
                          Keep file
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTestVideo(null);
                            setTouched((t) => ({ ...(t || {}), testVideo: true }));
                          }}
                          className="px-3 py-1.5 text-sm rounded-md border text-gray-700 hover:bg-gray-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                isError ? (
                  <p className="text-red-600 text-sm">This field is required</p>
                ) : (
                  <p className="text-sm text-gray-500">No file selected yet.</p>
                )
              )}
            </div>
          </div>

          {/* Tips & Requirements (like screenshots) */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips</h3>
            <div className="space-y-5 text-gray-700">
              <div>
                <p className="font-medium">Students need to hear you.</p>
                <p className="text-sm text-gray-600">
                  A good microphone is the most important piece of equipment. Place it 6–12 inches (15–30 cm) from you.
                </p>
              </div>

              <div>
                <p className="font-medium">Make a studio.</p>
                <p className="text-sm text-gray-600">
                  Clean up your background and arrange simple props. A plain backdrop works great.
                </p>
              </div>

              <div>
                <p className="font-medium">Light the scene and your face.</p>
                <p className="text-sm text-gray-600">
                  Turn off harsh overhead lights. Use lamps in front of you for even lighting.
                </p>
              </div>

              <div>
                <p className="font-medium">Reduce noise and echo.</p>
                <p className="text-sm text-gray-600">
                  Record where it's quiet, and use rugs or cushions to dampen echo.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              <li>Film and export in HD — 720p minimum (1080p recommended).</li>
              <li>Audio should be clear and synced with video.</li>
              <li>Video should be free of distracting background noise.</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Resources</h3>
            <div className="space-y-4 text-sm">
              <div>
                <a href="#" className="font-medium text-indigo-600 underline">Teaching Center: Guide to equipment</a>
                <p className="text-gray-600">Make a home studio on a budget.</p>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600 underline">Traincape Trust & Safety</a>
                <p className="text-gray-600">Our policies for instructors and students.</p>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600 underline">Join the instructor community</a>
                <p className="text-gray-600">A place to talk with other instructors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Resource card & CTA */}
        <aside className="mt-8 md:mt-0 md:w-80">
          <div className="bg-white border rounded-lg shadow p-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              {/* decorative svg similar to screenshots */}
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                <rect x="2" y="3" width="14" height="11" rx="1.5" stroke="#7c3aed" strokeWidth="1.2" />
                <rect x="7" y="15" width="10" height="4" rx="1" stroke="#7c3aed" strokeWidth="1.2" />
              </svg>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Free expert video help</h4>
            <p className="text-sm text-gray-600 mb-4">Get personalized advice on your audio and video.</p>

            <button
              type="button"
              onClick={() => {
                // placeholder: you can open a modal or navigate
                // console.log("Create a test video clicked");
              }}
              className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium"
            >
              Create a test video
            </button>
          </div>

          <div className="mt-4 p-4 border rounded-lg text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-2">Quick links</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a href="#" className="text-indigo-600 underline">Course quality checklist</a></li>
              <li><a href="#" className="text-indigo-600 underline">Upload & publish guide</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default SetupTestVideo;
