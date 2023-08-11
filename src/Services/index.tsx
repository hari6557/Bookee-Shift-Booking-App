// useShiftActions.ts
import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { Shift, loadingIds, shiftsState } from '../Store';


export const useShiftActions = () => {
  const [loadingId, setLoadingId] = useRecoilState(loadingIds);
  const setShifts = useSetRecoilState(shiftsState);
  const [shifts, updateShifts] = useRecoilState(shiftsState);

  const getShifts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/shifts');
      const data: Shift[] = response.data;
      const shiftsById = data.reduce((acc, shift) => ({ ...acc, [shift.id]: shift }), {});
      setShifts(shiftsById);
    } catch (error) {
      console.error(error);
    }
  }, [setShifts]);

  const bookShift = useCallback(async (id: string) => {
    setLoadingId(prev => ({ ...prev, [id]: true }));
    try {
      await axios.post(`http://localhost:8080/shifts/${id}/book`, { id });
      setLoadingId(prev => ({ ...prev, [id]: false }));
      updateShifts({
        ...shifts,
        [id]: {
          ...shifts[id],
          booked: true,
        },
      });
    } catch (error : any) {
      setLoadingId(prev => ({ ...prev, [id]: false }));
      throw Error(error.response?.data?.message || "An error occurred while booking the shift");
    }
  }, [shifts, updateShifts]);

  const cancelShift = useCallback(async (id: string) => {
    setLoadingId(prev => ({ ...prev, [id]: true }));
    try {
      await axios.post(`http://localhost:8080/shifts/${id}/cancel`, { id });
      setLoadingId(prev => ({ ...prev, [id]: false }));
      updateShifts({
        ...shifts,
        [id]: {
          ...shifts[id],
          booked: false,
        },
      });
    } catch (error: any) {
      setLoadingId(prev => ({ ...prev, [id]: false }));
      throw Error(error.response?.data?.message || "An error occurred while cancelling the shift");
    }
  }, [shifts, updateShifts]);

  return { getShifts, bookShift, cancelShift };
};
