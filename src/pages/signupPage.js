import SignupComponent from "../components/SignupComponents/signup";
import LoginForm from "../components/SignupComponents/login";
import { useState } from "react";

const SignupPage = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div>
      {flag ? <h1>Signup</h1> : <h1>Login</h1>}
      {flag ? <SignupComponent /> : <LoginForm />}
      {flag ? (
        <p className="signup-flag-p" onClick={() => setFlag(false)}>
          Already have an account? Click here to Login
        </p>
      ) : (
        <p className="signup-flag-p" onClick={() => setFlag(true)}>
          Don't have an account? Signup here
        </p>
      )}
    </div>
  );
};

export default SignupPage;
