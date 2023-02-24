import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doGetFaciPriceHistorySucced,
  doGetFaciPriceHistoryFaied,
} from "../action/actionFPH";

function* handlerFPH(): any {
  try {
    const result = yield call(ApiHotel.getFaciPricehistory);
    yield put(doGetFaciPriceHistorySucced(result.data));
  } catch (error) {
    yield put(doGetFaciPriceHistoryFaied(error));
  }
}

export { handlerFPH };
