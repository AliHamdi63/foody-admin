import './update.scss'

import NoImage from '../../assets/noImage.jpg';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect,useState } from 'react';
import { userInputs} from '../../formResources';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducers/usersReducer';
import { imageUploader } from '../../uploadImage';


const Update = (props) => {
    let [file,setFile] = useState(null);
    let [data,setData] = useState({});
    let dispatch = useDispatch();
    let imgP = process.env.REACT_APP_SERVER_URL + '/images';
    let {admin} = useSelector(state=>state.auth);
    let [isfetching,setFetching] = useState(false);
 

    const handleChangle = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let id = props.item._id;
        data.image = file;
        dispatch(updateUser({admin,id,user:data}));
        props?.setIsupdate(false);
    }

    useEffect(()=>{
        if(typeof(file)!=='string'&&file!==null){
          imageUploader(file,setFile,setFetching);
        }
      },[file])

      useEffect(()=>{
        setFile(props.item.image)
      },[])

  return (
    <div className='update'>
            <div className='updateContainer'>
                <div className='left'>
                    <img src={file?(typeof(file)==='string'?((file).startsWith('http')?file:imgP+'/'+file):URL.createObjectURL(file)):NoImage} alt=''/>
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit} >
                    <div className='formInput'>
                        <label htmlFor='file'>
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input 
                        type={`file`}
                         id='file'
                         style={{display:'none'}}
                         onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    {userInputs?.map((input)=>{
                        return(
                            <div className='formInput' key={input?.id}>
                            <label>{input?.label}</label>
                            <input defaultValue={props?.item[input?.name]} name={input?.name} onChange={handleChangle} type={input?.type} placeholder={input?.placeholder} />
                            </div>
                        )
                    })}
                    <button type='submit' disabled={isfetching}>Update</button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Update