import React, { useState } from 'react';
import { LogInIcon } from '../assets/Icons'; // 👈 .jsx 확장자를 제거하여 수정

/**
 * 로그인 페이지 (예약 시 요구됨)
 * @param {function} login - 전역 사용자 상태를 업데이트하는 함수
 * @param {function} navigateTo - 페이지 이동 함수
 */
const LoginPage = ({ login, navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // NOTE: 실제 구현 시 이 함수는 FastAPI의 /auth/login 엔드포인트를 호출하도록 변경됩니다.
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // --- Mock Authentication Logic ---
    // 백엔드 연결 전까지는 이 목업 로직으로 로그인 성공을 시뮬레이션합니다.
    if (email === 'user@travia.com' && password === '1234') {
      // 실제 API 호출 시에는 받은 username을 사용합니다.
      const mockUsername = "TraviaUser"; 
      login(mockUsername); 
      navigateTo('main'); // 로그인 성공 시 메인으로 이동
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다. (테스트 ID: user@travia.com / 1234)');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6 border-t-4 border-indigo-500">
        <h2 className="text-2xl font-bold text-gray-900 text-center flex items-center justify-center space-x-2">
            <LogInIcon className="w-6 h-6 text-indigo-500" />
            <span>Travia 로그인</span>
        </h2>
        <p className="text-center text-gray-500">
            예약, 리뷰 등 핵심 기능을 이용하려면 로그인해주세요.
        </p>

        {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium border border-red-300">
                {error}
            </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="user@travia.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="1234"
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
        >
            <LogInIcon className="w-5 h-5" />
            <span>로그인</span>
        </button>

        <button 
            type="button" 
            onClick={() => navigateTo('main')}
            className="w-full text-sm text-gray-500 hover:text-indigo-600 mt-4 transition duration-200"
        >
            메인 페이지로 돌아가기 (로그인 없이)
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
