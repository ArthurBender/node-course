import { useState, useContext } from "react";

import Panel from "../../components/Panel";
import Input from "../../components/Input";

import { UserContext } from "../../context/UserContext";
import type { UserToCreate } from "../../utils/types";

const Register = () => {
  const { register } = useContext(UserContext);

  const [user, setUser] = useState({});
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    register(user as UserToCreate);
  }

  return (
    <Panel showLogo className="panel-page panel-shadowed px-20!">
      <h2 className="panel-title">Create your account. It's free!</h2>

      <p className="text-center mb-10">Provide your information so we can create your account.</p>

      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" label="Full Name" onChange={handleUserChange} required />
        <Input type="email" name="email" label="Email" hint="Make sure you have access to this email." onChange={handleUserChange} required />
        <Input type="phone" name="phone" label="Phone" onChange={handleUserChange} required />
        <Input type="password" name="password" label="Password" hint="At least 8 characters." minLength={8} onChange={handleUserChange} required />
        <Input type="password" name="confirmPassword" label="Confirm Password" minLength={8} onChange={handleUserChange} required />

        <button type="submit" className="button primary button-lg w-[80%] mx-auto mt-10">Register</button>
      </form>

      <hr className="my-8 border-border"/>
      <p className="text-center text-lg">Already have an account? <a href="/login" className="link">Login</a></p>
    </Panel>
  )
}

export default Register;