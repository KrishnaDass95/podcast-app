import Input from "../../Common/Input";
import { useState } from "react";
import Button from "../../Common/Button";
import { auth, db, storage } from "../../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupComponent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    console.log("Sign up...");
    if (password === confirmPassword) {
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
      } catch (e) {
        console.log("error ->", e);
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

      <Button text="signup" onClick={handleSignup} />
    </div>
  );
};

export default SignupComponent;
