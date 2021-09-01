import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
      
      fetch('http://localhost:4008/products', {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <input {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}

      <br/><br/>

      <input type="file" onChange={handleChange} />

      <br/><br/>
      
      <input type="submit" />
    </form>
  );
}