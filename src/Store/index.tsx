import { atom, selector } from 'recoil';
import { getFormattedDate } from '../Utils/utils';

export interface Shift {
  id: string;
  booked: boolean;
  area: string;
  endTime: number;
  startTime: number
}

export const shiftsState = atom<Record<string, Shift>>({
  key: 'shiftsState',
  default: {},
});

export const loadingIds = atom<Record<string, boolean>>({
  key: 'loadingIds',
  default: {},
});

export const bookedShiftsSelector = selector({
  key: 'bookedShiftsSelector',
  get: ({ get }) => {
    const data = get(shiftsState);
    return Object.keys(data).filter((id) => data[id].booked === true);
  },
});

export const citiesSelector = selector({
  key: 'citiesSelector',
  get: ({ get }) => {
    const data = get(shiftsState);
    return Object.keys(data).map((id)=> data[id].area);
  }
})

export const datesSelector = selector({
  key: 'datesSelector',
  get: ({ get }) => {
    const data = get(shiftsState);
    return Object.keys(data).map((id)=>getFormattedDate(data[id].startTime))
  }
})