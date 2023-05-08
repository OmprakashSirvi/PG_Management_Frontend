import React, { useState } from 'react'
import { Link, Form } from 'react-router-dom'
import "./register.css"
const Register = () => {
    const [details, setDetails] = useState({
        fname: "",
        lname: "",
        email:"",
        password:"",
        mono:"",
        gender:""
    });

    const handleSubmit=()=>{
        console.log(details)
    }
   
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDetails(details => ({...details, [name]: value}))
        }
    return (
        <div
            className="flex items-center justify-center"
            style={{

                padding: "0px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* <pre>
    {JSON.stringify(details,2,undefined)}
  </pre> */}
            <div
                className=" bg-gray-700 sd:w-full md:px-5 md:py-5 lg:w-1/3 py-10 text-white h-max "
                style={{ padding: "10px 50px", }}
            >
                <Form
                    className="form flex flex-col gap-2"

                    onSubmit={handleSubmit}
                >

                    <div className='flex gap-4'>
                        <div className='flex flex-col items-start gap-2'>

                            <label htmlFor="fname">First Name</label>
                            <input
                                type="text"
                                id="fname"
                                className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                                name="fname"
                                onChange={handleChange}
                                value={details.fname}
                            />
                        </div><div className='flex flex-col items-start gap-2'>

                            <label htmlFor="Username">Last Name</label>
                            <input
                                type="text"
                                id="lname"
                                className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                                name="lname"
                                onChange={handleChange}
                                value={details.lname}
                            />
                        </div>

                    </div>
                    <div className='flex flex-col items-start gap-2'>

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                            name="email"
                            onChange={handleChange}
                                value={details.email}
                        />
                    </div>

                    <div className='flex flex-col items-start gap-2'>

                        <label htmlFor="Password">Password</label>
                        <input
                            type="password"
                            id="Password"
                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                            name='password'
                            onChange={handleChange}
                            value={details.password}
                        />
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor="mono">Mobile Number</label>

                        <input
                            type="number"
                            id="mono"
                            name='mono'
                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                            onChange={handleChange}
                            value={details.mono}

                        />
                    </div>
                    <div className='flex flex-col items-start gap-2'>

                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                            onChange={handleChange}
                           

                        >
                            <option selected disabled>
                                Select Gender
                            </option>

                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>

                        </select>
                    </div>

                    <button
                        type="submit"
                        className=" hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full" style={{ backgroundColor: "#8b5cf6", width: "100%" }}
                    >
                        Register
                    </button>

                    <div className="mt-3">
                        <Link to={"/login"} className="nav-link ">
                            {" "}
                            Already Have an Account?{" "}
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register