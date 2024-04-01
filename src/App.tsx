
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ISSUE_LOGOUT, RELOGIN_ON_RELOAD } from "./store/auth";
import Home from "./pages/home";


function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const keptToken = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate')!;
  // console.log(showCart);

  useEffect(() => {
    if(new Date(expiryDate).getTime() <= new Date().getTime()) {
      dispatch(ISSUE_LOGOUT());
    }

    if(!token && keptToken) {
      const newTimeout = new Date(expiryDate).getTime() - new Date().getTime();
      dispatch(RELOGIN_ON_RELOAD());
      OperateLogout(newTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OperateLogout = (milliseconds: number) => {
    setTimeout(() => {
      dispatch(ISSUE_LOGOUT());
      console.log('we logged out');
    }, milliseconds);
  }

  document.title = 'The Store AMST';
  

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Home />      
    </div>
  )
}

export default App
