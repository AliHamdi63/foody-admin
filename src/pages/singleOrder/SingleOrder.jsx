import "./SingleOrder.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const SingleOrder = () => {
    let serverPath =  process.env.REACT_APP_SERVER_URL;
    let imgP = process.env.REACT_APP_SERVER_URL + '/images';
    let {admin} = useSelector(state=>state.auth);
    let [data,setData] = useState(null);
    let {id} = useParams();

    useEffect(()=>{

        const getOrder = async()=>{
            try {
                let res = await axios.get(`${serverPath}/orders/${id}`);
                setData(res.data)
                
            } catch (err) {
                console.log(err)
            }
        }
        getOrder();

    },[id])

  return (
    <div className="order">
        <Sidebar />
        <div className="orderContainer">
            <Navbar />
            <div className="bottom">
                <div className="">
                    <h1>Order : <span>{data?._id}</span></h1>
                    <div className="userInfo">
                        <h3>User Info</h3>
                    <div className="info">
                            <span className="key">User Id: </span>
                            <span className="value">{data?.userId._id}</span>
                        </div>
                        <div className="info">
                            <span className="key">User Name: </span>
                            <span className="value">{data?.userId.userName}</span>
                        </div>
                        <div className="info">
                            <span className="key">Email: </span>
                            <span className="value">{data?.userId.email}</span>
                        </div>
                    </div>
                    <div className="productsInfo">
                        <h3>Products Info</h3>
                    {data?.products.map((product=>{
                        return (
                            <div className="product" key={product.productId._id}>
                                <div className="info">
                                <span className="key">Product ID: </span>
                                <span className="value">{product.productId._id}</span>
                                </div>
                                <div className="info">
                                <span className="key">Title: </span>
                                <span className="value">{product.productId.title}</span>
                                </div>
                                <div className="info">
                                <span className="key">Price: </span>
                                <span className="value">{product.productId.price}$</span>
                                </div>
                                <div className="info">
                                <span className="key">Quantity: </span>
                                <span className="value">{product.quantity}</span>
                                </div>
                            </div>
                        )
                    }))}
                    </div>
                </div>
                <div className="info">
                    <span className="key">Amount: </span>
                    <span className="value">{data?.amount}$</span>
                </div>
                <div className={`info`}>
                    <span className="key">Status: </span>
                    <span className={`status ${data?.status}`}>{data?.status}</span>
                    <select defaultValue={data?.status}>
                        <option selected={true} disabled={true}>change Status</option>
                        {data?.status!=="pending" &&<option value={`pending`}>Pending</option>}
                        {data?.status!=="approved"&&<option value={`approved`}>Approved</option>}
                        {data?.status!=="rejected"&&<option value={`rejected`}>Rejected</option>}
                    </select>
                    <button className="confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleOrder