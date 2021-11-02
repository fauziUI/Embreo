import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { getCartData } from '../redux/actions/cart'
import { Redirect } from 'react-router-dom'
import Popup from '../components/PopupAdmin'

class EventAdmin extends React.Component {
    state = {
        isAddMode:false,
        isViewMode:false,
        indexView : 0,
        detailOrder:[],
        name : "" ,
        company: "" ,
        idEvent: 0,
 
    }
    
    componentDidMount(){
        this.props.getCartData(this.props.userGlobal.id_user)
        console.log(this.props.cartGlobal.cartList)
        console.log(this.props.userGlobal)
        Axios.get(`${API_URL}/carts/get-order`,{ 
            params:{vendor_name: this.props.userGlobal.username}
        })
        .then((result)=>{
            this.setState({detailOrder: result.data})
            console.log(this.state.detailOrder)
        })
    }

    viewEventHandler = (condition, idx) => {
        this.setState({isViewMode: condition})
        this.setState({indexView: idx })
    }

    inputHandler = (event)=>{
        const {name, value} = event.target
        this.setState({[name]: value})
    }
    
    decisionBtn1 = (decision,id_proposed) =>{
        Axios.patch(`${API_URL}/carts/reject-order/${id_proposed}`,{
            status: "Reject",
            remark: decision,
        })
        .then(()=>{
            this.componentDidMount()
        })
    }

    decisionBtn2 = (decision,id_proposed) =>{
        Axios.patch(`${API_URL}/carts/confirm-order/${id_proposed}`,{
            status: "Approve",
            confirmed_date: decision,
        })
        .then(()=>{
            this.componentDidMount()
        })
    }

renderCart = () => {
    return this.state.detailOrder.map((val,idx)=>{
        
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
                 <h1>Confirm Event Vendor </h1>
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
                        </table>
                    </div>
                    <Popup trigger = {this.state.isViewMode===true} setTrigger={this.viewEventHandler} decision1={this.decisionBtn1} decision2={this.decisionBtn2} val={this.state.detailOrder} idx = {this.state.indexView}>
                    </Popup>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventAdmin);