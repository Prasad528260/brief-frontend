import SummaryOverview from "./SummaryOverview";
import SummaryTopics from "./SummaryTopics";
import SummaryHighlights from "./SummaryHighlights";
import { useSelector } from "react-redux";
import TokenLimitMessage from "../summary/TokenLimitMessage";

export default function SummaryViewer({ summary }) {
  if (!summary) return null;
  const user = useSelector((state) => state.user);
  if (user?.token <= 0) {
    return <TokenLimitMessage />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SummaryOverview overview={summary.summary.overview} />
      <SummaryTopics topics={summary.summary.topics} />
      <SummaryHighlights highlights={summary.summary.highlights} />
    </div>
  );
}
