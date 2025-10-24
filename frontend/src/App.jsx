import React, { useState } from 'react';
// 페이지 컴파일 오류 수정: App.jsx 위치 기준으로 상대 경로 수정
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
// 아이콘 컴파일 오류 수정: App.jsx 위치 기준으로 상대 경로 수정
import { UserIcon } from './assets/Icons.jsx';
// CSS import 수정: App.jsx 위치 기준으로 상대 경로 수정
import './index.css';

/**
 * 메인 App 컴포넌트: 전역 상태 관리 및 라우팅 담당 (커스텀 라우팅 구현)
 */
const App = () => {
    // Add a log to confirm rendering
    console.log("--- App component is rendering ---");

    // 사용자 상태 관리 (로그인 여부, 사용자명)
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: 'Guest',
    });

    // 페이지 라우팅 상태 (main, login, booking, detail)
    const [currentPage, setCurrentPage] = useState('main');
    const [currentContentId, setCurrentContentId] = useState(null);

    // 로그인 처리 함수 (LoginPage에서 호출)
    const handleLogin = (username) => {
        console.log("handleLogin called, setting user state to logged in with username:", username); // Add log here
        setUser({ isLoggedIn: true, username: username });
        // TODO: Store JWT token in localStorage
        // localStorage.setItem('authToken', result.access_token);
        navigateTo('main'); // 로그인 성공 후 메인 페이지로 이동
    };

    // 로그아웃 처리 함수
    const handleLogout = () => {
        console.log("handleLogout called, setting user state to logged out"); // Add log here
        setUser({ isLoggedIn: false, username: 'Guest' });
        // Clear JWT token from localStorage
        localStorage.removeItem('authToken'); // JWT 토큰 제거 추가
        setCurrentPage('main');
    };

    /**
     * 페이지 이동 함수 (라우팅 역할)
     */
    const navigateTo = (page, contentId = null) => {
        // Log navigation attempt and current user state
        console.log(`Navigating to '${page}', contentId: ${contentId}, current user state:`, user);

        // Check login requirement *before* changing page state
        if (page === 'booking' && !user.isLoggedIn) {
            console.log("Booking requires login, redirecting to login page.");
            // Store intended destination before redirecting (Optional)
            // sessionStorage.setItem('intendedBookingId', contentId);
            setCurrentPage('login');
        } else {
            setCurrentPage(page);
            setCurrentContentId(contentId); // 상세/예약 페이지 이동 시 ID 설정
        }
    };

    // Log user state before rendering page content
    console.log("App component user state before renderPage:", user);

    // 현재 페이지 컴포넌트를 렌더링하는 함수
    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                // Pass the handleLogin function as the 'login' prop
                return <LoginPage login={handleLogin} navigateTo={navigateTo} />;
            case 'booking':
                // BookingPage needs contentId
                // Note: Consider if BookingPage also needs the user object
                return <BookingPage contentId={currentContentId} navigateTo={navigateTo} user={user} />;
            case 'detail':
                // DetailPage needs contentId, navigateTo, and the current user state
                return <DetailPage
                    contentId={currentContentId}
                    navigateTo={navigateTo}
                    user={user} // Pass the user state as a prop
                />;
            case 'main':
            default:
                // MainPage needs user state and navigateTo
                return <MainPage user={user} navigateTo={navigateTo} />;
        }
    };

    // Add useEffect to check for token on initial load (Optional but good practice)
    /*
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // TODO: Decode token to get username/expiry if needed
            // For now, just assume logged in if token exists
            // You might want to verify the token with the backend here
            console.log("Found auth token on load, setting user as logged in.");
            // Extract username from token or fetch user details
            const decodedToken = {}; // Replace with actual decoding logic if needed
            setUser({ isLoggedIn: true, username: decodedToken.username || 'User' });
        }
    }, []); // Empty dependency array means run only once on mount
    */


    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased">
            {/* 네비게이션 바 (Tailwind CSS) */}
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
                            {/* 임시 아이콘 (Placeholder) */}
                            <svg className="w-6 h-6 text-gray-500 hover:text-indigo-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            <svg className="w-6 h-6 text-gray-500 hover:text-indigo-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2a4 4 0 004 4h4a2 2 0 002-2v-4M9 17h-2a4 4 0 01-4-4V7a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>

                            {user.isLoggedIn ? (
                                // 로그인 상태 (첫 글자 프로필 아이콘)
                                <>
                                    <span className="text-gray-700 text-sm font-medium hidden sm:inline">{user.username}님</span>
                                    <button
                                        onClick={handleLogout}
                                        className="w-8 h-8 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-200 flex items-center justify-center text-sm font-semibold shadow-md"
                                        title={`${user.username}님 로그아웃`}
                                    >
                                        {/* Ensure username exists before accessing index 0 */}
                                        {user.username ? user.username[0].toUpperCase() : '?'}
                                    </button>
                                </>
                            ) : (
                                // 로그아웃 상태 (로그인 버튼)
                                <button
                                    onClick={() => navigateTo('login')}
                                    className="w-8 h-8 rounded-full bg-indigo-500 hover:bg-indigo-600 transition duration-200 flex items-center justify-center shadow-md"
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
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {renderPage()}
            </main>

            {/* Footer */}
            <footer className="mt-10 p-4 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
                © 2025 Travia AI Platform. AI와 데이터로 만드는 개인화 여행.
            </footer>
        </div>
    );
};

export default App;

