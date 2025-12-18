import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { login, selectAuth } from '../store/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, status, error } = useSelector(selectAuth);

  const next = new URLSearchParams(location.search).get('next') || '/admin';

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');

  useEffect(() => {
    if (token) {
      navigate(next, { replace: true });
    }
  }, [token, next, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ username, password }));
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-10">
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Sign In</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              className="w-full border border-gray-300 rounded p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error ? <div className="text-red-600 text-sm">{error}</div> : null}

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold rounded py-2 disabled:opacity-60"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="text-xs text-gray-600">
            Default admin: <span className="font-mono">admin</span> / <span className="font-mono">Admin@123</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
