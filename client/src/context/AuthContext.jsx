import { createContext, useState, useEffect } from "react";
import { ENDPOINTS } from "../const/endpoints";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    let response;
    let data;
    try {
      response = await fetch(ENDPOINTS.baseURL + ENDPOINTS.authTokensPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      data = await response.json();
    } catch (error) {
      console.error(error);
    }
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/LogIn");
    } else {
      let message = document.getElementById("message");
      switch (response.status) {
        case 400:
          message.innerHTML = "Username and password cannot be empty";
        case 401:
          message.innerHTML = "Incorrect username or password";
          break;
        default:
          message.innerHTML = "Something went wrong";
      }
    }
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/LogIn");
  };

  let contexData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contexData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
