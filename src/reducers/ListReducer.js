// @flow
import _ from "lodash";
const Fuse = require("fuse.js");
var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["make", "author.firstName"]
};

export function searchDataFilter(list, text, sortBy, filterBy) {
  console.log(list, text, "list, textlist, textlist, text");
  if (text === "") {
    return list;
  }
  var fuse = new Fuse(list, options); // "list" is the item array
  var result = fuse.search(text);
  if (sortBy === "Descending") {
    result = _.orderBy(result, [filterBy ? filterBy : "make"], ["desc"]); // Use Lodash to sort array by 'name'
  } else {
    result = _.orderBy(result, [filterBy ? filterBy : "make"], ["asc"]); // Use Lodash to sort array by 'name'
  }
  return result;
}

export function sortData(list, sortBy, filterBy) {
  let result = list;
  var fuse = new Fuse(list, options); // "list" is the item array
  if (sortBy === "Descending") {
    result = _.orderBy(result, [filterBy ? filterBy : "make"], ["desc"]); // Use Lodash to sort array by 'name'
  } else {
    result = _.orderBy(result, [filterBy ? filterBy : "make"], ["asc"]); // Use Lodash to sort array by 'name'
  }
  return result;
}

const INITIAL_STATE = {
  loading: false,
  listData: null,
  sortBy: null,
  filterBy: null,
  carData: []
};

function listReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "LIST_GET_SUCCESS":
      return Object.assign({}, state, {
        listData: action.payload,
        carData: action.payload,
        loading: false
      });
    case "SEARCH_SUCCESS":
      const searchData = searchDataFilter(
        state.carData,
        action.payload,
        state.sortBy,
        state.filterBy
      );
      console.log(searchData, state.carData, "searchData");
      return Object.assign({}, state, {
        listData: searchData,
        loading: false
      });
    case "SORT_UPDATE":
      const sortedData = sortData(
        state.listData,
        action.payload,
        state.filterBy
      );
      return Object.assign({}, state, {
        listData: sortedData,
        sortBy: action.payload,
        loading: false
      });
    case "FILTER_UPDATE":
      const filterData = sortData(
        state.listData,
        state.payload,
        action.payload.toLowerCase()
      );
      return Object.assign({}, state, {
        listData: filterData,
        filterBy: action.payload.toLowerCase(),
        loading: false
      });
    default:
      return state;
  }
}

export default listReducer;
