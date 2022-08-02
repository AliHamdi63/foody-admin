import './New.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoImage from '../../assets/noImage.jpg';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from 'react';
import {userInputs,usertitle,mealInputs,mealtitle} from '../../formResources';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/reducers/usersReducer';
import { uploadImage } from '../../redux/apiCall/uploadImage';
import { addMeal } from '../../redux/reducers/mealsReducer';
import Ingredients from '../../components/ingredients/Ingredients';
import Instructions from '../../components/Instructions/Instructions';

const New = (props) => {
    
    let [file,setFile] = useState(null);
    let loc = useLocation();
    let [inputs,setInputs] = useState([]);
    let [title,setTitle] = useState(null);
    let [data,setData] = useState({});
    let dispatch = useDispatch();
    let {admin} = useSelector(state=>state.auth);
    let [empty,setEmpty] = useState(false);
    let [empty2,setEmpty2] = useState(false);
    let URLStr = useRef();

    useEffect(()=>{
        switch(loc.pathname){
            case '/addUser':
                    setInputs(userInputs);
                    setTitle(usertitle);
                    break;
            case '/addMeal':
                setInputs(mealInputs);
                setTitle(mealtitle);
        }
    },[loc])

    const handleChangle = (e)=>{
        setData({...data,[e.target.name]:e.target.value});

    }

    function imageUploader(imageFile,data){
        let picName = (Date.now() + imageFile.name).toString();
        console.log(picName)
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
            imageUploader(file,inputData)
        }else{
            data.image = file;
        }
        if(data?.ingredients?.image&&typeof(data.ingredients.image)!=='string'){
            imageUploader(data.ingredients.image,data.ingredients)
        }
        data?.instructions?.map((instruction)=>{
            if(instruction.image&&typeof(instruction.image)!=='string'){
                imageUploader(instruction.image,instruction)
            }
        })
        if(loc.pathname==="/addUser"){
            dispatch(addUser(inputData)); 
            console.log(inputData);  
        }else if(loc.pathname==="/addMeal"){
            dispatch(addMeal({admin,meal:inputData}));   
        }

   
        setFile(null);
        setData({})
        setEmpty(true);
        setEmpty2(true);
        URLStr.current.value = '';
    }

  return (
    <div className='new'>
        <Sidebar />
        <div className='newContainer'>
            <Navbar />
            <div className='top'>
                <h1>{title}</h1>
            </div>
            <div className='bottom'>
                <div className='left'>
                    <img src={file?(typeof(file)==='string'?file:URL.createObjectURL(file)):NoImage} alt=''/>
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit} >
                    <div className='formInput'>
                        <label htmlFor='file'>
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input ref={URLStr} type='text' className='imgUrl' placeholder=' Image URL...' onChange={(e)=>setFile(e.target.value)} />
                        <input 
                        type={`file`}
                         id='file'
                         style={{display:'none'}}
                         onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    {inputs?.map((input,i)=>{
                        return(
                            <div className='formInput' key={input?.id}>
                            <label>{input?.label}</label>
                            <input value={data[input.name]||''} name={input?.name} onChange={handleChangle} type={input?.type} placeholder={input?.placeholder} />
                            </div>
                        )
                    })}
                    <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
            <div style={{display:loc.pathname==='/addMeal'?'block':'none'}}>
            <hr style={{margin:'20px 0',border:'1px solid #ddd',height:'0'}}/>
            <Ingredients Ingredients={[]} status={'add'} setData={setData} empty={empty} setEmpty={setEmpty}/>
            <hr style={{margin:'20px 0',border:'1px solid #ddd',height:'0'}}/>
            <Instructions Instructions={[]} status='add' setData={setData} empty2={empty2} setEmpty2={setEmpty2}/>
            </div>
        </div>
    </div>
  )
}

export default New