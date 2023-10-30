export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url);
    });
};

export const getAuthTokenFromLocalStorage = (callback: (text?: string) => void) => {
  if (process.env.NODE_ENV === 'development') {
    const token = localStorage.getItem('authToken');
    callback(token!);
  } else {
    chrome.storage.local.get(['authToken'], function (items) {
      callback(JSON.stringify(items));
    });
  }
};

export const setAuthTokenLocalStorage = (token: string) => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('authToken', token);
  } else {
    chrome.storage.local.set({ authToken: token });
  }
};

export const captureSelectedText = (setSeletectedText: Function) => {
  if (process.env.NODE_ENV === 'development') {
    setSeletectedText(window.getSelection().toString().trim());
  } else {
    chrome.tabs.executeScript({ code: 'window.getSelection().toString().trim();' }, (selection) => {
      setSeletectedText(selection);
    });
  }
};
