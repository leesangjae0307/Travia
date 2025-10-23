import React, { useState } from 'react';
// 페이지 컴포넌트 import (확장자 명시)
import MainPage from './pages/MainPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
// 상세 페이지 컴포넌트 import 추가
import DetailPage from './pages/DetailPage.jsx'; 
// 아이콘 import (확장자 명시)
import { UserIcon, LogInIcon } from './assets/Icons.jsx'; 
import './index.css'; // 글로벌 CSS import (확장자 명시)

/**
 * 메인 App 컴포넌트: 전역 상태 관리 및 라우팅 담당
 */
const App = () => {
  // 사용자 상태 관리 (로그인 여부, 사용자명)
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: 'Guest',
  });
  
  // 페이지 라우팅 상태 (main, login, booking, detail)
  const [currentPage, setCurrentPage] = useState('main');
  const [currentContentId, setCurrentContentId] = useState(null);

  // 로그인 처리 함수
  const handleLogin = (username) => {
    setUser({ isLoggedIn: true, username: username });
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setUser({ isLoggedIn: false, username: 'Guest' });
    setCurrentPage('main');
  };
  
  /**
   * 페이지 이동 함수 (라우팅 역할)
   * Detail 페이지 추가 로직 반영
   */
  const navigateTo = (page, contentId = null) => {
    if (page === 'booking' && !user.isLoggedIn) {
        // 예약은 반드시 로그인 필요
        setCurrentPage('login');
    } else {
        setCurrentPage(page);
        setCurrentContentId(contentId);
    }
  };


  // 현재 페이지 컴포넌트를 렌더링하는 함수
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage login={handleLogin} navigateTo={navigateTo} />;
      case 'booking':
        return <BookingPage contentId={currentContentId} navigateTo={navigateTo} />;
      case 'detail':
        // 상세 페이지 렌더링 로직 추가
        return <DetailPage 
                  contentId={currentContentId} 
                  navigateTo={navigateTo} 
                  user={user} // DetailPage에 user 상태 전달
               />;
      case 'main':
      default:
        return <MainPage user={user} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* 로고/타이틀 */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-extrabold text-indigo-600 cursor-pointer" onClick={() => navigateTo('main')}>
                BUSAN DIGITAL ACADEMY
              </span>
              <span className="text-2xl font-extrabold text-gray-800 cursor-pointer" onClick={() => navigateTo('main')}>
                Travia AI
              </span>
            </div>
            {/* 우측 사용자 인터페이스 */}
            <div className="flex items-center space-x-4">
                {/* 임시 아이콘 */}
                <svg className="w-6 h-6 text-gray-500 hover:text-indigo-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                <svg className="w-6 h-6 text-gray-500 hover:text-indigo-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2a4 4 0 004 4h4a2 2 0 002-2v-4M9 17h-2a4 4 0 01-4-4V7a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>

              {user.isLoggedIn ? (
                // 로그인 상태
                <>
                  <button
                    onClick={handleLogout}
                    className="w-8 h-8 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-200 flex items-center justify-center text-sm font-semibold"
                    title={`${user.username}님 로그아웃`}
                  >
                    {user.username[0]}
                  </button>
                </>
              ) : (
                // 로그아웃 상태
                <button
                  onClick={() => navigateTo('login')}
                  className="w-8 h-8 rounded-full bg-indigo-500 hover:bg-indigo-600 transition duration-200 flex items-center justify-center"
                  title="로그인/가입"
                >
                    <UserIcon className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* 페이지 내용 렌더링 */}
      <main className="max-w-7xl mx-auto">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="mt-10 p-4 text-center text-gray-500 text-sm border-t border-gray-200">
        © 2025 Travia AI Platform. AI와 데이터로 만드는 개인화 여행.
      </footer>
    </div>
  );
};

export default App;
