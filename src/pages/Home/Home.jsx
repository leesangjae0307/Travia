"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import SearchBar from "../../components/SearchBar"
import CategoryFilter from "../../components/CategoryFilter"
import TravelCard from "../../components/TravelCard"
import "../../styles/Home.css"

const regions = ["전체", "서울", "부산", "제주", "강원", "경기", "인천", "대구", "대전", "광주", "울산", "세종"]

const travelPosts = [
    {
        id: 1,
        image: "/food.png",
        avatar: "/user1.png",
        title: "바다가 보이는 한식당 추천",
        author: "김여행",
        duration: "2박 3일",
        price: "50만원",
        rating: 4.8,
    },
    {
        id: 2,
        image: "/sunset.png",
        avatar: "/diverse-user-avatar-set-2.png",
        title: "제주도 숨은 명소 일주",
        author: "박탐험",
        duration: "3박 4일",
        price: "80만원",
        rating: 4.9,
    },
    {
        id: 3,
        image: "/traditional.png",
        avatar: "/diverse-user-avatars-3.png",
        title: "서울 고궁 투어 완벽 가이드",
        author: "이문화",
        duration: "1박 2일",
        price: "30만원",
        rating: 4.7,
    },
    {
        id: 4,
        image: "/beach.png",
        avatar: "/user-avatar-4.png",
        title: "부산 해운대 카페 투어",
        author: "최바다",
        duration: "2박 3일",
        price: "45만원",
        rating: 4.6,
    },
    {
        id: 5,
        image: "/hiking.png",
        avatar: "/user-avatar-5.png",
        title: "강원도 설악산 등산 코스",
        author: "정산악",
        duration: "1박 2일",
        price: "35만원",
        rating: 4.8,
    },
    {
        id: 6,
        image: "/hanok.png",
        avatar: "/user-avatar-6.png",
        title: "전주 한옥마을 역사 탐방",
        author: "한역사",
        duration: "2박 3일",
        price: "55만원",
        rating: 4.9,
    },
]

export default function Home() {
    const [selectedRegion, setSelectedRegion] = useState("전체")

    return (
        <div className="home-container">
            <div className="home-content">
                <Navbar />
                <SearchBar />
                <CategoryFilter regions={regions} selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />

                <div className="travel-posts-grid">
                    {travelPosts.map((post) => (
                        <TravelCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
