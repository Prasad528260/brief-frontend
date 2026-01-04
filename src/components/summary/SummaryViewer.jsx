import SummaryOverview from "./SummaryOverview";
import SummaryTopics from "./SummaryTopics";
import SummaryHighlights from "./SummaryHighlights";

export default function SummaryViewer({ summary }) {
  if (!summary) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SummaryOverview overview={summary.summary.overview} />
      <SummaryTopics topics={summary.summary.topics} />
      <SummaryHighlights highlights={summary.summary.highlights} />
    </div>
  );
}
