import { useStore } from 'react-redux';
import { type AppStore } from 'store/store';

export const useAppStore: () => AppStore = useStore;
