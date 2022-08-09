import {getAddress} from './address';
const imgP = process.env.REACT_APP_SERVER_URL + 'images'

export const userColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "User",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${(params.row.image).startsWith('http')?params.row.image:imgP+'/'+params.row.image}`} alt="avatar" />
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 230,
    },
  ];

  export const mealColumns = [
    { field: "_id", headerName: "ID", width: 240 },
    {
      field: "name",
      headerName: "Meal",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${(params.row.image).startsWith('http')?params.row.image:imgP+'/'+params.row.image}`} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "category",
      headerName: "category",
      width: 120,
    },
    {
      field: "cuisine",
      headerName: "cuisine",
      width: 120,
    },
  ];

  export const orderColumns = [
    {
      field:'_id',
      headerName: "Order ID",
      width: 250,
    },
    {
      field:'user',
      headerName: "Customer",
      width: 180,
      renderCell :(params)=>{
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${params.row.user.image.startsWith('http')?params.row.user.image:imgP+'/'+params.row.user.image}`} alt="avatar" />
            {`${params.row.user.firstName} ${params.row.user.lastName}`}
          </div>
        )
      }
    },
    {
      field:'createdAt',
      headerName: "Date",
      width: 100,
      renderCell :(params)=>{
        return (
          <span>{(params.row.createdAt).toDateString()}</span>
        )
      }
    },
    {
      field:'amount',
      headerName: "Amount",
      width: 100,
    },
    {
      field:'address',
      headerName: "Address",
      width: 250,
      renderCell :(params)=>{
        return (
          <span>{getAddress(params.row.user.address)}</span>
        )
      }
    },
    {
      field:'payment',
      headerName: "payment method",
      width: 150,
      renderCell :(params)=>{
        return (
          <span>{params.row.methodOfPayment}</span>
        )
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        )
      },
    }
  ]
  
