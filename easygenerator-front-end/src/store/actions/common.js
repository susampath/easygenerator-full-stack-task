import { v1 as uuidv1 } from "uuid";

import * as commonReducer from "../reducers/common";
import { TOAST_ALERT_TYPES } from "../../helpers/common";

/* -------------------------------------------------------------------------- */
/*                                 Toast alert                                */
/* -------------------------------------------------------------------------- */
export const showToastAlert = (data) => (dispatch) => {
  data.id = uuidv1();
  data.show = true;
  dispatch(commonReducer.SHOW_TOAST_ALERT(data));
};

export const hideToastAlert = (id) => (dispatch) => {
  dispatch(commonReducer.HIDE_TOAST_ALERT(id));
};

export const showErrorAlert = (data) => (dispatch) => {
  data.type = TOAST_ALERT_TYPES.ERROR.type;
  dispatch(showToastAlert(data));
};

export const showSuccessAlert = (data) => (dispatch) => {
  data.type = TOAST_ALERT_TYPES.SUCCESS.type;
  dispatch(showToastAlert(data));
};
