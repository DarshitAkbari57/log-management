import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Getdashboard } from "../redux/dashboard/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dashboard = useSelector((state) => state?.Dashboard?.dashboard);
  console.log("dashboard", dashboard);

  const convertTime = (time) => {
    if (!time) {
      return "0 hours 0 minutes"; // Default if no time is provided
    }

    // Ensure the time is a valid string that can be split
    const timeString = time?.toString();

    if (timeString && timeString.includes(".")) {
      const [hours, minutes] = timeString.split(".").map(Number);

      // If split results are valid numbers, return formatted time
      if (!isNaN(hours) && !isNaN(minutes)) {
        return `${hours} hours ${minutes} minutes`;
      }
    }

    // Default return if the split wasn't valid
    return "Invalid time format";
  };

  useEffect(() => {
    dispatch(Getdashboard());
  }, [dispatch]); // Add dispatch as a dependency

  const projectsCount = 5;
  const tasksCount = 12;
  const loggedTime = "15 hours 30 minutes";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Projects</h3>
          <p className="text-3xl font-semibold text-blue-600">
            {dashboard?.data?.totalProjects}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total number of active projects
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Tasks</h3>
          <p className="text-3xl font-semibold text-green-600">
            {dashboard?.data?.totalTasks}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total number of tasks assigned
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Logged Time
          </h3>
          <p className="text-3xl font-semibold text-purple-600">
            {convertTime(dashboard?.data?.totalWorkingHours)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total time logged on tasks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
