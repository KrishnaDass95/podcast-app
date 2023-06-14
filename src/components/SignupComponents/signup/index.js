import Input from "../../Common/Input"
import { useState } from "react";
import Button from "../../Common/Button";

const SignupComponent = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSignup(){
        console.log("Sign up");
    }

    return(
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

            <Button 
            text="signup"
            onClick={handleSignup}
            />


            
        </div>
    )
}

export default SignupComponent;

