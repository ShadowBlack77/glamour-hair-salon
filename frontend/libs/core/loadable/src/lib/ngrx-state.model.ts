import { LoadingState } from "./loading-state.model";

export const DEFAULT_LOADING_STATE = {
  loading: true,
  error: null,
  data: undefined
};

export const setStateAsLoading = <T>(state: LoadingState<T>) => ({
  ...state,
  loading: true,
  error: null
});

export const setStateAsError = <T>(state: LoadingState<T>, error: Error) => ({
  ...state,
  loading: false,
  error: error
});

export const patchLoadingState = <T>(state: LoadingState<T>, data: T) => ({
  ...state,
  loading: false,
  error: null,
  data
});
