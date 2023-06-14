import Input from "../../Common/Input";
import { useState } from "react";
import Button from "../../Common/Button";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("login");
    }

    return(
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

            <Button 
            text="login"
            onClick={handleLogin}
            />

            

        </div>
    )
}

export default LoginForm;