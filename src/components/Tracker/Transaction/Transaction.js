import React from "react";
import '../Tracker.css'

const Transaction = props => {
    return (
        <div>
            <li>
                <div>{props.name}</div>
                <div>{props.type === 'deposit' ? (
                    <span className="deposit"> +{props.price}</span> )
                    : (<span className="expense"> -{props.price}</span>)
                    }
                </div>

            </li>
        </div>
    );
}


export default Transaction;