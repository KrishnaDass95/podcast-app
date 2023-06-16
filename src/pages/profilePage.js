import { useSelector } from "react-redux";
import Header from "../components/Header"

const ProfilePage = () => {
    const user = useSelector((state) => state.user.user);
    if(!user){
        return(
            <div>Loading...</div>
        )
    }
    return(
        <div>
            <Header />
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
        </div>
    )
}

export default ProfilePage;