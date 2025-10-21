import "../styles/TravelCard.css"

export default function TravelCard({ post }) {
    return (
        <div className="travel-card">
            <div className="card-image-container">
                <img src={post.image} alt={post.title} className="card-image" />
            </div>
            <div className="card-content">
                <div className="user-info">
                    <img src={post.avatar} alt={post.author} className="user-avatar" />
                    <h3 className="card-title">{post.title}</h3>
                </div>
                <div className="card-details">
                    <span>{post.author}</span>
                    <span>{post.duration}</span>
                    <span>{post.price}</span>
                    <span>★{post.rating}</span>
                </div>
            </div>
        </div>
    )
}
