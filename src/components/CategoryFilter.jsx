"use client"

import "../styles/CategoryFilter.css"

export default function CategoryFilter({ regions, selectedRegion, onSelectRegion }) {
    return (
        <div className="category-filter">
            <div className="category-buttons">
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => onSelectRegion(region)}
                        className={`category-button ${selectedRegion === region ? "active" : ""}`}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
    )
}
