import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '../assets/Icons'; // 아이콘 경로는 가정된 경로입니다.

// [추가] 백엔드 API 주소
const API_BASE_URL = 'http://localhost:8000';

/**
 * BookingBox 컴포넌트: 상세 페이지 우측에 위치하는 예약/액션 박스
 * [수정] 예약 API 호출 기능 추가
 * @param {string | number} contentId - 상세 콘텐츠 ID
 * @param {function} navigateTo - 페이지 이동 함수
 * @param {object} user - 사용자 정보 (로그인 상태 확인용)
 */
const BookingBox = ({ contentId, navigateTo, user }) => {
    // 예약 날짜 선택 (주의: 현재 문자열, 실제로는 Date 객체나 ISO 문자열 필요)
    const [startDate, setStartDate] = useState('2025-12-12'); // YYYY-MM-DD 형식으로 변경 (임시)
    // const [endDate, setEndDate] = useState('2025-12-14'); // endDate는 현재 사용 안 함
    const [pax, setPax] = useState(1); // 인원수

    const isAvailable = true; // 투어 가능 여부 (목업)

    // [추가] 예약 API 호출 상태
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');
    const [bookingError, setBookingError] = useState('');

    // [수정] 예약 버튼 클릭 핸들러 (API 호출)
    const handleReservation = async () => {
        setBookingMessage('');
        setBookingError('');

        if (!user.isLoggedIn) {
            // 로그인 필요 시 로그인 페이지로 이동
            navigateTo('login');
            return; // 함수 종료
        }

        // --- 로그인 상태일 경우 예약 API 호출 ---
        setBookingLoading(true);
        try {
            // 1. localStorage 등에서 JWT 토큰 가져오기 (키 이름은 실제 구현에 맞게)
            const token = localStorage.getItem('authToken');
            if (!token) {
                setBookingError('로그인 토큰이 없습니다. 다시 로그인해주세요.');
                navigateTo('login'); // 토큰 없으면 로그인 페이지로
                return;
            }

            // 2. API 요청 데이터 준비 (schemas.py의 BookingCreateRequest 참고)
            // !!! 중요: startDate를 실제 datetime 형식으로 변환 필요 !!!
            // 임시로 시간(T09:00:00)을 붙여 ISO 8601 형식으로 만듦
            const bookingDateISO = `${startDate}T09:00:00`; 

            const bookingPayload = {
                content_id: parseInt(contentId, 10), // contentId를 숫자로 변환
                booking_date: bookingDateISO,      // ISO 8601 형식 날짜/시간
                personnel: pax,                   // 인원수
            };

            // 3. 백엔드 API 호출 (POST /bookings)
            const response = await fetch(`${API_BASE_URL}/bookings/`, { // 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // JWT 토큰을 Authorization 헤더에 포함
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingPayload),
            });

            const result = await response.json();

            if (response.ok) {
                // 4. 예약 성공 처리
                setBookingMessage(`예약 성공! 예약 ID: ${result.booking_id} (${result.status})`);
                // TODO: 예약 완료 후 추가 작업 (예: 예약 내역 페이지 이동 등)
            } else {
                // 5. 예약 실패 처리 (4xx, 5xx 에러)
                setBookingError(result.detail || `예약 실패 (상태: ${response.status})`);
            }

        } catch (error) {
            // 6. 네트워크 오류 등 fetch 자체 실패 처리
            console.error('Booking request failed:', error);
            setBookingError('예약 요청 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요.');
        } finally {
            setBookingLoading(false); // 로딩 상태 해제
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 space-y-5 border border-gray-100">
            {/* 상단 주의사항 / 예약 가능 여부 */}
            <div className={`p-4 rounded-lg text-sm font-medium ${isAvailable ? 'bg-indigo-50 text-indigo-700' : 'bg-red-50 text-red-700'}`}>
                {/* ... (내용 동일) ... */}
            </div>

            {/* 날짜 및 인원 선택 영역 */}
            <div className="space-y-4">
                {/* 날짜 선택 (목업 - 실제로는 DatePicker 필요) */}
                <div className="grid grid-cols-1 gap-3 border border-gray-300 rounded-lg p-3"> 
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">예약 날짜</label>
                        {/* !!! 중요: 실제 구현 시 <input type="date"> 또는 React Date Picker 라이브러리 사용 !!! 
                          onChange={(e) => setStartDate(e.target.value)} // YYYY-MM-DD 형식으로 받음
                        */}
                        <input
                            type="text" // 
                            value={startDate} // 
                            onChange={(e) => setStartDate(e.target.value)} // 
                            className="w-full text-lg font-bold focus:outline-none cursor-pointer"
                        />
                    </div>
                    {/* <div className="pl-3"> ... endDate input ... </div> */}
                </div>

                {/* 인원 선택 */}
                <div className="border border-gray-300 rounded-lg p-3 flex justify-between items-center">
                    {/* ... (인원 조절 UI 동일) ... */}
                    <span className="text-lg font-bold">인원 {pax}명</span>
                    <div className="flex items-center space-x-2">
                         <button
                             onClick={() => setPax(p => Math.max(1, p - 1))}
                             disabled={pax <= 1 || bookingLoading} // 로딩 중 비활성화
                             className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 transition"
                         >
                             <MinusIcon className="w-5 h-5 text-gray-600" />
                         </button>
                         <span className="w-6 text-center text-lg font-semibold">{pax}</span>
                         <button
                             onClick={() => setPax(p => p + 1)}
                             disabled={bookingLoading} // 로딩 중 비활성화
                             className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                         >
                             <PlusIcon className="w-5 h-5 text-gray-600" />
                         </button>
                     </div>
                </div>
            </div>

            {/* [추가] 예약 결과 메시지 표시 */}
            {bookingMessage && (
                <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg text-center font-medium">
                    {bookingMessage}
                </div>
            )}
            {bookingError && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
                    {bookingError}
                </div>
            )}

            {/* 예약 버튼 */}
            <button
                onClick={handleReservation}
                disabled={bookingLoading || !isAvailable} // 로딩 중 또는 예약 불가 시 비활성화
                className="w-full py-3 bg-indigo-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {/* [수정] 로딩 상태 표시 */}
                {bookingLoading ? '예약 처리 중...' : (user.isLoggedIn ? '예약하기' : '로그인 후 예약하기')}
            </button>

            {/* 결제 정보 (목업) */}
            <div className="pt-2 border-t border-gray-200 text-right">
                {/* ... (내용 동일) ... */}
            </div>
        </div>
    );
};

export default BookingBox;