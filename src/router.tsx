/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { I18nextProvider } from "react-i18next";
import dayjs from "dayjs";
import { useSessionStorage } from "react-use-sessionstorage";
import Axios, { AxiosResponse } from "axios";
import qs from "qs";

import "./index.css";
import ErrorBoundaries from "./containers/ErrorBoundaries";
import constansts from "./helpers/constants";
import i18n from "./helpers/i18next/i18n";
import secureStorage from "./helpers/secureStorage";
import store from "./helpers/store/store";
import Container from "./layout";
import Login from "./containers/Login";
import OverviewNew from "./containers/OverviewNew";
import UserManagement from "./containers/UserManagement";
import Financial from "./containers/Financial";

const { Content } = Layout;

export const RootContext = createContext<{
  [key: string]: any;
}>({});

const AppProvider = RootContext.Provider;

const { CancelToken } = Axios;
const source = CancelToken.source();

const AppIndex = () => {
  const [tokenExpired, setTokenExpired] = useSessionStorage("tokenExpired");
  const [userId, setUserId] = useSessionStorage("userId");
  const [accessToken, setAccessToken] = useState(secureStorage.getItem("access_token"));
  const [userRoleName, setUserRoleName] = useSessionStorage("roleName");
  const [userFullName, setUserFullName] = useSessionStorage("userFullName");
  const [isOpenModalRefresh, setIsOpenModalRefresh] = useState(false);
  const [userMenus, setUserMenus] = useState([]);
  const [userSignature, setUserSignature] = useState([]);
  const [userAreas, setUserAreas] = useState([]);
  const [tokenTimeout, setTokenTimeout] = useState<NodeJS.Timeout>();
  const [popupTimeout, setPopupTimeout] = useState<NodeJS.Timeout>();
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userDivision, setUserDivision] = useState("");
  const [userVendorId, setUserVendorId] = useSessionStorage("");

  useEffect(() => {
    // console.log("~ userRoleName", userRoleName);
  }, [userRoleName]);

  function setExpired(expired: dayjs.Dayjs) {
    setTokenExpired(expired.valueOf().toString());
  }

  function checkTokenExpired() {
    // console.log(tokenExpired);
    const expired = dayjs(Number(tokenExpired)); // .subtract(5, 'minutes'); // expired kurangi 5 menit untuk jeda
    const isAfter = dayjs().isAfter(expired); // apakah sudah lewat?
    // console.log(
    //   'isAfter',
    //   isAfter,
    //   'expired',
    //   expired.format(),
    //   'tokenExpired',
    //   tokenExpired
    // );
    const schedule = isAfter ? 0 : expired.diff(dayjs());
    // console.log('schedule in miliseconds', schedule);
    const refresh_token = secureStorage.getItem("refresh_token");
    clearTimeout(tokenTimeout);
    const theTokenTimeout = setTimeout(() => {
      if (refresh_token) {
        refreshToken().catch((err) => {
          // console.log("~ err", err);
        });
      } else {
        goToHome();
      }
    }, schedule);
    setTokenTimeout(theTokenTimeout);
    schedulePopup();
  }

  function schedulePopup() {
    const { popupTimeout: pTimeout } = constansts;
    const refresh_token = secureStorage.getItem("refresh_token");
    clearTimeout(popupTimeout);
    // console.log('Reschedule popup in minutes', pTimeout);
    const thePopupTimeout = setTimeout(() => {
      if (refresh_token) {
        setIsOpenModalRefresh(true);
      } else {
        goToHome();
      }
    }, Number(pTimeout) * 60 * 1000);
    setPopupTimeout(thePopupTimeout);
  }

  useEffect(() => {
    const axiosInterceptor = Axios.interceptors.request.use(
      (request) => {
        schedulePopup();
        return request;
      },
      (error) => {
        return error;
      }
    );
    return () => {
      Axios.interceptors.request.eject(axiosInterceptor);
    };
  }, []);

  useEffect(() => {
    checkTokenExpired();
  }, [tokenExpired]);

  function refreshToken() {
    const refresh_token = secureStorage.getItem("refresh_token");
    return new Promise((resolve, reject) => {
      const data = qs.stringify({ grant_type: "refresh_token", refresh_token });
      Axios({
        url: `${constansts.apiDomain}/oauth/token`,
        method: "post",
        data,
        auth: {
          username: "clientId",
          password: "secret",
        },
        cancelToken: source.token,
      })
        .then(saveToken)
        .catch((err) => {
          // console.log('~ err', err)
          // console.log(err.response.data.error);
          const error = err.response?.data?.error;
          if (error !== "invalid_token" && error !== "Internal Server Error") {
            // syarat2 belum invalid
            reject(err);
          } else {
            // console.log('go home');
            reject(err);
            goToHome();
          }
        });
    });
  }

  function logout() {
    source.cancel("User logout.");
    secureStorage.removeItem("role_name");
    secureStorage.removeItem("refresh_token");
    secureStorage.removeItem("access_token");
    sessionStorage.removeItem("redirectPathname");
    goToHome();
  }

  function goToHome() {
    // console.log(window.location.pathname)
    if (window.location.pathname !== "/" && !window.location.pathname.includes("/login")) {
      window.location.href = "/";
      alert("Session Anda telah habis.");
    }
  }

  function saveToken(res: AxiosResponse) {
    // console.log("+++ save TOKEN", res.data);
    const { refresh_token, access_token, expires_in, user_id, full_name, role, vendorId } =
      res.data;
    const expired = dayjs().add(expires_in || 600, "seconds");
    // console.log(res.data);
    if (access_token && refresh_token) {
      secureStorage.setItem("role_name", role);
      secureStorage.setItem("access_token", access_token);
      secureStorage.setItem("refresh_token", refresh_token);
      setAccessToken(access_token);
      setExpired(expired);
      setUserId(user_id);
      setUserFullName(full_name);
      setIsOpenModalRefresh(false);
      setUserRoleName(role);
      setUserVendorId(vendorId);
      // console.log(expired.format());
    }
  }

  useEffect(() => {
    // ===> Start EMAIL Link Handler <===
    const redirectPathname = window.location.pathname;
    // console.log('<><> redirectPathname', redirectPathname);
    if (redirectPathname !== "/") {
      sessionStorage.setItem("redirectPathname", redirectPathname);
    }
    // ===> End EMAIL Link Handler <===
    if (accessToken) {
      Axios({
        url: `${constansts.userServiceBaseUrl}/users/profile`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          // console.log("+++ profile", res);
          if (res.data.status === "success") {
            setUserRoleName(res.data.data.roleName);
            setUserMenus(res.data.data.menus);
            setUserAreas(res.data.data.areas?.split(",").map((val: any) => val * 1) || []);
            setUserSignature(res.data.data.signatureUrl);
            setUserEmail(res.data.data.email);
            setUserPhone(res.data.data.phoneNumber);
            setUserDivision(res.data.data.divisionName);
            setUserVendorId(res.data.data.vendorId);
          }
        })
        .catch((err) => console.log(err));
    } else {
      goToHome();
      alert("Access Token does not exist");
    }
  }, [accessToken]);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AppProvider
          value={{
            saveToken,
            refreshToken,
            logout,
            tokenExpired,
            userId,
            userRoleName,
            userFullName,
            isOpenModalRefresh,
            userMenus,
            userAreas,
            userSignature,
            userEmail,
            userPhone,
            userDivision,
            userVendorId,
          }}
        >
          <Container>
            <ErrorBoundaries>
              <Content
                style={{
                  width: "100%",
                }}
              >
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/dashboard-overview" component={OverviewNew} />
                  <Route exact path="/user-management" component={UserManagement} />
                  <Route exact path="/financial" component={Financial} />
                </Switch>
              </Content>
            </ErrorBoundaries>
          </Container>
        </AppProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default AppIndex;
