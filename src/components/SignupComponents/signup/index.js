import Input from "../../Common/Input";
import { useState } from "react";
import Button from "../../Common/Button";
import { auth, db, storage } from "../../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const SignupComponent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignup() {
    console.log("Sign up...");
    setLoading(true);
    if (password === confirmPassword && password.length >= 6 && email && password) {
      try {
        // create user in firebase, this is authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // getting user object from firebase created user
        const user = userCredential.user;
        console.log("user signed up from firebase", user);

        // save the user details to firebase db and create user doc
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );

        toast.success('Signup success!')
        setLoading(false);

        navigate("/profile");

      } catch (e) {
        console.log("error ->", e);
        toast.error(e.message);
        setLoading(false);
      }
    }
    else{
      if(password != confirmPassword){
        toast.error('Password and confirm password do not match');
        setLoading(false);
      }
      else if(password.length < 6){
        toast.error('Password length must be more than 6 characters');
        setLoading(false);
      }
      else{
        toast.error('please enter all the fields, some are missing');
        setLoading(false);
      }

    }
  }

  return (
    <div className="input-wrapper">
      <Input
        type="text"
        value={fullName}
        placeholder="Full Name"
        required={true}
        setState={setFullName}
      />

      <Input
        type="text"
        value={email}
        placeholder="Email"
        required={true}
        setState={setEmail}
      />

      <Input
        type="password"
        value={password}
        placeholder="Password"
        required={true}
        setState={setPassword}
      />

      <Input
        type="password"
        value={confirmPassword}
        placeholder="Confirm Password"
        required={true}
        setState={setConfirmPassword}
      />

      <Button text={loading ? 'Loading' : 'Signup'} onClick={handleSignup} 
      disabled={loading}/>
    </div>
  );
};

export default SignupComponent;
