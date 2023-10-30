import * as React from 'react';
import { CSVLink } from 'react-csv';

import { useState } from '../store/auth';
import { csvHeaders } from '../constants';

export default function Navbar() {
  const state = useState();
  const summaries = state?.app?.summaries?.summary;

  return (
    <div className="w-full bg-blue-600 h-12 flex items-center justify-between px-10 text-white">
      <h1>{state?.auth?.currentUser?.name}</h1>
      {summaries && summaries.length > 0 && (
        <CSVLink data={summaries} headers={csvHeaders}>
          Download
        </CSVLink>
      )}
    </div>
  );
}
