import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/reducer/counter.slice';

function Counter(props) {
    const dispatch = useDispatch()
    const countValue = useSelector(state => state.counter)
    const handleIncr = () => {
        dispatch(increment())
    }

    const handleDecr = () => {
        dispatch(decrement())

    }
    return (
        <div>
            <h2>counter slice</h2>
            <button onClick={handleIncr}>+</button>
            {countValue.count}
            <button onClick={handleDecr}>-</button>

        </div>
    );
}

export default Counter;