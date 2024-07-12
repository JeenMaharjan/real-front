import { useEffect, useState } from "react";
import "./booklist.css";
import { Space, Table, Tag } from 'antd';
// import DataTable from "../../components/dataTable/DataTable";
import {  toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";


import { allProperties , deleteProperty } from "../../action/property";
import { useSelector } from "react-redux";





const BookList = () => {
  const history = useHistory()
  const { auth } = useSelector((state) => ({ ...state }));
  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold',
      render: (sold) => (sold ? 'Yes' : 'No'),
    },
  
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record.id)}>Update</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const handleUpdate = (id) => {

    history.push(`/dashboard/property-update/${id}`)
  }
  

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this property?');

    if (isConfirmed) {
      try {
        const response = await deleteProperty(id, auth?.token);
        console.log(response);
        
        if (response) {
          toast.success('Property Deleted successfully!');
          loadPhotoAggregate();
        } else {
          toast.error('Failed to delete the property.');
        }
      } catch (error) {
        toast.error('Failed to delete the property.');
      }
    }
  };
  
  

  const [photoDatas, setPhotoDatas] = useState([])


  useEffect(() => {
    
    loadPhotoAggregate()
  
}, [])

const loadPhotoAggregate = async() =>{

  try {
    const singlePhotoCategory = await allProperties()
  
  console.log(singlePhotoCategory)
  const formattedPhotoDatas = singlePhotoCategory.map((record) => ({
    id: record._id,
    title:record.title,
    location: record.location,
    sold: record.sold
   
  }));

  setPhotoDatas(formattedPhotoDatas);
  
} catch (error) {
  
}
}






  return (
    <div className="booklist-model">
       <div className="products">
      <div className="info">
        <h1>Property Records</h1>
        
      </div>
      <Table columns={columns} dataSource={photoDatas} />;
      {/* <DataGrid rows={photoDatas} columns={photosCat} /> */}
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataGrid rows={data} columns={columns} />
      )} */}

      </div>
      
    </div>
  );
};

export default BookList;
