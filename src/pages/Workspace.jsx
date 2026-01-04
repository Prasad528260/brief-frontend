import SummarySidebar from "../components/sidebar/SummarySidebar";
import UploadBox from "../components/upload/UploadBox";
import { useState, useEffect } from "react";
import { useSummary } from "../hooks/useSummary";
import SummaryViewer from "../components/summary/SummaryViewer";
import Processing from "../components/processing/Processing";
import axiosInstance from "../utils/axiosinstance";

export default function Workspace() {
  const { summaries, fetchSummaries } = useSummary();

  const [currentSummary, setCurrentSummary] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchSummaries();
  }, []);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") setSelectedFile(file);
    else alert("Please select a .txt file");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }

    setIsProcessing(true);
    setCurrentSummary(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // same as Postman
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);

      const res = await axiosInstance.post("/summary/file-upload", formData);
      // console.log("Upload response:", res?.data);
      let summary = res?.data?.data;
      // console.log("Summary object:", summary);
      setCurrentSummary(summary);
      // console.log("Current summary:", currentSummary);
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err?.response?.data?.message || "Upload failed");
    } finally {
      setIsProcessing(false);
      setSelectedFile(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") setSelectedFile(file);
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      <div className={`${isSidebarOpen ? "w-64" : "w-0"} ...`}>
        <SummarySidebar
          summaries={summaries}
          isOpen={isSidebarOpen}
          onSelect={setCurrentSummary}
          onNew={() => setCurrentSummary(null)}
        />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Top Bar stays same */}

        <div className="flex-1 overflow-y-auto p-6">
          {!currentSummary && !isProcessing && (
            <>
              <div className="flex gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-zinc-900 text-white border border-zinc-700 rounded px-3 py-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-zinc-900 text-white border border-zinc-700 rounded px-3 py-2"
                  />
                </div>
              </div>
              <UploadBox
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                onUpload={handleUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              />
            </>
          )}

          {isProcessing && <Processing />}

          {currentSummary && <SummaryViewer summary={currentSummary} />}
        </div>
      </div>
    </div>
  );
}
