import './update.scss'

import NoImage from '../../assets/noImage.jpg'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect,useState } from 'react';
import { userInputs} from '../../formResources';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducers/usersReducer';
import { uploadImage } from '../../redux/apiCall/uploadImage';


const Update = (props) => {
    let [file,setFile] = useState(null);
    let [data,setData] = useState({});
    let dispatch = useDispatch();
    let imgP = process.env.REACT_APP_SERVER_URL + '/images';
    let {admin} = useSelector(state=>state.auth);
 

    const handleChangle = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let id = props?.item._id;
        let inputData = data;
        if(file){
        let formData = new FormData();
        let picName = Date.now() + file.name;
        formData.append('name',picName);
        formData.append('file',file);
        inputData.image = picName;
        uploadImage(formData);
        }

        dispatch(updateUser({admin,id,inputData}));
        props?.setIsupdate(false);
    }



  return (
    <div className='update'>
            <div className='updateContainer'>
                <div className='left'>
                    <img src={file?URL.createObjectURL(file):props?.item?.image?`${imgP}/${props?.item?.image}`:NoImage} alt=''/>
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
                    <button type='submit'>Update</button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Update