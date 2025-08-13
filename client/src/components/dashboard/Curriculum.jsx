import React, { useState, useEffect } from "react";

/**
 * Props:
 * - curriculum: string (optional) — JSON string produced by this component or plain text
 * - setCurriculum: fn(value) — will receive a JSON string of the sections structure
 * - touched, setTouched: for parent validation state
 *
 * The component keeps an internal `sections` array and syncs to setCurriculum(JSON.stringify(sections))
 */

const Curriculum = ({ curriculum, setCurriculum, touched, setTouched }) => {
  // Try to parse incoming curriculum (if it's a JSON string from parent)
  const parseInitial = () => {
    if (!curriculum) return [];
    try {
      const parsed = JSON.parse(curriculum);
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  };

  const [sections, setSections] = useState(parseInitial);
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionObjective, setNewSectionObjective] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [objectiveCount, setObjectiveCount] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null); // used for expanding a section
  const [lectureInputs, setLectureInputs] = useState({}); // { sectionIndex: "lecture title" }

  // sync counters when inputs change
  useEffect(() => setTitleCount(newSectionTitle.length), [newSectionTitle]);
  useEffect(() => setObjectiveCount(newSectionObjective.length), [newSectionObjective]);

  // When sections change, notify parent as JSON string
  useEffect(() => {
    try {
      setCurriculum(JSON.stringify(sections));
    } catch {
      // ignore
    }
  }, [sections, setCurriculum]);

  // helpers
  const resetNewSection = () => {
    setNewSectionTitle("");
    setNewSectionObjective("");
    setTitleCount(0);
    setObjectiveCount(0);
  };

  const handleAddSection = () => {
    setTouched((t) => ({ ...(t || {}), curriculum: true }));
    if (newSectionTitle.trim() === "") return;
    const newSec = {
      id: Date.now(),
      title: newSectionTitle.trim(),
      objective: newSectionObjective.trim(),
      lectures: [],
    };
    setSections((s) => [...s, newSec]);
    resetNewSection();
    setAddingSection(false);
    setActiveSectionIndex(sections.length); // open the new section
  };

  const handleRemoveSection = (index) => {
    setSections((s) => s.filter((_, i) => i !== index));
    if (activeSectionIndex === index) setActiveSectionIndex(null);
  };

  const handleAddLecture = (index) => {
    const text = (lectureInputs[index] || "").trim();
    if (!text) return;
    setSections((s) =>
      s.map((sec, i) => (i === index ? { ...sec, lectures: [...sec.lectures, { id: Date.now(), title: text }] } : sec))
    );
    setLectureInputs((li) => ({ ...li, [index]: "" }));
    setTouched((t) => ({ ...(t || {}), curriculum: true }));
  };

  const handleRemoveLecture = (sectionIndex, lectureIndex) => {
    setSections((s) =>
      s.map((sec, i) =>
        i === sectionIndex ? { ...sec, lectures: sec.lectures.filter((_, li) => li !== lectureIndex) } : sec
      )
    );
  };

  // validation: show error if parent marked touched and no sections
  const showRequired = touched?.curriculum && sections.length === 0;

  return (
    <section className="max-w-6xl mx-auto bg-white rounded shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Curriculum</h1>
      </div>

      <div className="md:flex md:gap-8 px-6 py-8">
        {/* LEFT - main curriculum builder */}
        <div className="md:flex-1">
          <p className="text-gray-600 mb-6 leading-relaxed">
            Start putting together your course by creating sections, lectures and practice activities (quizzes, coding
            exercises and assignments). Use this curriculum builder to add sections and lectures, and provide a learning
            objective for each section.
          </p>

          {/* Curriculum box */}
          <div className="border rounded bg-gray-50 p-4">
            {sections.length === 0 ? (
              <div className="text-gray-600 text-sm py-8 text-center">No sections yet — add your first section below.</div>
            ) : (
              <div className="space-y-4">
                {sections.map((sec, si) => (
                  <div key={sec.id} className="bg-white border rounded">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-800">Section {si + 1}:</span>
                        <span className="text-sm text-gray-700">{sec.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveSectionIndex(activeSectionIndex === si ? null : si)}
                          className="px-3 py-1.5 text-sm border rounded text-gray-700 hover:bg-gray-50"
                        >
                          {activeSectionIndex === si ? "Collapse" : "Expand"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveSection(si)}
                          className="px-2 py-1.5 text-sm text-red-600 border rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* expanded area */}
                    {activeSectionIndex === si && (
                      <div className="p-4 border-t bg-gray-50">
                        <div className="mb-3 text-sm text-gray-700">
                          <span className="font-medium">Objective: </span>
                          <span>{sec.objective || <em className="text-gray-400">No objective provided</em>}</span>
                        </div>

                        <div>
                          <div className="space-y-2">
                            {sec.lectures.length === 0 ? (
                              <div className="text-sm text-gray-500 mb-2">No lectures yet.</div>
                            ) : (
                              sec.lectures.map((lec, li) => (
                                <div key={lec.id} className="flex items-center justify-between bg-white border rounded px-3 py-2">
                                  <div className="text-sm text-gray-700">{`Lecture ${li + 1}: ${lec.title}`}</div>
                                  <div>
                                    <button
                                      onClick={() => handleRemoveLecture(si, li)}
                                      className="text-sm text-red-600 px-2 py-1 rounded hover:bg-red-50"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* add lecture input */}
                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              value={lectureInputs[si] || ""}
                              onChange={(e) => setLectureInputs((l) => ({ ...l, [si]: e.target.value }))}
                              placeholder="Lecture title (e.g. Introduction)"
                              className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                              onClick={() => handleAddLecture(si)}
                              className="px-3 py-2 text-sm rounded border bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                              + Lecture
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Section area */}
          <div className="mt-4">
            {!addingSection ? (
              <button
                onClick={() => setAddingSection(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border rounded text-indigo-600 hover:bg-indigo-50"
              >
                + Section
              </button>
            ) : (
              <div className="mt-3 border rounded p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-gray-800">New Section</label>
                  <span className="text-sm text-gray-500">{titleCount}/80</span>
                </div>

                <input
                  type="text"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="Enter a Title"
                  className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                />

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    What will students be able to do at the end of this section?
                  </label>
                  <textarea
                    rows={3}
                    value={newSectionObjective}
                    onChange={(e) => setNewSectionObjective(e.target.value)}
                    placeholder="Enter a Learning Objective"
                    className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                  />
                  <div className="text-right text-xs text-gray-400 mt-1">{objectiveCount}/200</div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      resetNewSection();
                      setAddingSection(false);
                    }}
                    className="px-3 py-2 text-sm rounded border hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSection}
                    className="px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    aria-disabled={newSectionTitle.trim() === ""}
                  >
                    Add Section
                  </button>
                </div>

                {touched?.curriculum && newSectionTitle.trim() === "" && (
                  <p className="text-red-600 text-sm mt-2">Section title is required</p>
                )}
              </div>
            )}
          </div>

          {/* validation error for whole curriculum */}
          {showRequired && (
            <p className="text-red-600 text-sm mt-3">Your curriculum must include at least one section.</p>
          )}
        </div>

        {/* RIGHT - resource card */}
        <aside className="mt-8 md:mt-0 md:w-80">
          <div className="bg-white border rounded-lg shadow p-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                <rect x="2" y="3" width="14" height="11" rx="1.5" stroke="#7c3aed" strokeWidth="1.2" />
                <rect x="7" y="15" width="10" height="4" rx="1" stroke="#7c3aed" strokeWidth="1.2" />
              </svg>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Curriculum tools</h4>
            <p className="text-sm text-gray-600 mb-4">Use sections and short lectures to keep learners focused. Add practice activities where useful.</p>

            <a
              href="#"
              className="inline-block px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 text-sm font-medium"
            >
              Bulk Uploader
            </a>
          </div>

          <div className="mt-4 p-4 border rounded-lg text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-2">Quick links</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a href="#" className="text-indigo-600 underline">Course outline guide</a></li>
              <li><a href="#" className="text-indigo-600 underline">Practice activities</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Curriculum;
