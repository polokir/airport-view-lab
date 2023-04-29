import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRole, isAuthUser } from "../../redux/slices/user-slice";
import { PageHeader } from "../../components/Header/Header";


 export const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthUser);
  

  useEffect(()=>{
    dispatch(getRole());
  },[])
  // const role = useSelector(state=>state.users.role);
  // console.log("CHECK ROLE",role==="ADMIN");
  return(
    <>
    <PageHeader/>
      <h1>HOME</h1>
    </>
  )
}