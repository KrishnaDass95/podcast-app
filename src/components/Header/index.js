import "./style.css"
import { Link } from "react-router-dom";

const Header = () => {

    return(
        <>
        <div className="navbar">
            <div className="links">
                <Link to="/">Signup</Link>
                <Link to="/podcasts">Podcasts</Link>
                <Link to="/start-a-podcast">Start A Podcast</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
        </>
    )

}

export default Header;