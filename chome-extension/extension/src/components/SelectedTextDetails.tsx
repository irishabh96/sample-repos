import * as React from 'react';

interface NavbarProps {
  selectedText?: string;
  summary?: { text: string; summary: string };
  getSummaryOfSelectedText: () => void;
  captureSelectedText: () => void;
}

export default function SelectedTextDetails(props: NavbarProps) {
  return (
    <div>
      <div className="items-start">
        <button
          onClick={props.captureSelectedText}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        >
          Find Text
        </button>
      </div>

      {props.selectedText && (
        <div className="mt-2 w-full">
          <div className="w-full p-2 bg-white border border-gray-200 rounded-md shadow">
            <p className="mb-3 font-semibold text-blue-500 bold">
              Selected Text: <span className="font-semibold text-gray-500">{props.selectedText}</span>
            </p>

            {props.summary?.summary && (
              <>
                <p className="mb-1 font-semibold text-blue-500 bold">Summary:</p>
                <p className="mb-3 font-semibold text-gray-500">{props.summary?.summary}</p>
              </>
            )}

            <button
              onClick={props.getSummaryOfSelectedText}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
            >
              Find More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
