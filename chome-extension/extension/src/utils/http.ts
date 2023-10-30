import axios from 'axios';
import { URLS } from '../constants';

export const getSummaryOfSelectedText = async (
  selectedText: string,
  authToken: string,
  setSummaryOfSelectedText: Function
) => {
  try {
    const { data } = await axios.post(
      URLS.findAllSummaries,
      { text: selectedText.toString() },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    setSummaryOfSelectedText(data.summary);
  } catch (error) {
    return error;
  }
};
