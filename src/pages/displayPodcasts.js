import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/PodcastComponents/PodcastCard";

const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  // We need to get the podcasts from db and store it in our redux state
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <div>
      <Header />
      <h1>Discover Podcasts</h1>
      <div class="input-wrapper">
        {
            podcasts.length > 0 ?
             (
                <div className="podcasts-flex">
                    {podcasts.map((item) => {
                        return <PodcastCard 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        displayImage={item.displayImage}
                        />
                    })}
                </div>
            ) : 
            <><p>No podcasts availble in the platform</p></>
        }
      </div>
    </div>
  );
};

export default PodcastsPage;
