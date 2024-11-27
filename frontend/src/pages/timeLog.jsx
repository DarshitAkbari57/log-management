import React, { useEffect } from "react";
import { Table } from "antd"; // Importing Table component from Ant Design
import { GetTimeLog } from "../redux/timeLog/action";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const TimeLog = () => {
  const dispatch = useDispatch();
  const timelog = useSelector((state) => state?.Timelog?.timelog);

  const formattedTasks = timelog?.data?.map((timelog) => {
    const start = dayjs(timelog?.startTime);
    const end = dayjs(timelog?.endTime);
    const durationInMinutes = end.diff(start, 'minutes'); // Calculate total difference in minutes
    const hours = Math.floor(durationInMinutes / 60); // Convert minutes to hours
    const minutes = durationInMinutes % 60; // Remaining minutes after hours
  
    return {
      key: timelog?._id, // Unique key for each timelog
      taskName: timelog?.taskId?.title, // Project Category or Project Name
      userName: `${timelog?.userId?.first_name} ${timelog?.userId?.last_name}`,
      timeDiff: `${hours}h ${minutes}m`, // Format as hours and minutes
      startTime: start.format("hh:mm:ss A DD-MM-YYYY"),
      endTime: end.format("hh:mm:ss A DD-MM-YYYY"),
    };
  });

  // Define the columns for the table
  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName", // Mapping this column to `taskName` from the data
      key: "taskName",
    },
    {
      title: "User Name",
      dataIndex: "userName", // Mapping this column to `userName` from the data
      key: "userName",
    },
    {
      title: "Time",
      dataIndex: "timeDiff", // Mapping this column to `startTime` from the data
      key: "timeDiff",
    },
    {
      title: "Start Time",
      dataIndex: "startTime", // Mapping this column to `startTime` from the data
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime", // Mapping this column to `endTime` from the data
      key: "endTime",
    },
  ];

  useEffect(() => {
    dispatch(GetTimeLog());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Time Log</h1>

      {/* Table displaying the task log */}
      <Table columns={columns} dataSource={formattedTasks} pagination={false} />
    </div>
  );
};

export default TimeLog;
