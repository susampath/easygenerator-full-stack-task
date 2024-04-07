import store from "store2";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

// returns true or false
const hasData = (key) =>
  store.has(key) && !isNil(store.get(key)) && !isEmpty(store.get(key));
const getSingleData = (key) => store.get(key);

const setSingleData = (key, value) => {
  store.set(key, value);
};

// removes key and its data, then returns the data or alt, if none
const removeSingleData = (key) => {
  store.remove(key);
};

export { hasData, getSingleData, setSingleData, removeSingleData };
