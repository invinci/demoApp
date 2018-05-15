import { Actions } from "react-native-router-flux";

export function login() {
  data = {
    email: "peter@klaven",
    password: "cityslicka"
  };

  return (dispatch, getstate) => {
    //eslint-disable-line
    dispatch({ type: "LOGIN_REQUEST" });
    fetch(`${getstate().appConfig.serverUrl}api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "peter@klaven",
        password: "cityslicka"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: responseJson
        });
        Actions.list();
      })
      .catch(error => {
        if (error) {
          dispatch({ type: "LOGIN_REQUEST_FAIL" });
        }
      });
  };
}
