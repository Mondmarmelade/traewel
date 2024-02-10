import { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import Scopes from "../constants/Scopes";
import Discovery from "../constants/Discovery";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    console.log("APP STARTED");

    SecureStore.getItemAsync("AUTH_STATE_KEY").then((storeData) => {
      if (storeData != null) {
        setAuthData(JSON.parse(storeData));
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("accessToken", authData?.accessToken);

    if (authData != null) {
      axios
        .get("https://traewelling.de/api/v1/auth/user", {
          headers: { Authorization: `Bearer ${authData?.accessToken}` },
        })
        .then((res) => {
          setUser(res.data.data);
          console.log("USER SET!");
          setIsAuthenticated(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            // When App is opened but API-Token is deleted in traewelling.de settings
            deleteUserDatalLocally();
          }
        });
    }
  }, [authData]);

  // Login
  const [loginRequest, loginResponse, promptLoginAsync] =
    AuthSession.useAuthRequest(
      {
        clientId: "110",
        clientSecret: process.env.EXPO_PUBLIC_TRAEWELLING_CLIENT_SECRET,
        scopes: Scopes,
        redirectUri: AuthSession.makeRedirectUri({
          scheme: "myapp", //needs to be changed in production
        }),
      },
      Discovery
    );

  useEffect(() => {
    const fetchAccessToken = async () => {
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          clientId: "110",
          clientSecret: process.env.EXPO_PUBLIC_TRAEWELLING_CLIENT_SECRET,
          code: loginResponse.params.code,
          redirectUri: AuthSession.makeRedirectUri({
            scheme: "myapp", //needs to be changed in production
          }),
          extraParams: { code_verifier: loginRequest.codeVerifier },
        },
        Discovery
      ).catch((err) => {
        alert(err);
      });

      await SecureStore.setItemAsync(
        "AUTH_STATE_KEY",
        JSON.stringify(tokenResult)
      ).then(() => {
        setIsAuthenticated(true);
      });
    };

    if (loginResponse?.type === "success") {
      fetchAccessToken();
    } else if (
      loginResponse?.type === "cancel" ||
      loginResponse?.type === "dismiss"
    ) {
      alert(
        "Login fehlgeschlagen! Bitte geben sie Träwel zugriff auf Ihr Träwelling Account, um diesen Dienst nutzen zu können."
      );
    }
  }, [loginResponse]);

  // Logout
  const logout = async () => {
    try {
      console.log("LOGOUT fired!");
      console.log(authData?.accessToken);
      axios
        .post(
          "https://traewelling.de/api/v1/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${authData.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("LOGOUT API RESONSE", response);
          deleteUserDatalLocally();
        })
        .catch((err) => {
          console.log("ERROR LOGOUT", err);
        });
    } catch (error) {
      alert("Fehler beim Abmelden!", error);
    }
  };

  const deleteUserDatalLocally = async () => {
    setIsAuthenticated(false);
    await SecureStore.deleteItemAsync("AUTH_STATE_KEY").then(() => {
      setAuthData(null);
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, promptLoginAsync, loginRequest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
