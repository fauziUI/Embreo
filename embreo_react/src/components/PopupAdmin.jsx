import React from 'react'
import '../assets/styles/popup.css'
import { useState } from 'react'

function Popup(props){
    const [decision, setdecision] = useState(0)
    const [editRemark, setEditRemark] = useState("");

    const inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        if (name === "remark") {
          setEditRemark(value);
        }
      };

    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTrigger(false)}>Close</button>
                { props.children }
            </div>
            <div className="card product-card">
                <img src={props.val[props.idx].photo_event} alt="event" height="300"/>
                <div className="mt-2">
                    <div>
                        <h6>{props.val[props.idx].event_name}</h6>
                        <span className="text-muted">Location {props.val[props.idx].proposed_location}</span>
                    </div>
                    <div >
                        <span className="text-muted">Quota {props.val[props.idx].quota} person</span>
                    </div>
                    <div>
                        <button onClick={()=> setdecision(2)}>Reject</button>
                        <button onClick={()=>setdecision(1)}>Approve</button>
                    </div>
                    <div>
                        {
                            decision===1?
                            <>
                            <button onClick={()=>props.decision2(props.val[props.idx].proposed_date1.substring(0, 10),props.val[props.idx].id_proposed)}>{props.val[props.idx].proposed_date1.substring(0, 10)}</button>
                            <button onClick={()=>props.decision2(props.val[props.idx].proposed_date2.substring(0, 10),props.val[props.idx].id_proposed)}>{props.val[props.idx].proposed_date2.substring(0, 10)}</button>
                            <button onClick={()=>props.decision2(props.val[props.idx].proposed_date3.substring(0, 10),props.val[props.idx].id_proposed)}>{props.val[props.idx].proposed_date3.substring(0, 10)}</button>
                            </>
                            : 
                            decision===2?
                            <>
                            <label htmlFor="reason">Reason</label>
                            <input onChange={inputHandler} type="text" name="remark"/>
                            <button onClick={()=>props.decision1(editRemark,props.val[props.idx].id_proposed)}>input</button>
                            </>
                            : null
                        }
                    </div>
        </div>
            </div>
        </div>
    ) : ""
}

export default Popup