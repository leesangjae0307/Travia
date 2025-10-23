import React from 'react';
import ContentCard from './ContentCard.jsx'; // 👈 .jsx 확장자 명시
import { MOCK_CONTENT } from '../data/mockData.js'; // 👈 .js 확장자 명시

/**
 * 콘텐츠 목록 컴포넌트 (그리드 레이아웃 및 데이터 매핑 담당)
 * @param {object} user - 사용자 로그인 상태
 * @param {function} navigateTo - 페이지 이동 함수
 */
const ContentList = ({ user, navigateTo }) => {
    return (
        // Tailwind CSS 클래스를 사용하여 반응형 3열 그리드 레이아웃 설정
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CONTENT.map((content) => (
                <ContentCard 
                    key={content.id} 
                    content={content} 
                    user={user} 
                    navigateTo={navigateTo} 
                />
            ))}
        </div>
    );
};

export default ContentList;
