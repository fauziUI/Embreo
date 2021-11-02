import React from 'react'
import '../assets/styles/popup.css'

function Popup(props){
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
                </div>
            </div>
        </div>
    ) : ""
}

export default Popup