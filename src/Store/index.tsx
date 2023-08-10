import { atom } from "recoil";
import { FormattedData } from "./Store";

export const shiftData = atom({
    key: 'shiftData',
    default: []
})

export const formattedData = atom<FormattedData[]>({
    key: 'formattedData',
    default: []
})
