import React from 'react';
import ContentList from '../components/ContentList'; // 👈 .jsx 확장자를 제거하여 수정

/**
 * 메인 콘텐츠 페이지 (로그인 없이 접근 가능)
 * @param {object} user - 현재 사용자 정보 (isLoggedIn, username)
 * @param {function} navigateTo - 페이지 이동 함수
 */
const MainPage = ({ user, navigateTo }) => {
    // 임시 카테고리/태그 목록 (목업 반영)
    const mockCategories = ["전체", "서울", "부산", "대구", "대전", "광주", "경주", "제주", "힐링"];

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
            
            {/* 상단 검색 및 필터 영역 (목업 디자인 반영) */}
            <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
                {/* 검색창 */}
                <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500 transition duration-200">
                    <input
                        type="search"
                        placeholder="여행지를 검색하세요..."
                        className="w-full text-lg p-1 focus:outline-none"
                    />
                    <button className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition duration-200">
                        {/* 검색 아이콘 (인라인 SVG) */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
                
                {/* 카테고리/태그 필터 */}
                <div className="flex flex-wrap gap-2 text-sm">
                    {mockCategories.map((cat, index) => (
                        <button
                            key={cat}
                            className={`px-3 py-1.5 rounded-full transition duration-150 ${
                                index === 2 // '부산'을 활성화된 상태로 가정
                                ? 'bg-indigo-600 text-white font-semibold shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 pt-4">
                추천 콘텐츠 ({user.isLoggedIn ? user.username : '게스트'})
            </h1>

            {/* ContentList 컴포넌트를 사용하여 콘텐츠 목록을 렌더링 */}
            <ContentList user={user} navigateTo={navigateTo} />
        </div>
    );
};

export default MainPage;
