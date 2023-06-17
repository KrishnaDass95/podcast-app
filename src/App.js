import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase';
import { setUser } from './slices/userSlice';
import { doc } from "firebase/firestore";
import PrivateRoutes from './components/Common/PrivateRoutes';
import CreateAPodcastPage from './pages/podcastPage';
import PodcastsPage from './pages/displayPodcasts';
import PodcastDetails from './pages/PodcastDetails';

const App = () => {

  const dispatch = useDispatch();

  // load redux state based on the current user authenticated in your app
  // when you refresh it goes away
  useEffect(() => {
    // firebase function on auth state changed, has the current user
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if(user) {
        // snapshot gives you the current snapshot in db of a user
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if(userDoc.exists()){
              // here is where you get the data
              const userData = userDoc.data();
              console.log("user data from db", userData);
              if(userData) {
                dispatch(
                  setUser({
                    name: userData.name,
                    email: userData.email, 
                    uid: userData.uid
                  })
                );
              }
            }
          },
          (error) => {
            console.log("error fetching data", error);
          }
        );
  
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
  
    return () => {
      unsubscribeAuth();
    }
  }, []);

  return(
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignupPage />}></Route>
        <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/create-a-podcast" element={<CreateAPodcastPage />}></Route>
        <Route path="/podcasts" element={<PodcastsPage />}></Route>
        <Route path="/podcast/:id" element={<PodcastDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;