const imgP = process.env.REACT_APP_SERVER_URL + '/images'

export const userColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "User",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={imgP+'/'+params.row.image} alt="avatar" />
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
  ];

  export const mealColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Meal",
      width: 230,
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
      width: 150,
    },
  ];

  export const orderColumns = [
    {
      field:'_id',
      headerName: "Tracking ID",
      width: 200,
    },
    {
      field:'userid',
      headerName: "Customer",
      width: 200,
      renderCell :(params)=>{
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${imgP+'/'+params.row.userId.image}`} alt="avatar" />
            {params.row.userId.userName}
          </div>
        )
      }
    },
    {
      field:'createdAt',
      headerName: "Date",
      width: 100,
    },
    {
      field:'amount',
      headerName: "Amount",
      width: 100,
    },
    {
      field:'address',
      headerName: "Address",
      width: 200,
    },
    {
      field:'payment',
      headerName: "payment method",
      width: 150,
      renderCell :()=>{
        return (
          <span>Online Payment</span>
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
  
