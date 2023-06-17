import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/PodcastComponents/PodcastCard";
import Input from "../components/Common/Input";

const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [searchTerm, setSearchTerm] = useState("");

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

  let filteredPodcasts = podcasts.filter((item) => item.title.trim().toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <Header />
      <h1>Discover Podcasts</h1>
      <div class="input-wrapper">
      <Input
        type="text"
        value={searchTerm}
        placeholder="Search Podcasts"
        required={true}
        setState={setSearchTerm}
      />

        {
            podcasts.length > 0 ?
             (
                <div className="podcasts-flex">
                    {filteredPodcasts.map((item) => {
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
