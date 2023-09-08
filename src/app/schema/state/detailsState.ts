import { atom } from "recoil";

//export const showDetailsState = atom<{ [key: string]: boolean }>({
export const showDetailsState = atom<number | null>({
    key: 'showDetailsState',
    default: null,
});