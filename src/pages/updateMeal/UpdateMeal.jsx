import './Updatemeal.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoImage from '../../assets/noImage.jpg';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useEffect, useState } from 'react';
import {mealInputs} from '../../formResources';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/apiCall/uploadImage';
import Ingredients from '../../components/ingredients/Ingredients';
import Instructions from '../../components/Instructions/Instructions';
import { useParams } from 'react-router';
import { getMeal } from '../../redux/apiCall/singleCall';
import { updateMeal } from '../../redux/reducers/mealsReducer';

const UpdateMeal = (props) => {
    let {id} = useParams()
    let [file,setFile] = useState(null);
    let [data,setData] = useState({});
    let {admin} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const imgP = process.env.REACT_APP_SERVER_URL + 'images';


    useEffect(()=>{
        getMeal(admin,id,setData);
    },[id])

    const handleChangle = (e)=>{
        setData({...data,[e.target.name]:e.target.value});

    }

    function imageUploader(imageFile,data){
        let picName = (Date.now() + imageFile.name).toString();
        let formData = new FormData();
        formData.append('name',picName);
        formData.append('file',imageFile);
        data.image = picName;
        uploadImage(formData);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let inputData = data;
        if(file&&typeof(file)!=='string'){
            console.log('a')
            imageUploader(file,inputData)
        }else{
            inputData.image = file;
        }
        if(data?.ingredients?.image&&typeof(data.ingredients.image)!=='string'){
            imageUploader(data.ingredients.image,data.ingredients)
        }
        data?.instructions?.map((instruction)=>{
            if(instruction.image&&typeof(instruction.image)!=='string'){
                imageUploader(instruction.image,instruction)
            }
        })
        dispatch(updateMeal({admin,id,meal:inputData}))
    }

    useEffect(()=>{
        setFile(data.image)
    },[data])

  return (
    <div className='updateMeal'>
        <Sidebar />
        <div className='newContainer'>
            <Navbar />
            <div className='top'>
                <h1>Update Meal</h1>
            </div>
            <div className='bottom'>
                <div className='left'>
                    <img src={file?(typeof(file)==='string'?file.startsWith('http')?file:imgP+'/'+ file:URL.createObjectURL(file)):NoImage} alt=''/>
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit} >
                    <div className='formInput'>
                        <label htmlFor='file'>
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input type='text' className='imgUrl' placeholder=' Image URL...' onChange={(e)=>setFile(e.target.value)} />
                        <input 
                        type={`file`}
                         id='file'
                         style={{display:'none'}}
                         onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    {mealInputs?.map((input,i)=>{
                        return(
                            <div className='formInput' key={input?.id}>
                            <label>{input?.label}</label>
                            <input value={data[input.name]||''} name={input?.name} onChange={handleChangle} type={input?.type} placeholder={input?.placeholder} />
                            </div>
                        )
                    })}
                    <button type='submit'>Update</button>
                    </form>
                </div>
            </div>
            <hr style={{margin:'20px 0',border:'1px solid #ddd',height:'0'}}/>
            {data.ingredients&&<Ingredients Ingredients={data?.ingredients?._ingredients} ingredientsImage={data?.ingredients?.image} setData={setData} />}
            <hr style={{margin:'20px 0',border:'1px solid #ddd',height:'0'}}/>
            {data.instructions&&<Instructions Instructions={data?.instructions} setData={setData} />}
        </div>
    </div>
  )
}

export default UpdateMeal