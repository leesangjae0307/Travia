import { Search } from "lucide-react"
import "../styles/SearchBar.css"

export default function SearchBar() {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input type="text" placeholder="여행지, 지역, 키워드를 검색하세요" className="search-input" />
                <div className="search-icon">
                    <Search />
                </div>
            </div>
        </div>
    )
}
