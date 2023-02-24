import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doGetHore,
  doGetHoreSucced,
  doGetHoreFaied,
} from "../action/actionHore";

function* handlerHore(): any {
  try {
    const result = yield call(ApiHotel.getHore);
    yield put(doGetHoreSucced(result.data));
  } catch (error) {
    yield put(doGetHoreFaied(error));
  }
}

export { handlerHore };
