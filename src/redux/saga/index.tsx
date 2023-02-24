import { takeEvery, all, takeLatest } from "@redux-saga/core/effects";
import ActionTypes from "../constant/actionType";
import { handlerCardHotel } from "./hotelSaga";
import { handlerFaciAllHotel } from "./faciAllHotelSaga";
import {
  handlerDeleteHotel,
  handlerHotelAddr,
  handlerHotelAdmin,
  handlerInsertHotel,
  handlerUpdateHotel,
} from "./hotelAdminSaga";
import {
  handlerDeleteFaci,
  handlerGetFaciAdmin,
  handlerGetMaxIdRoom,
  handlerInsertFaciAdmin,
  handlerUpdateFaci,
} from "./faciAdminSaga";
import { handlerHore } from "./horeSaga";
import { handlerFapho, handlerUploadFapho } from "./faphoAdminSaga";
import { handlerFPH } from "./fphSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.GET_CARDHOTEL, handlerCardHotel),
    takeEvery(ActionTypes.GET_FACIALLHOTEL, handlerFaciAllHotel),
    takeEvery(ActionTypes.GET_HORE, handlerHore),
    takeEvery(ActionTypes.GET_HOTELADMIN, handlerHotelAdmin),
    takeEvery(ActionTypes.ADD_HOTELADMIN, handlerInsertHotel),
    takeEvery(ActionTypes.DEL_HOTELADMIN, handlerDeleteHotel),
    takeEvery(ActionTypes.UPDATE_HOTELADMIN, handlerUpdateHotel),
    takeEvery(ActionTypes.GET_FACIADMIN, handlerGetFaciAdmin),
    takeEvery(ActionTypes.GET_MAXIDROOM, handlerGetMaxIdRoom),
    takeEvery(ActionTypes.ADD_FACIADMIN, handlerInsertFaciAdmin),
    takeEvery(ActionTypes.GET_ADDRSEARCH, handlerHotelAddr),
    takeEvery(ActionTypes.DEL_FACI, handlerDeleteFaci),
    takeEvery(ActionTypes.GET_FAPHO, handlerFapho),
    takeEvery(ActionTypes.GET_FACIPRICEHISTORY, handlerFPH),
    takeEvery(ActionTypes.UPDATE_FACI, handlerUpdateFaci),
    takeEvery(ActionTypes.UPLOAD_FAPHO, handlerUploadFapho),
  ]);
}

export default watchAll;
