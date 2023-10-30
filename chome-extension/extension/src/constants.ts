export const URLS = {
  findAllSummaries: 'http://localhost:3000/api/v1/summary',
  register: 'http://localhost:3000/api/v1/auth/register',
  profile: 'http://localhost:3000/api/v1/auth/me',
};

export const csvHeaders = [
  { label: 'id', key: 'id' },
  { label: 'Text', key: 'text' },
  { label: 'Summary', key: 'summary' },
  { label: 'Created At', key: 'createdAt' },
];
