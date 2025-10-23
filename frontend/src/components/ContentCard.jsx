import React from 'react';
import { StarIcon } from '../assets/Icons.jsx'; // 아이콘 import
import styles from './ContentCard.module.css'; // CSS 모듈 import

/**
 * 개별 콘텐츠 카드 컴포넌트 (디자인 및 클릭 로직 포함)
 * @param {object} content - 콘텐츠 데이터
 * @param {object} user - 현재 사용자 상태
 * @param {function} navigateTo - 페이지 이동 함수
 */
const ContentCard = ({ content, user, navigateTo }) => {
    return (
        <div
            className={styles.card}
            // 클릭 시 로그인 상태와 관계없이 무조건 상세 페이지로 이동
            onClick={() => navigateTo('detail', content.id)} 
        >
            {/* 이미지 영역 */}
            <div className={styles.imageContainer}>
                <img 
                    src={content.imgUrl} 
                    alt={content.title} 
                    className={styles.image}
                />
            </div>

            {/* 정보 영역 */}
            <div className={styles.infoArea}>
                {/* 제목 */}
                <h2 className={styles.title}>{content.title}</h2>
                
                {/* 가이드/저자 정보 */}
                <div className={styles.authorInfo}>
                    <img
                        src={`https://placehold.co/30x30/6366F1/FFFFFF?text=${content.author[0]}`}
                        alt={content.author}
                        className={styles.authorImage}
                    />
                    <span className={styles.authorName}>{content.author}</span>
                </div>

                {/* 시간, 가격, 평점 */}
                <div className={styles.pricingRating}>
                    {/* 시간/가격 */}
                    <div className={styles.priceInfo}>
                        <span className={styles.time}>{content.time}</span>
                        <span className={styles.price}>{content.price}</span>
                    </div>

                    {/* 평점 */}
                    <div className={styles.ratingInfo}>
                        <StarIcon className={styles.starIcon} />
                        <span className={styles.ratingValue}>{content.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
