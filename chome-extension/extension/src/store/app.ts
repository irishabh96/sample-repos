import { URLS } from '../constants';
import useFetchData from '../hooks/useFetchData';
import Store from './index';

export const initialState = {
  // Set the initial status of the application
  selectedSummary: {},
  summaries: [],
  selectedText: '',
  selectedTextSummary: '',
};

export function useSummaryList() {
  const [{ app, auth }, setStore] = Store.useStore();
  const { loading, error, response } = useFetchData(URLS.findAllSummaries, 'GET', null, auth.authToken);

  setStore((state: any) => {
    state.app.summaries = response;
  });
  return {
    loading,
    error,
    response,
    app,
  };
}

export function useSelectedSummary() {
  const [{ app }, setStore] = Store.useStore();
  const updateSelectedSummary = (summary: object) => {
    setStore((state: any) => {
      state.app.selectedSummary = summary;
    });
  };
  return {
    updateSelectedSummary,
    selectedSummary: app,
  };
}

export function useSelectedText(text: string) {
  const [{ app }, setStore] = Store.useStore();
  setStore((state: any) => {
    state.app.selectedText = text;
  });
  return {
    app,
  };
}
