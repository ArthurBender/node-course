import { useState, useEffect } from "react";

import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import { imagePath } from "../../utils/images";

import Panel from "../../components/Panel";
import Input from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import { AxiosError } from "axios";
import type { ApiResponse, UserFromApi } from "../../utils/types";

const Profile = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "{}");
  const { setFlashMessage } = useFlashMessage();

  const [user, setUser] = useState({
    _id: "",
    avatar: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: (event.target.files && event.target.files[0])
    })
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    if (user.password) {
      formData.append("password", user.password);
      formData.append("confirmPassword", user.confirmPassword);
    }

    if (user.avatar) {
      formData.append("avatar", user.avatar);
    }

    try {
      const response = await api.patch(`/users/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      });

      const data: ApiResponse = response.data;

      setFlashMessage(data.message, "success");
    } catch (error) {
      let errorMessage = "Unknown error, try again.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      setFlashMessage(errorMessage, "error");
    }
  }

  useEffect(() => {
    if (!accessToken) return;

    try {
      api.get("/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
        const data: ApiResponse = response.data;
        const userData = data.data as UserFromApi;
        
        setUser({
          _id: userData._id,
          avatar: userData.avatarPath,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: "",
          confirmPassword: ""
        });
      })
      
    } catch (error) {
      let errorMessage = "Unknown error, try again.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      setFlashMessage(errorMessage, "error");
    }
  }, []);

  return (
    <>
      <PageTitle className="mx-auto">Your Profile</PageTitle>

      <Panel className="panel-shadowed px-20! max-w-[60%] mx-auto mt-10">
        <p className="text-center mb-10">Review and update your account information as needed.</p>

        <form onSubmit={handleSubmit}>
          {imagePath(user.avatar, "users") ? (
              <img src={imagePath(user.avatar, "users") || ""} alt="Avatar" className="file-preview rounded-full!" />
            ) : (
              <div className="file-preview empty rounded-full!"></div>
            )
          }
          <Input type="file" name="avatar" label="Avatar" onChange={handleFileChange} />

          <Input type="text" name="name" label="Full Name" onChange={handleUserChange} required value={user.name} />
          <Input type="email" name="email" label="Email" onChange={handleUserChange} required value={user.email} />
          <Input type="phone" name="phone" label="Phone" onChange={handleUserChange} required value={user.phone} />

          <p className="text-muted">Leave blank to keep the same password.</p>
          <hr className="border-2 border-primary/25 mt-1 mb-2" />
          <Input type="password" name="password" label="Password" hint="At least 8 characters." minLength={8} onChange={handleUserChange}  value={user.password} />
          <Input type="password" name="confirmPassword" label="Confirm Password" minLength={8} onChange={handleUserChange} value={user.confirmPassword} required={user.password.length > 0} />

          <button type="submit" className="button primary button-lg w-[80%] mx-auto mt-10">Save</button>
        </form>
      </Panel>
    </>
  )
}

export default Profile;