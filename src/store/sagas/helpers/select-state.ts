import { select, SelectEffect } from 'redux-saga/effects';
import { RootReducer } from './../..';

export function selectState<T>(selector: (s: RootReducer) => T): SelectEffect {
  return select(selector);
}
