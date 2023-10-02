import React from 'react';
import "./App.css";
import {z, ZodType} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';

type FormData={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
};
function App() {
    const schema:ZodType<FormData> =z.object({
        firstName: z.string().min(2).max(30),
        lastName: z.string().min(2).max(30),
        email: z.string().email(),
        password:z.string().min(5).max(20),
        confirmPassword: z.string().min(5).max(20),
    }).refine((data)=>data.password===data.confirmPassword,{
        message:"Passwords do not match",
        path:["confirmPassword"],
    });

    const {register,
        handleSubmit,
        formState:{errors,}
        }=useForm<FormData>({resolver:zodResolver(schema)});

    const submitData=(data:FormData)=>{
        console.log("It worked",data)
    }
    return (
    <div className='container-fluid'>
        <div className='row mt-5'>
            <div className='col'></div>
            <div className='col-md-4 p-md-4'>
            <form onSubmit={handleSubmit(submitData)}>
                <h3>Registration</h3>
                <div>
                    <label htmlFor='fname'></label>
                    <input type='text'{...register("firstName")} placeholder='Enter your name' className='form-control'/>
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
                <div>
                    <label htmlFor='lname'></label>
                    <input type='text' {...register("lastName")} placeholder='Enter your last name' className='form-control'/>
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
                <div>
                    <label htmlFor='email'></label>
                    <input type='email' {...register("email")} placeholder='Enter your email' className='form-control'/>
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor='password'></label>
                    <input type='password' {...register("password")} placeholder='Enter your password' className='form-control'/>
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor='password'></label>
                    <input type='password' {...register("confirmPassword")} placeholder='Confrim your password' className='form-control'/>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>
                <div>
                    <button type='submit' className='btn btn-primary mt-2'>Register now</button>
                </div>
            </form>
            </div>
            <div className='col'></div>
        </div>
    </div>
  );
}

export default App;
