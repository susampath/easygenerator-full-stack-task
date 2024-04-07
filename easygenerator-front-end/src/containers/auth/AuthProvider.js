import { useSelector, useDispatch } from "react-redux";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

import * as authSelectors from "../../store/selectors/auth";
import { routes } from "../../helpers/routes";
import * as authAPIs from "../../apis/auth";
import {
  setAccessToken,
  hasAuthTokens,
  deleteAccessToken,
} from "../../utils/auth";
import * as userActions from "../../store/actions/user";
import {
  showSuccessAlert,
  showErrorAlert,
} from "../../store/directDispatches/common";

const AuthContext = createContext({});

function AuthProvider(props) {
  const { children } = props;

  /* -------------------------------------------------------------------------- */
  /*                                    Redux                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const [isBackendAuthorized, setIsBackendAuthorized] = useState(
    hasAuthTokens()
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isTokenExpired = useSelector(authSelectors.isTokenExpired);

  const loginUserFlow = useCallback(
    async (email, password) => {
      try {
        const from = location.state?.from?.pathname || `${routes.ROOT.PATH}`;
        setIsProcessing(true);
        const response = await authAPIs.loginUser({
          email: email,
          password: password,
        });
        const accessToken = response?.data?.access_token;

        const decoded = accessToken ? jwtDecode(accessToken) : undefined;
        if (decoded !== undefined) {
          setAccessToken(accessToken);
          dispatch(
            userActions.setUserData({
              id: response?.data?.user?._id,
              name: response?.data?.user?.name,
              email: response?.data?.user?.email,
            })
          );
          setIsBackendAuthorized(true);
          setIsProcessing(false);
          // navigate to the page where user wanted to go before navigation to login.
          navigate(from, { replace: true });
          showSuccessAlert(response?.message);
        } else {
          setIsBackendAuthorized(false);
          setIsProcessing(false);
          navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
        }
      } catch (err) {
        setIsProcessing(false);
      }
    },
    [dispatch, navigate, location.state?.from?.pathname]
  );

  const registerUserFlow = useCallback(
    async (email, name, password) => {
      try {
        setIsProcessing(true);
        const response = await authAPIs.registerUser({ email, name, password });
        if (response?.success) {
          const accessToken = response?.data?.access_token;

          const decoded = accessToken ? jwtDecode(accessToken) : undefined;
          if (decoded !== undefined) {
            setAccessToken(accessToken);
            dispatch(
              userActions.setUserData({
                id: response?.data?.user?._id,
                name: response?.data?.user?.name,
                email: response?.data?.user?.email,
              })
            );
            setIsBackendAuthorized(true);
            setIsProcessing(false);
            navigate(routes.ROOT.PATH);
            showSuccessAlert(response?.message);
          } else {
            setIsBackendAuthorized(false);
            setIsProcessing(false);
            navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
            showErrorAlert("Error in access token");
          }
        } else {
          setIsBackendAuthorized(false);
          setIsProcessing(false);
          navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
          showErrorAlert(response?.message);
        }
      } catch (err) {
        setIsProcessing(false);
      }
    },
    [dispatch, navigate]
  );

  const signOut = useCallback(() => {
    setIsBackendAuthorized(false);
    deleteAccessToken();
    navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
  }, [navigate]);

  const getUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authAPIs.getUserDetails();
      if (response?.success) {
        const message = ` Authenticated router worked !! ${response?.data.name}`;
        setLoading(false);
        showSuccessAlert(message);
      } else {
        setLoading(false);
        showErrorAlert(response?.message);
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(
    () => {
      if (isTokenExpired) {
        signOut();
      }
    }, //eslint-disable-next-line
    [isTokenExpired]
  );

  /* -------------------------------------------------------------------------- */
  /*                                Return values                               */
  /* -------------------------------------------------------------------------- */
  const value = useMemo(
    () => ({
      isBackendAuthorized,
      isProcessing,
      setIsBackendAuthorized,
      registerUserFlow,
      loginUserFlow,
      signOut,
      getUserDetails,
      isLoading,
    }),
    [
      isBackendAuthorized,
      isProcessing,
      registerUserFlow,
      loginUserFlow,
      signOut,
      getUserDetails,
      isLoading,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth, AuthContext };
