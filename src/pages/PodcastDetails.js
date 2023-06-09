import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/Common/Button";
import EpisodeDetails from "../components/PodcastComponents/EpisodeDetails";
import AudioPlayer from "../components/PodcastComponents/AudioPlayer";

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState();

  const navigate = useNavigate();

  console.log("podcast id from use Params", id);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    const unsubsribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      }
    );

    return () => {
      unsubsribe();
    };
  }, [id]);

  async function getData() {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("podcast document data retrieved from db", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        toast.info("The podcast you are looking for does not exist");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {podcast.id && (
          <>
            <div className="heading-button-podcast-detail">
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  text={"create an episode"}
                  onClick={() => navigate(`/podcast/${id}/create-episode`)}
                />
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} alt={podcast.description} />
            </div>

            <p className="podcast-description">{podcast.description}</p>

            <h1 className="podcast-title-heading">Episodes</h1>
            {episodes.length > 0 ? (
              <div className="episode-content">
                {episodes.map((epi, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={epi.title}
                      description={epi.description}
                      audioFile={epi.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
                {playingFile && (
                  <AudioPlayer
                    key={playingFile}
                    audioSrc={playingFile}
                    image={podcast.displayImage}
                  />
                )}
              </div>
            ) : (
              <>No episodes available for this podcast</>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default PodcastDetails;
