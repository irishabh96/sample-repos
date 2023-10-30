import * as React from 'react';
import useInput from '../hooks/useInput';
import { useAppState, useAuthenticate } from '../store/auth';

export default function Login() {
  const email = useInput('');
  const name = useInput('');
  const password = useInput('');

  useAppState();
  const { login, loading, error } = useAuthenticate();

  const handleSubmit = (e: React.FormEvent) => {
    login(e, { name: name.value, email: email.value, password: password.value });
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1 className="mb-5 font-semibold text-xl">Login to your account</h1>

      <h1>{error && 'Something went wrong'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="border flex flex-col p-4 w-80">
          <input type="text" className="border p-3 rounded mb-3" placeholder="name" {...name} />
          <input type="text" className="border p-3 rounded mb-3" placeholder="email" {...email} />
          <input type="password" className="border p-3 rounded mb-3" placeholder="password" {...password} />
          <button type="submit" className="bg-blue-600 p-3 rounded text-white" disabled={loading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
