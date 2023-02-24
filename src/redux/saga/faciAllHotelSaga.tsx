import { call, put } from "@redux-saga/core/effects";
import {
  doAllFaciHotelReqFailed,
  doAllFaciHotelReqSuccess,
} from "../action/actionFindFaciAllhotel";
import ApiHotel from "../service/apiHotel";

function* handlerFaciAllHotel(): any {
  try {
    const result = yield call(ApiHotel.getFaciAllHotel);
    yield put(doAllFaciHotelReqSuccess(result.data));
  } catch (err) {
    yield put(doAllFaciHotelReqFailed(err));
  }
}

export { handlerFaciAllHotel };
