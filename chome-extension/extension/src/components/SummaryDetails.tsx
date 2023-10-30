import React from 'react';

interface SummaryDetailsProps {
  summaries: any;
}

export default function SummaryDetails(props: SummaryDetailsProps) {
  return (
    <div className="border m-2 rounded-md p-5 h-full shadow-md">
      <h3 className="mb-2 text-blue-500">{props.summaries.selectedSummary?.text}</h3>
      <h5 className="text-sm text-gray-700">{props.summaries.selectedSummary?.summary}</h5>
    </div>
  );
}
