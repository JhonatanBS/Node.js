import api from "../utils/api";

import useFlashMessage from "./useFlashMessage";

import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();
    const history = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;  
        setAuthenticated(true);
      }

    }, []);


    async function register(user) {
        let msgText = "Cadastro realizado com sucesso!";
        let msgType = "success";
        
        try {
            const data = await api.post("/users/register",user).then((response) => {
                return response.data;
            });

           await authUser(data);
        } catch (error) {
            msgText = error.response.data.message;
            msgType = "error";
        }

        setFlashMessage(msgText, msgType);
    }

    async function authUser(data) {
      setAuthenticated(true);

      localStorage.setItem("token", JSON.stringify(data.token));

      history("/");
    }

    async function login(user) {
      let msgText = "Login realizado com sucesso";
      let msgType = "success";

      try {
        const data = await api.post("/users/login", user).then((response) => {
          return response.data;
        });

        await authUser(data);
        
      } catch (error) {
        msgText = error.response.data.message;
        msgType = "error"
      }

      setFlashMessage(msgText, msgType);
    }

    function logout() {
      const msgText = "Logout realizado com sucesso!";

      const msgType = "success";

      setAuthenticated(false);
      localStorage.removeItem("token");
      api.defaults.headers.Authorization = undefined;

      history("/");

      setFlashMessage(msgText, msgType);

    }

    return { register , authenticated, logout, login}
}