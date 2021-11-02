import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { getCartData } from '../redux/actions/cart'
import { Redirect } from 'react-router-dom'
import Popup from '../components/PopupUser'

class EventUser extends React.Component {
    state = {
        isAddMode:false,
        isViewMode:false,
        indexView : 0,
        detailEvent:[],
        name : "" ,
        company: "" ,
        idEvent: 0,
        location: "",
        date1:"",
        date2:"",
        date3:"",
    }
    
    componentDidMount(){
        this.props.getCartData(this.props.userGlobal.id_user)
        console.log(this.props.cartGlobal.cartList)
        console.log(this.props.userGlobal)
        Axios.get(`${API_URL}/carts/get-detail`,{ 
            params:{userId: this.props.userGlobal.id_user}
        })
        .then((result)=>{
            this.setState({detailEvent: result.data})
            console.log(this.state.detailEvent)
        })
        
    }

    viewEventHandler = (condition, idx) => {
        this.setState({isViewMode: condition})
        this.setState({indexView: idx })
    }

    
    addModeToggle = ()=> {
        this.setState({isAddMode: !this.state.isAddMode})
    }
    
    inputHandler = (event)=>{
        const {name, value} = event.target
        this.setState({[name]: value})
    }
    
    payBtnHandler = () =>{
        const d = new Date()
        Axios.post(`${API_URL}/carts/add-proposed`,{
            id_event : parseInt(this.state.idEvent),
            id_user : this.props.userGlobal.id_user,
            proposed_date1 : this.state.date1,
            proposed_date2 : this.state.date2,
            proposed_date3 : this.state.date3,
            proposed_location : this.state.location,
            date_created :  `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
        })
        .then((res)=>{alert("suscess Add Proposed Event")
        this.componentDidMount()
        
    })
}

renderCart = () => {
    return this.props.cartGlobal.cartList.map((val,idx)=>{
        
        return (
            <tr>
                <td className="align-middle">{val.event_name}</td>
                <td className="align-middle">{val.vendor_name}</td>
                <td className="align-middle">
                    {
                        val.confirmed_date?
                        <div>{val.confirmed_date.substring(0, 10)}</div>
                        :
                        <>
                        <div>{val.proposed_date1.substring(0, 10)}</div>
                        <div>{val.proposed_date2.substring(0, 10)}</div>
                        <div>{val.proposed_date3.substring(0, 10)}</div>
                        </>
                    }
                </td>
                <td className="align-middle">{val.status}</td>
                <td className="align-middle">{val.date_created.substring(0, 10)}</td>
                
                <td className="align-middle">
                    <button onClick={()=> this.viewEventHandler(true, idx) } className="btn btn-danger">View </button>
                </td>
            </tr>
        )
    })
}

render(){
        if (this.props.userGlobal.status !== "verified"){
            return <Redirect to="/Login" />
        }
        return (
            <div className="p-5 text-center">
                 <h1>Proposed Event</h1>
                <div className="row mt-5">
                    <div className="text-center">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Event Name</th>
                                    <th>Vendor Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Date Created</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot className="bg-light">
                                <tr>
                                    <td colSpan="6">
                                        <button onClick={this.addModeToggle} className="btn btn-success">
                                            Add Proposed Event
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <Popup trigger = {this.state.isViewMode} setTrigger={this.viewEventHandler} val={this.props.cartGlobal.cartList} idx = {this.state.indexView}>
                        
                    </Popup>
                {
                    this.state.isAddMode?
                    <div className="">
                        <div className="card text-lg-start col-6" style={{left:"25%"}} >
                            <div className="card-header">
                                <strong>Add Proposed Event</strong>
                            </div>
                            <div className="card-body border-top">
                            <fieldset disabled>
                                <label htmlFor="name">Name</label>
                                <input value={this.props.userGlobal.username} onChange={this.inputHandler} type="text" className="form-control mb-3 " name="name" />
                                <label htmlFor="company">Company</label>
                                <input value={this.props.userGlobal.company} onChange={this.inputHandler} type="text" className="form-control mb-3 " name="company" />
                            </fieldset>
                                <label htmlFor="event">Choose Event</label>
                                <select onChange={this.inputHandler} name="idEvent" className="form-control">
                                    <option value="">~ Choose one ~</option>
                                    {this.state.detailEvent.map((val)=>{
                                        return (<option value={val.id_event}>{val.event_name}</option>)})
                                    }
                                </select>
                                <label htmlFor="location">Location</label>
                                <input onChange={this.inputHandler} type="text" className="form-control" name="location" />
                                <label htmlFor="date1">Proposed Date1</label>
                                <input onChange={this.inputHandler} type="date" className="form-control" name="date1" />
                                <label htmlFor="date2">Proposed Date2</label>
                                <input onChange={this.inputHandler} type="date" className="form-control" name="date2" />
                                <label htmlFor="date3">Proposed Date3</label>
                                <input onChange={this.inputHandler} type="date" className="form-control" name="date3" />
                            </div>
                            <div className="card-footer">
                                <button onClick={this.payBtnHandler} className="btn btn-success mx-1">Propose</button>
                            </div>
                        </div>

                    </div>
                    : null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartGlobal : state.cart,
        userGlobal : state.user
    }
}

const mapDispatchToProps = {
    getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUser);