import Input from "../../Common/Input";
import { useState } from "react";
import Button from "../../Common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    console.log("login ....");
    if (email && password) {
      try {
        // firebase sign in
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log(
          "user data returned from firebase db after signing in ",
          userData
        );

        dispatch(
          setUser({
            name: userData.name,
            email: userData.email,
            uid: userData.uid,
          })
        );

        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("Error", e);
        toast.error(e.message);
        setLoading(false);
      }
    }
    else{
        if(!email || !password){
            toast.error('Fields empty, please enter email and password');
        }
    }
  };

  return (
    <div className="input-wrapper">
      <Input
        type="text"
        placeholder="Email"
        value={email}
        setState={setEmail}
        required={true}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        setState={setPassword}
        required={true}
      />

      <Button text={loading ? 'loading' : 'login'} onClick={handleLogin} disabled={loading}/>
    </div>
  );
};

export default LoginForm;
