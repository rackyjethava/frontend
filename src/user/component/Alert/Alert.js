import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resatAlert } from '../../../redux/slice/alert.slice';

function Alert(props) {

    const { color, message } = useSelector((state) => state.alert)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const dispatch=useDispatch()

    useEffect(() => {
        if (message != "") {
            enqueueSnackbar(message, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }

        const timeref=setTimeout(()=>{
            dispatch(resatAlert())
        },2000)

        return ()=> clearInterval(timeref)
    }, [message])

   
    return (
        <div>

        </div>
    );
}

export default Alert;

