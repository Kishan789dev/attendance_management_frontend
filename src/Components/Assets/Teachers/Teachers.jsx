import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AttendanceTracker = () => {


    const [teacherAttendance, setTeacherAttendance] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [isTable2Visible, setIsTable2Visible] = useState(false);


    const handleFetchTeacherAttendance = async () => {
        // Implement your logic to fetch student attendance data from the backend
        try {
            const response = await fetch(
                // Your API endpoint for fetching student attendance
            );

            if (response.status === 200) {
                const attendanceData = response.json
                setTeacherAttendance(attendanceData);
                if (attendanceData)
                    setIsTableVisible(true);
                console.log('Success: Student attendance fetched');
            }
        } catch (err) {
            console.log('Failed to fetch student attendance');
            setIsTableVisible(false);
            if (!err?.response) {
                // Handle error when there is no server response
            } else {
                // Handle other errors
            }
        }
    };

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [selectedMonth, setSelectedMonth] = useState('');

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth2, setSelectedMonth2] = useState('');

    const [selectedYear2, setSelectedYear2] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [classData, setClassData] = useState([]);

    // const [loading, setLoading] = useState(false);
    const [ErrMsg2, setErrMsg2] = useState("")
    const [ErrMsg, setErrMsg] = useState("")

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



    const handlePunchIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/teacherattendance/punchin", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: "include",teacherattendance
                credentials: "include",

            });



            if (response.status === 200) {
                const data = await response.json()
                // console.log("attendance data ", data)
                alert(data)

                // console.log('Success: Teacher attendance fetched');
            } else {
                console.log("failed", response.status)
            }
        } catch (err) {

            setIsTableVisible(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Failed to punch in');
                // }

            }


        }
    }

    const handlePunchOut = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/teacherattendance/punchout", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: "include",teacherattendance
                credentials: "include",

            });



            if (response.status === 200) {
                const data = await response.json()
                // console.log("attendance data ", data)
                alert(data)

                // console.log('Success: Teacher attendance fetched');
            } else {
                console.log("failed", response.status)
            }
        } catch (err) {

            setIsTableVisible(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Failed to punch out');
                // }

            }


        }
    };

    const navigate = useNavigate()

    
    const handleFetchAttendance = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/teacherattendance", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: "include",teacherattendance
                credentials: "include",
                body: JSON.stringify({
                    //    "tid":teacherId,
                    "month": parseInt(selectedMonth),
                    "year": parseInt(selectedYear)
                }),
            });




            if (response.status === 200) {
                // try{
                const data = await response.json()
                // console.log("attendance data ",data)
                if (data.error == null) {
                    setAttendanceData([...data]);
                    setIsTable2Visible(false);
                    setIsTableVisible(true);
                    setSelectedMonth('')
                    setErrMsg('')
                    setSelectedYear('')

                }
                else {
                    alert(data.error)
                    setErrMsg(data.error)
                    setSelectedYear('')
                    setSelectedMonth('')


                }
            }

        
        } catch (err) {
            console.log(err)
            // console.log('Failed to fetch teacher attendance');
            setIsTableVisible(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Failed to fetch teacher attendance');
            }

        }
        // console.log("2333",teacherAttendance)
    };



    var delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    

 
    const handleLogout = () => {
    delete_cookie('token')
    navigate('/login')

    };
    const handleClassAttendance = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/classattendance", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                // withCredentials: "include",teacherattendance
                credentials: "include",
                body: JSON.stringify({
                    //    "tid":teacherId,
                    "class": parseInt(selectedClass),
                    "date": parseInt(selectedDate),
                    "month": parseInt(selectedMonth2),
                    "year": parseInt(selectedYear2)
                }),
            });




            if (response.status === 200) {
                // try{
                const data = await response.json()
                // console.log("attendance data ",data)
                if (data.error == null) {
                    setClassData([...data]);
                    setIsTableVisible(false)
                    setIsTable2Visible(true);
                    setSelectedClass('')
                    setErrMsg2('')

                    setSelectedDate('')
                    setSelectedMonth2('')
                    
                    setSelectedYear2('')

                }
                else {
                    alert(data.error)
                    setErrMsg2(data.error)
                }
            }
       
        } catch (err) {
            console.log(err)
            // console.log('Failed to fetch teacher attendance');
            setIsTable2Visible(false);
            if (!err?.response) {
                setErrMsg2('No Server Response');
            } else {
                setErrMsg2('Failed to fetch teacher attendance');
            }

        }
        // console.log("2333",teacherAttendance)
    };

    return (
        <>
            <div className="min-h-screen flex flex-col  bg-gradient-to-r from-blue-500 to-indigo-600">
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
                <h1 className='min-w-full flex justify-center'>
                    Welcome  to Teacher Page
                </h1>
                <div className="flex-col gap-4">


                    <div className="container mx-auto p-8 flex">
                        <div className="w-1/2 pr-8">
                            <div>

                                <h1 className="text-3xl font-bold mb-4">Fetch Attendance Details</h1>

                                {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter Student ID"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="input-field border-red-700"
                                />
                            </div> */}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Month</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Month (e.g., 01 for January)"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="input-field"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Year (e.g., 2023)"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="input-field"
                                    />
                                </div>

                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleFetchAttendance}>
                                    Fetch Attendance
                                </button>

                            </div>
                            <div>

                                <h1 className="text-3xl font-bold mb-4">Class Attendance</h1>

                                {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter Student ID"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="input-field border-red-700"
                                />
                            </div> */}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Class</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Class"
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="text"
                                        placeholder="Enter date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Month</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Month (e.g., 01 for January)"
                                        value={selectedMonth2}
                                        onChange={(e) => setSelectedMonth2(e.target.value)}
                                        className="input-field"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Year (e.g., 2023)"
                                        value={selectedYear2}
                                        onChange={(e) => setSelectedYear2(e.target.value)}
                                        className="input-field"
                                    />
                                </div>

                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleClassAttendance}>
                                    Class attendance
                                </button>

                            </div>
                        </div>

                        <div className="w-1/2">

                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Punch In/Punch Out</h2>

                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handlePunchIn}>
                                Punch In
                            </button>

                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handlePunchOut}>
                                Punch Out
                            </button>
                            <div>
                                {/* {isTableVisible &&  !isTable2Visible && !ErrMsg && <div> */}
                                {attendanceData && isTableVisible &&  !isTable2Visible && !ErrMsg  && <div>

                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                        Student Attendance Record
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
                                            {attendanceData.map((record, index) => (
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
                            <div>
                                {/* {isTable2Visible && !ErrMsg2 && !isTableVisible && <div> */}
                                {isTable2Visible && !ErrMsg2 && !isTableVisible  && <div>

                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                        Class Attendance
                                    </h2>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Students name
                                                </th>
                                               

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {classData.map((record, index) => (
                                                <tr key={index}>
                                                    {/* <td className="table-data">{record.date}</td>
                                            <td className="table-data">{record.month}</td>
                                            <td className="table-data">{record.year}</td> */}
                                                    <td className="table-data">{(record.name)}</td>
                                                   
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>}
                            </div>
                            <div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
export default AttendanceTracker;
