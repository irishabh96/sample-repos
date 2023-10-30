import * as React from 'react';
import Navbar from '../components/Navbar';
import { useSelectedSummary, useSummaryList } from '../store/app';
import { useProfile } from '../store/auth';
import SelectedTextDetails from '../components/SelectedTextDetails';
import { getSummaryOfSelectedText } from '../utils/http';
import SummaryList from '../components/SummaryList';
import { captureSelectedText } from '../chrome/utils';

export default function Home() {
  const { selectedSummary, updateSelectedSummary } = useSelectedSummary();
  const [summaryOfSelectedText, setSummaryOfSelectedText] = React.useState<string>();
  const [selectedText, setSeletectedText] = React.useState<string>('');

  const { state: authState, profile } = useProfile();

  React.useEffect(() => {
    profile();
  }, []);

  const { loading, response: allSummaries, error } = useSummaryList();

  return (
    <>
      <Navbar />
      <div className="home m-5">
        <div className="flex flex-col">
          {/* selected text */}
          <SelectedTextDetails
            captureSelectedText={() => captureSelectedText(setSeletectedText)}
            getSummaryOfSelectedText={() =>
              getSummaryOfSelectedText(selectedText, authState.authToken, setSummaryOfSelectedText)
            }
            summary={summaryOfSelectedText}
            selectedText={selectedText}
          />
          {error && <p>Something went wrong</p>}
        </div>

        <div className="flex flex-col">
          <SummaryList
            updateSelectedSummary={updateSelectedSummary}
            loading={loading}
            summary={allSummaries.summary}
            summaries={selectedSummary}
          />
        </div>
      </div>
    </>
  );
}
