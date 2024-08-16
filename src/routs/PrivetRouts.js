import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { chaekAuth } from '../redux/slice/AuthSlice';

function PrivetRouts(props) {
    const {isAuth,user} = useSelector((state) => state.auth)
    const [loading,setloading]=useState(true)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        const cheqAuthstate=async()=>{
            try {
                console.log("isauthantication",isAuth);
                
               await dispatch(chaekAuth())
            } catch (error) {
                navigate("/Auth")
            } finally{
                setloading(false)
            }
        }
        cheqAuthstate()
        console.log("isauthantication",isAuth);
        
    },[dispatch,navigate,isAuth])

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div>
            {
                isAuth ?<Outlet /> :<Navigate to="/Auth" replace/>
            }
        </div>
    );
}

export default PrivetRouts;