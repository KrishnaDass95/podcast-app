import Button from "../../Common/Button";
import "./style.css";


const EpisodeDetails = ({ title, description, audioFile, onClick, index }) => {

    return(
        <div className="episode-container" style={{marginTop: "0.1rem"}}>
            <h2 className="episode-titles">{index}. {title}</h2>
            <p className="episode-description">{description}</p>
            <Button style={{width: '100px'}} text={"Play"} onClick={() => onClick(audioFile)}/>
        </div>
    )
}

export default EpisodeDetails;