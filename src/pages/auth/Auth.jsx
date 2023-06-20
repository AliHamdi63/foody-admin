import { useState } from 'react'
import './Auth.scss'
import { fetchUser } from '../../redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux'
const Auth = () => {

  let [data, setData] = useState({ email: '', password: '' });
  const dispatch = useDispatch()
  let { isFetching, err } = useSelector(state => state.auth)

  const handleChange = (e) => {
    // console.log(data)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    dispatch(fetchUser(data));
  }

  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>login</h1>
        <input type={`email`} name='email' placeholder={`Email..`} onChange={handleChange} />
        <input type={`password`} name='password' placeholder={`Password..`} onChange={handleChange} />
        <input disabled={isFetching} type={`submit`} value={'Login'} />
        {err && <span>Please try agin...</span>}
      </form>
    </div>
  )
}

export default Auth
