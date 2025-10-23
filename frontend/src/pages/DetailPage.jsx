import React from 'react';
import { StarIcon, PlaneIcon, UserIcon, LogInIcon } from '../assets/Icons.jsx'; // 아이콘 import
import { MOCK_CONTENT } from '../data/mockData.js'; // 데이터 import
import ContentCard from '../components/ContentCard.jsx'; // 재사용 콘텐츠 카드

/**
 * 상세 페이지 컴포넌트
 * @param {number} contentId - 현재 보고 있는 콘텐츠 ID
 * @param {function} navigateTo - 페이지 이동 함수
 * @param {object} user - 현재 사용자 정보
 */
const DetailPage = ({ contentId, navigateTo, user }) => {
    // 1. 현재 콘텐츠 데이터 조회
    const content = MOCK_CONTENT.find(c => c.id === contentId);

    if (!content) {
        return (
            <div className="p-8 text-center min-h-screen">
                <h1 className="text-3xl font-bold text-red-600 mb-4">콘텐츠를 찾을 수 없습니다.</h1>
                <button 
                    onClick={() => navigateTo('main')}
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    메인으로 돌아가기
                </button>
            </div>
        );
    }

    // 2. 관련 콘텐츠 (Mock: 현재 목록에서 제외)
    const relatedContent = MOCK_CONTENT.filter(c => c.id !== contentId).slice(0, 3);
    
    // 3. 예약 사이드바 로직
    const handleReservationClick = () => {
        if (user.isLoggedIn) {
            navigateTo('booking', content.id);
        } else {
            // 로그인 상태가 아니면 로그인 페이지로 이동 (예약 시 로그인 요구)
            navigateTo('login');
        }
    };

    // 4. 상세 페이지 목업 구조 렌더링
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto bg-gray-50">
            {/* 상단 제목 및 태그 */}
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    {content.title}
                </h1>
                <div className="flex items-center space-x-1 mt-1 text-yellow-500">
                    <StarIcon className="w-5 h-5" />
                    <span className="text-xl font-bold">{content.rating.toFixed(1)}</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* 왼쪽 메인 콘텐츠 영역 (70%) */}
                <div className="lg:w-2/3 space-y-8">
                    
                    {/* 메인 이미지 / 가이드 정보 */}
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                        {/* 메인 이미지 */}
                        <img 
                            src={content.imgUrl} 
                            alt={content.title} 
                            className="w-full h-96 object-cover" 
                        />
                        
                        {/* 가이드 정보 및 좋아요 */}
                        <div className="p-5 flex justify-between items-center border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={`https://placehold.co/40x40/6366F1/FFFFFF?text=${content.author[0]}`}
                                    alt={content.author}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">가이드: {content.author}님</p>
                                    <p className="text-sm text-gray-500">3시간 소요 | {content.price}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button className="p-2 rounded-full text-gray-500 hover:text-red-500 transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 01-6.364-6.364L12 7.636l-.318-.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </button>
                                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-500 transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM17.6 17.6l2.8-2.8M6.4 6.4l-2.8-2.8m11.2 0l-2.8 2.8m-5.6 11.2l-2.8 2.8m-4.5-4.5a10 10 0 0110-10m-10 10a10 10 0 0010 10m-4.5-4.5l-2.8-2.8m-2.8 2.8l2.8-2.8"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* 콘텐츠 상세 설명 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">가이드 소개 및 핵심 코스</h2>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {/* 목업 텍스트를 대체하는 더미 데이터 */}
                            안녕하세요! {content.author} 가이드입니다. 이 투어는 {content.location}의 숨겨진 보석 같은 장소들을 연결하고, AI 태그인 '#{content.tags.join(' #')}'와 같은 테마를 중심으로 구성되었습니다.
                            <br/><br/>
                            부산역 3분 거리에 위치한 복합 친수 공간인 복천 박물관과 연결된 복천 진수 공원에서 바다 위 인생샷을 남겨 보세요! 낮에는 따뜻한 햇살 아래에서 걷기 좋은 곳을 추천해 드려요. 특히 야경 시점에서는 블루리본 2연속 관안대교의 멋진 뷰를 자랑합니다. 해변열차를 타고 바다를 배경으로 찍는 멋진 인생샷은 필수 코스입니다.
                            <br/><br/>
                            <span className="font-semibold text-indigo-600">#부산여행 #야경명소 #해변열차 #인생샷포인트</span>
                        </div>
                    </div>
                    
                    {/* 리뷰 섹션 (내리면 리뷰 나온다는 요청 반영) */}
                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">사용자 리뷰 (총 124개)</h2>
                        <div className="space-y-6">
                            {/* Mock Review 1 */}
                            <div className="border p-4 rounded-lg bg-gray-50">
                                <div className="flex items-center space-x-2 mb-2">
                                    <UserIcon className="w-6 h-6 text-indigo-500" />
                                    <span className="font-semibold">여행자A</span>
                                </div>
                                <p className="text-gray-700">AI 추천 태그 덕분에 원하는 '야경' 테마 여행지를 쉽게 찾았습니다. 가이드님도 친절하고 코스도 완벽했어요!</p>
                            </div>
                            {/* Mock Review 2 */}
                            <div className="border p-4 rounded-lg bg-gray-50">
                                <div className="flex items-center space-x-2 mb-2">
                                    <UserIcon className="w-6 h-6 text-indigo-500" />
                                    <span className="font-semibold">힐링러B</span>
                                </div>
                                <p className="text-gray-700">혼자 여행 와서 불안했는데, 상세 페이지 설명이 친절해서 좋았습니다. 다음에 또 이용할게요.</p>
                            </div>
                        </div>
                        {/* 더미 리뷰 끝 */}
                    </div>
                </div>
                
                {/* 오른쪽 예약 사이드바 영역 (30%) */}
                <div className="lg:w-1/3 space-y-6 sticky top-20">
                    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-emerald-500">
                        
                        {/* 예약 가능 알림 (Mockup 반영) */}
                        <div className="p-3 mb-4 bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-lg text-sm flex items-start space-x-2">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856a2 2 0 001.995-1.859L21 4.75a2 2 0 00-1.995-2.25H4.995A2 2 0 003 4.75v14.491A2 2 0 004.995 21z"></path></svg>
                            <span>현재 잔여 티켓이 충분합니다.</span>
                        </div>
                        
                        <p className="text-2xl font-bold text-gray-900 mb-4">{content.price}</p>
                        
                        {/* 날짜 선택 (Mockup 반영) */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="p-3 border border-gray-300 rounded-lg text-center text-sm">
                                <p className="text-gray-500">체크인</p>
                                <p className="font-semibold">2025. 12. 12.</p>
                            </div>
                            <div className="p-3 border border-gray-300 rounded-lg text-center text-sm">
                                <p className="text-gray-500">체크아웃</p>
                                <p className="font-semibold">2025. 12. 14.</p>
                            </div>
                        </div>
                        
                        {/* 예약 버튼 (로그인 상태 확인) */}
                        <button
                            onClick={handleReservationClick}
                            className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 
                                ${user.isLoggedIn ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-500 hover:bg-red-600'}`}
                        >
                            {user.isLoggedIn ? '예약하기' : <div className='flex items-center justify-center'><LogInIcon className='w-5 h-5 mr-2'/> 로그인 후 예약</div>}
                        </button>
                        
                        {/* 가이드 정보 및 문의 버튼 */}
                        <p className="mt-4 text-center text-sm text-gray-500">
                            {content.author} 가이드에게 문의하려면 로그인 후 이용해주세요.
                        </p>
                    </div>
                    
                    {/* 관련 콘텐츠 (내리면 다른 콘텐츠 나온다는 요청 반영) */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">관련 추천 콘텐츠</h3>
                        <div className="space-y-4">
                            {relatedContent.map(rc => (
                                <div key={rc.id} 
                                     onClick={() => navigateTo('detail', rc.id)}
                                     className="flex p-3 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition">
                                    <img src={rc.imgUrl} alt={rc.title} className="w-16 h-16 object-cover rounded mr-3"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 line-clamp-2">{rc.title}</p>
                                        <div className="flex items-center text-xs text-gray-500 space-x-1">
                                            <StarIcon className="w-3 h-3"/>
                                            <span>{rc.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
