import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Input from "../../components/Input";
import Panel from "../../components/Panel";

import type { UserToLogin } from "../../utils/types";

const Login = () => {
  const { login } = useContext(UserContext);
  
  const [user, setUser] = useState({});
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(user as UserToLogin);
  }

  return (
    <Panel showLogo className="panel-page panel-shadowed px-20!">
      <h2 className="panel-title">Login to your account and trade with security!</h2>

      <p className="text-center mb-10">Access and enjoy a safe and secure trading experience.</p>

      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" label="Email" onChange={handleUserChange} required />
        <Input type="password" name="password" label="Password" minLength={8} onChange={handleUserChange} required />

        <button type="submit" className="button primary button-lg w-[80%] mx-auto mt-10">Access</button>
      </form>

      <hr className="my-8 border-border"/>
      <p className="text-center text-lg">Doesn't have an account? <a href="/register" className="link">Register</a></p>
    </Panel>
  )
}

export default Login;