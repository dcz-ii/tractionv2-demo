import { GET_DATA } from '../types';
import { takeLatest, put, call } from "redux-saga/effects";

function* getDataSaga(param) {
    try {
        console.log('SAGA-TEST')
    } catch (error) {
        console.log(error)
    }
}

export function* watchGlobal() {
  yield takeLatest(GET_DATA, getDataSaga);
}