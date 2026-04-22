import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { ApiResponse, UserToCreate, UserToLogin } from "../utils/types";
import type { AxiosError } from "axios";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (accessToken) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthenticated(true);
    }
  }, [])

  const register = async (user: UserToCreate) => {
    try {
      const { data }: { data: ApiResponse } = await api.post("/users", user);

      setFlashMessage(data.message, "success");

      navigate("/login");
    } catch (error) {
      handleError(error as AxiosError);
    }
  }

  const login = async (user: UserToLogin) => {
    try {
      const { data }: { data: ApiResponse } = await api.post("/login", user);
      const accessToken = (data.data as { accessToken: string })?.accessToken;

      if (accessToken) {
        persistLogin(accessToken);

        setFlashMessage("Successfully logged in!", "success");
        navigate("/");
      } else {
        setFlashMessage("Unknown error, try again.", "error");
        navigate("/login");
      }
    } catch (error) {
      handleError(error as AxiosError);
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    api.defaults.headers.Authorization = null;
    setAuthenticated(false);

    navigate("/login");
  }

  const persistLogin = (accessToken: string) => {
    setAuthenticated(true);
  
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
  }

  const handleError = (error: AxiosError) => {
    const errorData = error.response?.data as ApiResponse;

    if (errorData) {
      setFlashMessage(errorData.message, "error");
    }
  }

  return { register, login, logout, authenticated };
}

export default useAuth;