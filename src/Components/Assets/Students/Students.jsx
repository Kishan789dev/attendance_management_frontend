import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AttendanceTracker = () => {
    const navigate = useNavigate();

    const [studentAttendance, setStudentAttendance] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);

    const handleFetchStudentAttendance = async () => {
        // Implement your logic to fetch student attendance data from the backend
        try {
            const response = await fetch(
                // Your API endpoint for fetching student attendance
            );

            if (response.status === 200) {
                const attendanceData = response.json
                setStudentAttendance(attendanceData);
                if (attendanceData)
                    setIsTableVisible(true);
                console.log('Success: Student attendance fetched');
            }
            if (response.status === 401) {
                // 
                alert(response)
                // navigate(/Login)
                navigate('/login');
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

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    // const [loading, setLoading] = useState(false);
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
            const response = await fetch("http://localhost:9800/studentattendance/punchin", {
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
            const response = await fetch("http://localhost:9800/studentattendance/punchout", {
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
    var delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    const handleLogout = () => {
        delete_cookie('token')
        navigate('/login')
    
        };

    const handleFetchAttendance = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/studentattendance/student", {
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

                const data = await response.json()
                if (data.error) {
                    console.log(data.error)
                    alert(data.error)
                } else {

                    console.log("attendance data ", data)
                    setAttendanceData([...data]);
                    setIsTableVisible(true);
                }
            }



            if (response.status === 401) {
                alert("secession timeout")
                navigate('/login')

            }





            // const data = await response.json()
            // console.log("attendance data ",data)
            // setAttendanceData([...data]);
            // console.log("attendance data ",teacherAttendance)


            // console.log('Success: Teacher attendance fetched');
            // }else{

            // }
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

    return (
        <>
            <div className="min-h-screen flex justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
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
                <div className="flex-col gap-4">
                    {/* Existing JSX code */}
                    {/* ... */}

                    {/* New section for fetching student attendance */}
                    {/* <div className="bg-white p-4 rounded-md shadow-md"> */}
                    {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Fetch Student Attendance
                        </h2> */}
                    {/* Input fields for student ID, month, and year */}
                    {/* ... */}

                    {/* <button
                            type="button"
                            className="button-style bg-blue-500 hover:bg-blue-600 rounded-xl p-3"
                            onClick={handleFetchStudentAttendance}
                        >
                            Fetch Attendance
                        </button>
                    </div> */}

                    {/* Display fetched attendance record in a table */}
                    {/* { isTableVisible &&(
                        <div className="bg-white p-4 rounded-md shadow-md mt-4">
                            <h2 className="text-xl font-semibold mb-2">Student Attendance Record</h2>
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Month</th>
                                        <th className="border border-gray-300 px-4 py-2">Year</th>
                                        <th className="border border-gray-300 px-4 py-2">Time</th>
                                        <th className="border border-gray-300 px-4 py-2">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentAttendance.map((record, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{record.date}</td>
                                            <td className="border border-gray-300 px-4 py-2">{record.month}</td>
                                            <td className="border border-gray-300 px-4 py-2">{record.year}</td>
                                            <td className="border border-gray-300 px-4 py-2">{record.time}</td>
                                            <td className="border border-gray-300 px-4 py-2">{record.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )} */}

                    <div className="container mx-auto p-8 flex">
                        <div className="w-1/2 pr-8">
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

                        <div className="w-1/2">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Punch In/Punch Out</h2>

                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handlePunchIn}>
                                Punch In
                            </button>

                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handlePunchOut}>
                                Punch Out
                            </button>
                            {isTableVisible && <div>
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

                    </div>
                </div>
            </div>
        </>
    );
}
export default AttendanceTracker;
