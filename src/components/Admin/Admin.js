import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Admin.css"

export default function Admin() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [img, setImg] = useState();
//   console.log(img);
  const handleChange = (event) => {
      const formData = new FormData();
      formData.set('key', '862a4f2ff30fe49ce04b042a1a850b5a')
      formData.append('image', event.target.files[0])
      axios.post('https://api.imgbb.com/1/upload', formData)
      .then(res => {
          setImg(res.data.data.display_url)
      })
  }

  const onSubmit = data => {
      const newData = {...data, image: img};
      console.log(newData);
      
      fetch('https://floating-meadow-92941.herokuapp.com/products', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(dat => {
        console.log(dat)
        alert('Data Submitted Successfully')
    })
  };


  return (
   <div className="w-100 admin-bg pt-5">
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-11 col-sm-9 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <input className="form-control" placeholder="Product Name" {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}

        <br/>

        <input className="form-control" placeholder="Price" {...register("price", { required: true })} />
        {errors.price && <span>Price is required</span>}


        <br/>

        <input className="form-control" type="file" onChange={handleChange} />

        <br/>
        
        <input className="form-control btn btn-primary" type="submit" />
      </form>
     </div>

      </div>
     <br/><br/>

     <div>
       <ul>
         <li>
           <Link style={{listStyle: "none", color: "white"}} to="/orderList">OrderList</Link>
         </li>
       </ul>
     </div>
   </div>
  );
}