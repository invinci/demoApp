import carData from "../helpers/carData.json";

export function carList() {
  return (dispatch, getstate) => {
    dispatch({
      type: "LIST_GET_SUCCESS",
      payload: carData
    });
  };
}
