import Input from "../../Common/Input";
import { useState } from "react";
import Button from "../../Common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../../slices/userSlice";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("login ....");
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

      dispatch(setUser({
        name: userData.name,
        email: userData.email,
        uid: userData.uid,
      }));

      navigate("/profile");

    } catch (e) {
      console.log("Error", e);
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

      <Button text="login" onClick={handleLogin} />
    </div>
  );
};

export default LoginForm;
