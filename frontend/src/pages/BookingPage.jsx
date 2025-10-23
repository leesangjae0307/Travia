import React from 'react';
import { PlaneIcon } from '../assets/Icons.jsx'; // 아이콘 import
import { MOCK_CONTENT } from '../data/mockData.js'; // 데이터 import

/**
 * 예약 페이지 (로그인 필요)
 * @param {number} contentId - 예약할 콘텐츠 ID
 * @param {function} navigateTo - 페이지 이동 함수
 */
const BookingPage = ({ contentId, navigateTo }) => {
    // contentId를 사용하여 목업 데이터에서 상품 정보를 찾습니다.
    const content = MOCK_CONTENT.find(c => c.id === contentId);
    
    // NOTE: 코드에는 alert()이 포함되어 있지만, 실제 서비스에서는 사용자 지정 모달로 대체되어야 합니다.
    
    if (!content) {
        return (
            <div className="p-8 text-center text-red-500 bg-white rounded-xl shadow-lg m-10 max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-3">오류 발생</h2>
                <p>잘못된 콘텐츠 ID이거나 상품 정보를 찾을 수 없습니다.</p>
                <button 
                    onClick={() => navigateTo('main')}
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                    메인으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl mt-10">
            <h2 className="text-3xl font-bold text-emerald-600 mb-4 flex items-center space-x-2">
                <PlaneIcon className="w-6 h-6" />
                <span>예약 확인</span>
            </h2>
            <p className="text-gray-700 mb-6">
                선택하신 **"{content.title}"** 상품의 최종 예약을 진행합니다.
            </p>

            {/* 상품 요약 정보 */}
            <div className="border border-gray-200 p-4 rounded-lg space-y-2 bg-gray-50">
                <p className="text-sm text-gray-500">상품 정보</p>
                <p className="text-xl font-semibold">{content.title}</p>
                <p className="text-lg text-emerald-600 font-bold">{content.price}</p>
                <p className="text-sm text-gray-500">
                  태그: {content.tags.map(t => `#${t}`).join(', ')}
                </p>
            </div>
            
            {/* 예약 입력 필드 및 버튼 */}
            <div className="mt-6 space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">예약 날짜</label>
                    <input 
                        type="date" 
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">예약 인원</label>
                    <input 
                        type="number" 
                        defaultValue={1} 
                        min={1} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                
                <button
                    onClick={() => {
                        // 사용자에게 확인을 받는 모달 UI로 대체 필요 (alert 대신)
                        alert(`[예약 완료 목업] ${content.title} 상품 예약이 완료되었습니다!`);
                        navigateTo('main');
                    }}
                    className="w-full py-3 px-4 rounded-lg text-white font-bold bg-emerald-600 hover:bg-emerald-700 transition duration-200 shadow-lg"
                >
                    최종 예약 확정
                </button>
                <button
                    onClick={() => navigateTo('main')}
                    className="w-full py-2 text-sm text-gray-500 hover:text-indigo-600 transition duration-200"
                >
                    취소하고 메인으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default BookingPage;
