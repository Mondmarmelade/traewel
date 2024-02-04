import { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import Scopes from "../constants/Scopes";
import Discovery from "../constants/Discovery";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    console.log("APP STARTED");

    SecureStore.getItemAsync("AUTH_STATE_KEY").then((storeData) => {
      if (storeData != null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  // Login
  const [loginRequest, loginResponse, promptLoginAsync] =
    AuthSession.useAuthRequest(
      {
        clientId: "110",
        clientSecret: "nqySc7UT8kacD9PPVQGDBGh46bxj1COLkus3xUyy",
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
          clientSecret: "nqySc7UT8kacD9PPVQGDBGh46bxj1COLkus3xUyy",
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
      setIsAuthenticated(false);
      await SecureStore.deleteItemAsync("AUTH_STATE_KEY").then(() => {
        setUser(null);
      });
    } catch (e) {
      alert("Fehler beim Abmelden!");
    }
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