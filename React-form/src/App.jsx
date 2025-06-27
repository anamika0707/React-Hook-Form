import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form';

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting}, //ye isSubmitting prevent kerta hai multiple submit mein mtlb jo 5 sec mein submit ho rha hai us time ke andar multiple time submit button na click ho ye basically bata hai ki humara submit abhi ho rha hai mtlb abhi process mein hai
  } = useForm();

  async function onSubmit(data){
    //Api call ko simulate kerte hai 
    await new Promise((resolve)=>setTimeout(resolve,5000)); //ye 5 sec baad data dikahye humare console pe mtlb ek tarah se aise dikha rha hai ki ye data backend mein ja rhA HAI
    console.log("submiting the form",data);
  }

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label >First name</label>
    <input {...register('firstName',{
      required:true,
      minLength:{value:3 ,message:"min len atleast 3"},
      maxLength:20})}/>
       {errors.firstName && <p>{errors.firstName.message}</p>} {/*//ye mssg show karega age firstname ki min length 3 se kam hui basically hum is syntax ka use ker skte hai validation ke liye aur uske saaath error ko show kerne ke liye */}
     {/* include validation with required or other standard HTML validation rules */}

    </div>
    <br/>
    <div>
      <label >Middle name</label>
     <input {...register('middleName')}></input> {/*//ye tareeka hai actual mein help kerta hai form ke data ko actual mein track kerne mein */}
    </div>
      <br/>
    <div>
      <label >Last name</label>
    <input {...register('lastName')}></input>
    </div>
      <br/>
     <input type="submit" disabled={isSubmitting} value={isSubmitting?"Submitting":"Submit"}></input> {/*//yaha agr form submit ho rha hoga to isSubmitting ki value true hogi hence submit button disable ho jayegi jisse multiple submit nhi ho payega */}
   </form>
  )
}

export default App
