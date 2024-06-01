import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState, AppStore } from 'store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
