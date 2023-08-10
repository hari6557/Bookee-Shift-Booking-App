import React from 'react';
import './App.css';
import AvailableShift from './Pages/AvailableShift';
import { shifts } from './Utils/constants';
import clsx from 'clsx';
import MyShift from './Pages/MyShift';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function App() {

  const [isActive, setIsActive] = React.useState<string>("");
  return (
    <RecoilRoot>
      <div className='w-full h-screen bg-[#F1F4F8]'>
        <div className='px-10'>
          <div className="flex w-[1/2] justify-evenly">
            {shifts.map((shift: any) => (
              <div
                key={shift}
                className={clsx(isActive === shift ? "text-[#004FB4] animate-pulse font-semibold" : "text-[#CBD2E1]", "tab py-5 md:text-[14px] text-[13px] flex justify-center w-full cursor-pointer")}
              >
                <span onClick={()=>setIsActive(shift)}>
                  {shift}
                </span>
              </div>
            ))}
          </div>
        </div>
        {isActive === 'My Shifts' ? <MyShift/> : <AvailableShift/>}
      </div>
    </RecoilRoot>
  );
}

export default App;
