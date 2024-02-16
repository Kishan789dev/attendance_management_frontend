import React, { useState } from 'react';
import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";




// const onClickHandler = () => navigate(`/product/123`)


import axios from '../../../api/axios'
import AuthContext from '../../../Context/AuthProvider';
import { Navigate } from 'react-router-dom';

// import React, { useState, useEffect } from 'react';
// import { useContext } from 'react';
// import AuthContext from '../../../Context/AuthProvider';

const Principle = () => {
    const navigate = useNavigate()
    // const { setAuth } = useContext(AuthContext);
    const { setAuth } = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState('');
    const [Success, setSuccess] = useState(false);
    const formatTime = (timestamp) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC',
        };

        const formattedTime = new Date(timestamp).toLocaleString('en-US', options);
        return formattedTime;
    };

    const [studentForm, setStudentForm] = useState({
        name: '',
        email: '',
        address: '',
        class: '',
        password: ''
    });
    const [teacherForm, setTeacherForm] = useState({
        name: '',
        email: '',
        address: '',
        password: ''
    });
    const [teacherAttendance, setTeacherAttendance] = useState([]);
    console.log("kkkk", teacherAttendance)
    const [teacherId, setTeacherId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isTableVisible, setIsTableVisible] = useState(false);
    // const [errMsg, setErrMsg] = useState('');

    const [selectedRole, setSelectedRole] = useState('teacher');



    // const handleFetchTeacherAttendance = async () => {

    //     // const { setAuth } = useContext(AuthContext)

    // }


    // useEffect(() => {
    //     setErrMsg('')

    // }, [teacherForm])

    // useEffect(() => {
    //     setErrMsg('')

    // }, [studentForm])

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    //    teacher****************************

    const handleTeacherInputChange = (e) => {
        setTeacherForm({
            ...teacherForm,
            [e.target.name]: e.target.value,
        });
    };

    var delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    

 
    const handleLogout = () => {
    delete_cookie('token')
    navigate('/login')

    };
    const handleAddTeacher = async (e) => {
        // Implement logic to add student data, e.g., send to backend
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9800/teacher", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({
                    "name": teacherForm.name,
                    "email": teacherForm.email,
                    "address": teacherForm.address,
                    "password": teacherForm.password
                }),
            });

            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ setTeacherForm, roles, accessToken });
            setTeacherForm({
                name: '',
                email: '',
                address: '',
                password: ''
            });

            if (response.status === 200) {
                setSuccess(true);
                const dataa=response.json();   
                alert(dataa)

                console.log("success login")
            }
        } catch (err) {
            console.log("failed login");
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }


    }



    // student

    const handleAddStudent = (e) => {

        setStudentForm({
            ...studentForm,
            [e.target.name]: e.target.value,
        });

    };
    const handleSubmitStudent = async (e) => {
        // Implement logic to add student data, e.g., send to backend
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/student", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({
                    "name": studentForm.name,
                    "email": studentForm.email,
                    "address": studentForm.address,
                    "class": parseInt(studentForm.class),
                    "password": studentForm.password
                }),
            });

            console.log(JSON.stringify(response?.data));

            if (response.status === 200) {
                setSuccess(true);
                const d = await response.json();
                console.log(d)
                alert(d)
                // console.log("Success: Student added");
            }
        } catch (err) {
            console.log("Failed to add student");
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing or invalid student data');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Failed to add student');
            }
        }

        // Reset the form after submission
        setStudentForm({
            name: '',
            email: '',
            address: '',
            class: '',
            password: ''
        });

    }



    const handleFetchTeacherAttendance = async (e) => {
        e.preventDefault();
        console.log("tid", teacherId)
        console.log("tid", selectedMonth)
        console.log("tid", selectedYear)
        try {
            const response = await fetch("http://localhost:9800/teacherattendance", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: "include",teacherattendance
                credentials: "include",
                body: JSON.stringify({
                    "tid": parseInt(teacherId),
                    "month": parseInt(selectedMonth),
                    "year": parseInt(selectedYear)
                }),
            });
            // const response = await fetch(
            //     `http://localhost:9800/teacher/attendance?teacherId=${teacherId}&month=${selectedMonth}&year=${selectedYear}`,
            //     {
            //         method: 'GET',
            //         headers: { 'Content-Type': 'application/json' },
            //         withCredentials: 'include',
            //     }
            // );ml-36



            if (response.status === 200) {
                const data = await response.json()
                if(data.error!=null)
                alert(data.error)
                console.log("attendance data ", data)
            setTeacherAttendance([...data]);

                console.log("attendance data ", teacherAttendance)

                setIsTableVisible(true);
                console.log('Success: Teacher attendance fetched');
            } else {
                console.log("failed", response.status)
            }
        } catch (err) {
            // console.log
            console.log('Failed to fetch teacher attendance');
            setIsTableVisible(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Failed to fetch teacher attendance');
            }

        }
        console.log("2333", teacherAttendance)

    }
    // };
    // const Principle = () => {





    return (
        <>

            <div className='flex flex-row bg-red-800 gap-10'>
                  <div className="bg-white p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Logout</h2>
                            <button
                                type="button"
                                className="button-style bg-red-500 hover:bg-red-600 rounded-xl p-3"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                <div className="min-h-screen flex justify-center bg-gradient-to-r from-pink-500 to-indigo-600">
                    <div className="flex-col ml-9 ">
                        {/* Existing JSX code */}
                        {/* ... */}

                        {/* New section for fetching teacher attendance */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                Fetch Teacher Attendance
                            </h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Teacher ID
                                </label>
                                <input
                                    type="text"
                                    name="teacherId"
                                    placeholder="Enter Teacher ID"
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Month
                                </label>
                                <input
                                    type="text"
                                    name="month"
                                    placeholder="Enter Month"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Enter Year"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <button
                                type="button"
                                className="button-style bg-green-500 hover:bg-green-600 rounded-xl p-3"
                                onClick={handleFetchTeacherAttendance}
                            >
                                Fetch Attendance
                            </button>
                        </div>

                        {/* Display fetched attendance record in a table */}
 <div>
                                {/* {isTableVisible &&  !isTable2Visible && !ErrMsg && <div> */}
                                {true && <div>

                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                        Teacher Attendance Record
                                    </h2>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Attendance Details
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Punch Type
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {teacherAttendance.map((record, index) => (
                                                <tr key={index}>
                                                    {/* <td className="table-data">{record.date}</td>
                                            <td className="table-data">{record.month}</td>
                                            <td className="table-data">{record.year}</td> */}
                                                    <td className="table-data">{formatTime(record.time)}</td>
                                                    {record.type === 1 ? (<td className="table-data">punch in</td>) : (<td className="table-data">punch out</td>)}
                                                    {/* <td className="table-data">{record.type}</td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>}
                            </div>
                    </div>
                </div>

                <div className="min-h-screen flex justify-center bg-gradient-to-r from-blue-500 g-7 to-indigo-600">
                    <div className="flex-col gap-4">
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Role</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Choose Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-red-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                >
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                        </div>

                        {selectedRole === 'teacher' ? (
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Teacher</h2>

                                {/* Teacher Form*************************** */}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input

                                        type="text"
                                        name="name"
                                        placeholder="Teacher name"
                                        value={teacherForm.name}
                                        onChange={handleTeacherInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@gmail.com"
                                        name="email"
                                        value={teacherForm.email}
                                        onChange={handleTeacherInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        required
                                        type="text"
                                        name="address"
                                        placeholder="Adress field"
                                        value={teacherForm.address}
                                        onChange={handleTeacherInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required=""
                                        placeholder="password@123"
                                        value={teacherForm.password}
                                        onChange={handleTeacherInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="button-style bg-green-500 hover:bg-green-600 rounded-xl p-3"
                                    onClick={handleAddTeacher}
                                >
                                    Add Teacher
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Student</h2>

                                {/* Student Form ***********************************/}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 ">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={studentForm.name}
                                        onChange={handleAddStudent}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={studentForm.email}
                                        onChange={handleAddStudent}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={studentForm.address}
                                        onChange={handleAddStudent}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Class</label>
                                    <input
                                        type="text"
                                        name="class"
                                        value={studentForm.class}
                                        onChange={handleAddStudent}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="password@123"
                                        value={studentForm.password}
                                        onChange={handleAddStudent}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="button-style bg-green-500 hover:bg-green-600 rounded-xl p-3"
                                    onClick={handleSubmitStudent}

                                >
                                    Add Student
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Principle;
