import React, { useState, useEffect } from "react";

const bytesToMB = (b) => (b / 1024 / 1024).toFixed(2);

const FilmEdit = ({ filmEdit, setFilmEdit, sampleVideo, setSampleVideo, touched, setTouched }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isError = touched?.filmEdit && (!filmEdit || filmEdit.trim() === "");

  useEffect(() => {
    if (sampleVideo) {
      const url = URL.createObjectURL(sampleVideo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [sampleVideo]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setSampleVideo(file);
    setTouched((t) => ({ ...(t || {}), sampleVideo: true }));
  };

  return (
    <section className="max-w-6xl mx-auto bg-white rounded shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Film &amp; edit</h1>
      </div>

      {/* Content */}
      <div className="md:flex md:gap-8 px-6 py-8">
        {/* LEFT */}
        <div className="md:flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">You're ready to share your knowledge.</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This is your moment! If you've structured your course and followed the guides, you're prepared for the shoot.
            Pace yourself, take time to make it right, and fine-tune when you edit.
          </p>

          {/* Textarea */}
          <label htmlFor="film-edit" className="block text-sm font-medium text-gray-700 mb-2">
            Filming & editing plan
          </label>
          <textarea
            id="film-edit"
            rows={4}
            placeholder="Describe your filming setup, camera, mic, editing software, and any special notes..."
            value={filmEdit}
            onChange={(e) => {
              setFilmEdit(e.target.value);
              setTouched((t) => ({ ...(t || {}), filmEdit: true }));
            }}
            className={[
              "w-full p-4 rounded-lg resize-none outline-none transition-shadow",
              "border",
              isError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-200",
              "focus:ring-2"
            ].join(" ")}
            style={{ minHeight: 120 }}
          />
          {isError && <p className="text-red-600 text-sm mt-2">This field is required</p>}

          {/* Sample video uploader */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sample Video (Optional)</label>

            {/* hidden input */}
            <input
              id="sample-video-upload"
              type="file"
              accept="video/*"
              onChange={onFileChange}
              className="hidden"
            />

            <label
              htmlFor="sample-video-upload"
              className={[
                "group relative flex flex-col items-center justify-center gap-2 w-full min-h-[120px] p-4 rounded-lg cursor-pointer transition-shadow",
                "border-2 border-dashed",
                sampleVideo ? "border-indigo-300 bg-indigo-50" : "border-gray-200 hover:shadow-md"
              ].join(" ")}
            >
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l3-3M12 15l-3-3M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
              </svg>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">Click to upload or drag & drop a sample video</p>
                <p className="text-xs text-gray-500">Accepted: MP4, MOV, WEBM — try to keep under 200MB</p>
              </div>
            </label>

            {/* Selected file preview */}
            <div className="mt-4">
              {sampleVideo ? (
                <div className="rounded-md border bg-indigo-50 border-indigo-100 p-3">
                  <p className="text-sm font-medium text-indigo-700">✅ Selected: {sampleVideo.name}</p>
                  <p className="text-xs text-indigo-700/80 mt-1">{bytesToMB(sampleVideo.size)} MB</p>

                  {previewUrl && (
                    <div className="mt-3">
                      <video src={previewUrl} controls className="w-full max-h-48 rounded-md border" />
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        // keep file (no-op)
                      }}
                      className="px-3 py-1.5 text-sm rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                      Keep file
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSampleVideo(null);
                        setTouched((t) => ({ ...(t || {}), sampleVideo: true }));
                      }}
                      className="px-3 py-1.5 text-sm rounded-md border text-gray-700 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No sample video selected.</p>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips</h3>
            <div className="space-y-5 text-gray-700">
              <div>
                <p className="font-medium">Take breaks and review frequently.</p>
                <p className="text-sm text-gray-600">Filming can be tiring — check recordings often for issues you can fix early.</p>
              </div>

              <div>
                <p className="font-medium">For screencasts, clean up.</p>
                <p className="text-sm text-gray-600">Close unrelated windows and make on-screen text large enough to read.</p>
              </div>

              <div>
                <p className="font-medium">Be mindful of framing and audio.</p>
                <p className="text-sm text-gray-600">Center yourself, keep mic distance consistent, and remove noisy background devices.</p>
              </div>
            </div>
          </div>

          {/* Requirements & resources */}
          <div className="mt-8 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              <li>Film and export in HD — 720p minimum (1080p recommended).</li>
              <li>Audio should be clear and synced to the video.</li>
              <li>Video should be free of distracting background noise.</li>
            </ul>

            <div className="mt-6">
              <h4 className="text-base font-semibold text-gray-800 mb-2">Resources</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <a href="#" className="font-medium text-indigo-600 underline">Create a test video</a>
                  <p className="text-gray-600">Get feedback before filming your whole course</p>
                </div>
                <div>
                  <a href="#" className="font-medium text-indigo-600 underline">Teaching Center: Guide to quality A/V</a>
                  <p className="text-gray-600">Film and edit with confidence</p>
                </div>
                <div>
                  <a href="#" className="font-medium text-indigo-600 underline">Traincape trust & safety</a>
                  <p className="text-gray-600">Our policies for instructors and students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="mt-8 md:mt-0 md:w-80">
          <div className="bg-white border rounded-lg shadow p-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                <rect x="2" y="3" width="14" height="11" rx="1.5" stroke="#7c3aed" strokeWidth="1.2" />
                <rect x="7" y="15" width="10" height="4" rx="1" stroke="#7c3aed" strokeWidth="1.2" />
              </svg>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">You’re in good company</h4>
            <p className="text-sm text-gray-600 mb-4">Chat and get production help with other Traincape instructors.</p>

            <button
              type="button"
              onClick={() => {
                // placeholder for join community action
              }}
              className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium"
            >
              Join the community
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

export default FilmEdit;
