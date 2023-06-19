import { useSelector } from "react-redux";
import Header from "../components/Header";
import Button from "../components/Common/Button";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Common/Loader";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if (!user) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <Header />
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.uid}</h1>
      <Button text={"logout"} onClick={handleLogout} />
    </div>
  );
};

export default ProfilePage;
