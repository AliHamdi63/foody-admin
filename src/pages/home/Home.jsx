import './Home.scss';
import  Navbar  from '../../components/navbar/Navbar';
import  Sidebar  from '../../components/sidebar/Sidebar';
import Wedget from '../../components/wedget/Wedget';
import Feature from '../../components/feature/Feature';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
  let {users} = useSelector(state=>state.users)
  let {admin} = useSelector(state=>state.auth)
  let serverUrl = process.env.REACT_APP_SERVER_URL;
  let [data,setData] = useState([])
  let [todayIncome,setTodayIncome] = useState(null);

  const getMonth = (monthNum)=>{
    switch(monthNum){
      case 1 : return 'January'; break;
      case 2 : return 'February'; break;
      case 3 : return 'March'; break;
      case 4 : return 'April'; break;
      case 5 : return 'May'; break;
      case 6 : return 'June'; break;
      case 7 : return 'July'; break;
      case 8 : return 'August'; break;
      case 9 : return 'September'; break;
      case 10 : return 'October'; break;
      case 11 : return 'November'; break;
      case 12 : return 'December'; break;
    }
  }

  useEffect(()=>{
    const getIncome = async()=>{
      let res =await axios.get(`${serverUrl}orders/monthly/income`,{
        headers:{token:admin.token}
      })
      
      res.data&&setData(res.data.map((m)=>{
        return (
            {
              name: getMonth(m._id),
              Total : m.total
            }
        )
      }))
    }

    getIncome();
  },[])

  useEffect(()=>{
    const gettodayIncome = async()=>{
      let res =await axios.get(`${serverUrl}orders/today/income`,{
        headers:{token:admin.token}
      })
      res.data&&setTodayIncome(res.data[0]?.total)
    }

    gettodayIncome();
  },[])

  return (
    <div className='home'>
        <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
            <Wedget type='user' amount={users.length} diff={20}/>
            <Wedget type='order' amount={100} diff={20}/>
            <Wedget type='earning' amount={100} diff={20}/>
            <Wedget type='balance' amount={100} diff={20}/>
        </div>
        <div className='charts'>
            <Feature total={todayIncome}/>
            <Chart title='Last 6 months (income)' data={data} aspect={3/1}/>
        </div>
        <div className='tableContainer'>
          <p>Latest Transaction</p>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Home
