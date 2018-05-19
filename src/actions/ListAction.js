import carData from "../helpers/carData.json";

export function carList() {
  return (dispatch, getstate) => {
    dispatch({
      type: "LIST_GET_SUCCESS",
      payload: carData.cars
    });
  };
}

export function searchCar(text) {
  return (dispatch, getstate) => {
    dispatch({
      type: "SEARCH_SUCCESS",
      payload: text
    });
  };
}

export function updateSortCheck(text) {
  return (dispatch, getstate) => {
    dispatch({
      type: "SORT_UPDATE",
      payload: text
    });
  };
}

export function updateFilterCheck(text) {
  return (dispatch, getstate) => {
    dispatch({
      type: "FILTER_UPDATE",
      payload: text
    });
  };
}
