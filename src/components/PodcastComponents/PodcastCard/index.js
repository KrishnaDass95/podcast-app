import { Link } from "react-router-dom";
import "./style.css"

const PodcastCard = ({ id, title, displayImage }) => {

    return(
        <Link to={`/podcast/${id}`}>
            <div className="podcast-card">
                <img src={displayImage} alt={title} className="display-image-podcast"/>
                <p className="title-podcast">{title}</p>
            </div>

        </Link>

    )

}

export default PodcastCard;