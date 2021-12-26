import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example"));
    return (
      <form className="shipment-form"  onSubmit={handleSubmit(onSubmit)}><br />
        <input placeholder="Your Name" defaultValue={loggedInUser.name} {...register("name", { required: true })} /> 
        {errors.name && <span>Name is required</span>}

        <input placeholder="Your email" defaultValue={loggedInUser.email} {...register("email", { required: true })} /> 
        {errors.email && <span>Email is required</span>}

        <input placeholder="Your Address" {...register("address", { required: true })} /> 
        {errors.address && <span>Address is required</span>}

        <input placeholder="Your Phone Number" {...register("phone", { required: true })} /> 
        {errors.phone && <span style={{color:"red"}}>Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;