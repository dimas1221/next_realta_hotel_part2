import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doGetFaphoSucced,
  doGetFaphoFaied,
  doUploadFaphoSucced,
  doUploadFaphoFailed,
} from "../action/actionFaphoAdmin";

function* handlerFapho(): any {
  try {
    const result = yield call(ApiHotel.getFaphoAdmin);
    yield put(doGetFaphoSucced(result.data));
  } catch (error) {
    yield put(doGetFaphoFaied(error));
  }
}

// insert
function* handlerUploadFapho(action: any): any {
  try {
    // console.log(Object.fromEntries(action.payload.entries()));
    const hasil = yield call(ApiHotel.uploadFapho, action.payload);
    yield put(doUploadFaphoSucced(hasil.data.result.res));
    console.log(hasil);

    // console.log(hasil);
  } catch (error) {
    yield put(doUploadFaphoFailed(error));
  }
}
// function* handlerUploadFapho(action: any) {
//   try {
//     const { file, faphoFaci } = action.payload;
//     yield call(ApiHotel.uploadFapho, file, faphoFaci);
//     yield put(doUploadFaphoSucced(action.payload));
//   } catch (error) {
//     yield put(doUploadFaphoFailed(error));
//   }
// }

export { handlerFapho, handlerUploadFapho };
