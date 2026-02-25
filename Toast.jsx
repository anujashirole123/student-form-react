import { useEffect } from "react";

export default function Toast({msg,clear}){

  useEffect(()=>{
    const t=setTimeout(clear,2000);
    return ()=>clearTimeout(t);
  },[]);

  return <div className="toast">{msg}</div>;
}