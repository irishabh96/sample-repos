import * as React from 'react';
import SummaryDetails from './SummaryDetails';

interface SummaryListProps {
  loading: Boolean;
  summary: Array<any>;
  updateSelectedSummary: Function;
  summaries: any;
}

export default function SummaryList(props: SummaryListProps) {
  return (
    <>
      {!props.loading && props.summary?.length > 0 ? (
        props.summary.map((item: any, i: any) => (
          <React.Fragment key={i}>
            <div
              className="border mt-2 p-2 bordered rounded-md shadow-md cursor-pointer hover:bg-gray-300"
              onClick={() => props.updateSelectedSummary(item)}
            >
              <h1 className="text-blue-500 font-semibold">{item?.text}</h1>
            </div>
            {props.summaries.selectedSummary?.id === item.id && <SummaryDetails summaries={props.summaries} />}
          </React.Fragment>
        ))
      ) : (
        <p className="mb-3 font-normal text-gray-700">You don't have any collections. </p>
      )}
    </>
  );
}
