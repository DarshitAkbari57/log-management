import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Select,
  Input,
  Modal,
  notification,
  Form,
  DatePicker,
} from "antd";
import {
  PlayCircleOutlined,
  StopOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs"; // For date formatting
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../redux/user/actions";
import { getProject } from "../redux/project/action";
import { createTimeLog, GetTask, UpdateSaleTask } from "../redux/task/action";
import { createTask } from "../redux/task/action";
import moment from "moment";

const { RangePicker } = DatePicker;

const { Option } = Select;

const Task = () => {
  // Task state management
  const [tasks, setTasks] = useState([
    {
      key: 1,
      project: "Project A",
      title: "Task 1",
      assignee: "User 1",
      dueDate: dayjs("2024-12-01"),
      priority: "high",
      timeSpent: 20,
      stopwatchTime: 0, // Stopwatch time (seconds)
      isTimerRunning: false, // Whether the timer is running
    },
    {
      key: 2,
      project: "Project B",
      title: "Task 2",
      assignee: "User 2",
      dueDate: dayjs("2024-12-10"),
      priority: "medium",
      timeSpent: 0,
      stopwatchTime: 0, // Stopwatch time (seconds)
      isTimerRunning: false, // Whether the timer is running
    },
  ]);

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [timer, setTimer] = useState(null);
  const [form] = Form.useForm();
  const [isAssigneeChangeVisible, setIsAssigneeChangeVisible] = useState(false);
  const [isPriorityChangeVisible, setIsPriorityChangeVisible] = useState(false);
  const [newAssignee, setNewAssignee] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [filters, setFilters] = useState({
    priority: "",
    dueDate: "",
    assignee: "",
  });

  const project = useSelector((state) => state?.Project?.project);

  // Priority levels and colors
  const priorityLevels = [
    { label: "Low", value: "Low", color: "bg-green-200" },
    { label: "Moderate", value: "Moderate", color: "bg-yellow-200" },
    { label: "High", value: "High", color: "bg-red-200" },
  ];

  const user = useSelector((state) => state?.User?.users);

  const task = useSelector((state) => state?.Task?.task);

  const userOptions = user?.data?.map((user) => ({
    value: user?._id,
    label: `${user?.first_name} ${user?.last_name}`,
  }));

  const projectOptions = project?.data?.map((user) => ({
    value: user?._id,
    label: `${user?.name}`,
  }));

  const handleAssigneeChange = (taskKey, assignee) => {
    setNewAssignee(assignee); // Set the new assignee for confirmation modal
    setCurrentTask(taskKey); // Set the current task
    setIsAssigneeChangeVisible(true); // Show the confirmation modal
  };

  const handleConfirmAssigneeChange = async () => {
    let obj = {
      userId: newAssignee,
    };
    await dispatch(UpdateSaleTask({ id: currentTask, data: obj })).then(
      (res) => {
        if (res?.status === 200) {
          dispatch(GetTask());
          notification.success({
            message: "Assignee Updated",
          });
        }
      }
    );
    setIsAssigneeChangeVisible(false); // Close confirmation modal
  };

  const handleCancelAssigneeChange = () => {
    setIsAssigneeChangeVisible(false); // Close confirmation modal without changes
  };

  const handlePriorityChange = (taskKey, priority) => {
    setNewPriority(priority); // Set the new assignee for confirmation modal
    setCurrentTask(taskKey); // Set the current task
    setIsPriorityChangeVisible(true); // Show the confirmation modal
  };

  const handleConfirmPriorityChange = async () => {
    let obj = {
      priority: newPriority,
    };
    await dispatch(UpdateSaleTask({ id: currentTask, data: obj })).then(
      (res) => {
        if (res?.status === 200) {
          dispatch(GetTask());
          notification.success({
            message: "Priority Updated",
          });
        }
      }
    );
    // setTasks(updatedTasks); // Update task list
    setIsPriorityChangeVisible(false); // Close confirmation modal
  };

  const handleCreateTimeLog = async (taskKey, info) => {
    let obj = {
      taskId: taskKey?._id,
      userId: taskKey?.userId?._id,
      startTime: moment(info[0], "YYYY-MM-DD HH:mm").toDate(),
      endTime: moment(info[1], "YYYY-MM-DD HH:mm").toDate(),
    };
    await dispatch(createTimeLog(obj)).then((res) => {
      if (res?.status === 201) {
        dispatch(GetTask()); // Fetch the updated tasks
      }
    });
  };

  const handleCancelPriorityChange = () => {
    setIsPriorityChangeVisible(false); // Close confirmation modal without changes
  };

  // Handle adding a new task
  const handleAddTask = async (values) => {
    const newTask = {
      key: tasks.length + 1,
      title: values.title,
      userId: values.assignee,
      projectId: values.project,
      description: values.description,
      dueDate: values.dueDate,
      priority: values.priority,
    };

    await dispatch(createTask(newTask)).then((res) => {
      if (res?.status === 201) {
        setTasks([...tasks, newTask]);
        setIsModalVisible(false);
        form.resetFields();
        notification.success({
          message: res?.message,
        });
      }
    });
  };

  // Start or stop the timer
  const handleTimer = async (taskKey) => {
    // const updatedTasks = [...tasks];
    // const task = updatedTasks.find((t) => t.key === taskKey);

    // if (task?.isTimerRunning) {
    //   // Stop the timer
    //   clearInterval(task.timerId);
    //   task.isTimerRunning = false;
    //   task.timeSpent += Math.floor(task.stopwatchTime / 60); // Add stopwatch time to timeSpent in minutes
    //   task.stopwatchTime = 0; // Reset stopwatch
    //   task.timerId = null; // Clear timerId
    // } else {
    //   // Start the timer
    //   task.stopwatchTime = 0; // Reset the stopwatch to 00:00
    //   task.isTimerRunning = true;
    //   task.timerId = setInterval(() => {
    //     task.stopwatchTime += 1; // Increment every second
    //     setTasks([...updatedTasks]); // Update the task list
    //   }, 1000); // Increment every second
    // }

    // setTasks(updatedTasks); // Update the tasks with the new timer state
    // setCurrentTask(taskKey);

    console.log("taskKey", taskKey?.TimerRunning);

    // Get the current date and time dynamically
    const currentTime = new Date().toISOString();

    let obj = {
      taskId: taskKey?._id,
      userId: taskKey?.userId?._id,
      [taskKey?.TimerRunning === false ? "startTime" : "endTime"]: currentTime,
    };

    // Call the action to create a time log
    await dispatch(createTimeLog(obj)).then((res) => {
      if (res?.status === 201) {
        dispatch(GetTask()); // Fetch the updated tasks
      }
    });
  };

  // Handle manual time entry
  const handleManualTimeEntry = (taskKey, time) => {
    console.log("taskKey,time :>> ", taskKey, time);
    console.log("tasks :>> ", tasks);
    const updatedTasks = tasks.map((task) =>
      task.key === taskKey
        ? { ...task, timeSpent: task.timeSpent + time }
        : task
    );
    console.log("updatedTasks :>> ", updatedTasks);
    setTasks(updatedTasks);
    notification.success({
      message: "Time Added",
      description: `Manually added ${time} minute(s) to task.`,
    });
  };

  // Handle priority filter change
  const handlePriorityFilter = (value) => {
    setFilters((prev) => ({ ...prev, priority: value }));
  };

  // Handle due date filter change
  const handleDueDateFilter = (date) => {
    setFilters((prev) => ({
      ...prev,
      dueDate: date ? date.format("YYYY-MM-DD") : "",
    }));
  };

  // Handle assignee filter change
  const handleAssigneeFilter = (value) => {
    setFilters((prev) => ({ ...prev, assignee: value }));
  };

  // Format time in hh:mm:ss format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // Columns for the Task Table
  const taskColumns = [
    { title: "Project", dataIndex: "project", key: "project" },
    { title: "Task", dataIndex: "title", key: "title" },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee, record) => (
        <Select
          defaultValue={assignee}
          onChange={(value) => handleAssigneeChange(record.key, value)}
          style={{ width: 150 }}
        >
          {userOptions?.map((user) => (
            <Option key={user?.value} value={user?.value}>
              {user?.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => dayjs(dueDate).format("YYYY-MM-DD"),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority, record) => (
        <Select
          defaultValue={priority}
          onChange={(value) => handlePriorityChange(record.key, value)}
          style={{ width: 150 }}
        >
          {priorityLevels.map((data) => (
            <Option key={data?.value} value={data?.value}>
              {data?.label}
            </Option>
          ))}
        </Select>
      ),
      // render: (priority) => (
      //   <span
      //     className={`px-2 py-1 rounded ${
      //       priorityLevels.find((p) => p.value === priority).color
      //     }`}
      //   >
      //     {priorityLevels.find((p) => p.value === priority).label}
      //   </span>
      // ),
    },
    // {
    //   title: "Time Spent (min)",
    //   dataIndex: "timeSpent",
    //   key: "timeSpent",
    //   render: (time, record) => {
    //     // Convert seconds to hours, minutes, and seconds
    //     const hours = Math.floor(time / 3600); // Convert to hours
    //     const minutes = Math.floor((time % 3600) / 60); // Remaining minutes
    //     const seconds = time % 60; // Remaining seconds

    //     // Format it as "X hrs Y min Z sec"
    //     return <span>{`${hours} hrs ${minutes} min ${seconds} sec`}</span>;
    //   },
    // },
    // {
    //   title: "Stopwatch",
    //   key: "stopwatch",
    //   render: (_, record) => <span>{formatTime(record.stopwatchTime)}</span>,
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            icon={
              record.isTimerRunning ? <StopOutlined /> : <PlayCircleOutlined />
            }
            onClick={() => handleTimer(record.task)}
            type="primary"
            className="w-28"
          >
            {record.isTimerRunning ? "Stop Timer" : "Start Timer"}
          </Button>
          {/* <Input
            disabled={record.isTimerRunning}
            // allowClear
            placeholder="Add time (min)"
            type="number"
            onPressEnter={(e) =>
              handleManualTimeEntry(record.key, parseInt(e.target.value))
            }
            className="w-28"
          /> */}
          <RangePicker
            format="YYYY-MM-DD HH:mm"
            showTime={{ format: "HH:mm" }}
            onChange={(_, info) => handleCreateTimeLog(record.task, info)}
          />
          {/* <DatePicker className="w-full" placeholder="Due Date" /> */}
          {/* <DatePicker className="w-full" placeholder="Due Date" /> */}
        </div>
      ),
    },
  ];

  const formattedTasks = task?.data?.map((task) => ({
    key: task?._id, // Unique key for each task
    task: task,
    project: task?.projectId?.name, // Project Category or Project Name
    title: task?.title, // Task Title
    assignee: `${task?.userId?.first_name} ${task?.userId?.last_name}`, // Full Name of Assignee
    dueDate: task?.dueDate, // Due Date
    priority: task?.priority, // Task Priority
    timeSpent: task?.totalTimeSpent || 0, // Default to 0 if no time spent is available
    stopwatchTime: task?.stopwatchTime || 0, // Default to 0 if no stopwatch time is available
    isTimerRunning: task?.TimerRunning || false, // Default to false if timer is not running
  }));

  // Filter tasks based on priority, due date, and assignee
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filters.priority
      ? task.priority === filters.priority
      : true;
    const matchesDueDate = filters.dueDate
      ? dayjs(task.dueDate).format("YYYY-MM-DD") === filters.dueDate
      : true;
    const matchesAssignee = filters.assignee
      ? task.assignee === filters.assignee
      : true;
    return matchesPriority && matchesDueDate && matchesAssignee;
  });

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetTask());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Task Management</h1>

      {/* Filters */}
      <div className="mb-6">
        <Select
          placeholder="Filter by Priority"
          style={{ width: 200, marginRight: "10px" }}
          onChange={handlePriorityFilter}
          className="mr-4"
        >
          <Option value="">All</Option>
          {priorityLevels.map((level) => (
            <Option key={level.value} value={level.value}>
              {level.label}
            </Option>
          ))}
        </Select>
        <DatePicker
          placeholder="Filter by Due Date"
          style={{ marginRight: "10px" }}
          onChange={handleDueDateFilter}
        />
        <Select
          placeholder="Filter by Assignee"
          style={{ width: 200, marginRight: "10px" }}
          onChange={handleAssigneeFilter}
          className="mr-4"
        >
          <Option value="">All</Option>
          {userOptions?.map((user) => (
            <Option key={user?.value} value={user?.value}>
              {user?.label}
            </Option>
          ))}
        </Select>
      </div>

      {/* Task Table */}
      <Table
        columns={taskColumns}
        dataSource={formattedTasks}
        pagination={false}
        rowKey="key"
        className="mb-6"
      />

      {/* Button to trigger Create Task Modal */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        className="mt-4"
      >
        Create Task
      </Button>

      {/* Create Task Modal */}
      <Modal
        title="Create New Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleAddTask}>
          <Form.Item
            name="project"
            label="Project"
            rules={[
              { required: true, message: "Please Select Project title!" },
            ]}
          >
            <Select placeholder="Select Project">
              {projectOptions?.map((user) => (
                <Option key={user?.value} value={user?.value}>
                  {user?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="Task Title"
            rules={[
              { required: true, message: "Please input the task title!" },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Task Description"
            rules={[
              { required: true, message: "Please input the task description!" },
            ]}
          >
            <Input placeholder="Enter task description" />
          </Form.Item>
          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: "Please select an assignee!" }]}
          >
            <Select placeholder="Select assignee">
              {userOptions?.map((user) => (
                <Option key={user?.value} value={user?.value}>
                  {user?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select a due date!" }]}
          >
            <DatePicker className="w-full" placeholder="Due Date" />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select priority!" }]}
          >
            <Select placeholder="Select priority">
              {priorityLevels.map((level) => (
                <Option key={level.value} value={level.value}>
                  {level.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Confirm Assignee Change"
        visible={isAssigneeChangeVisible}
        onOk={handleConfirmAssigneeChange}
        onCancel={handleCancelAssigneeChange}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to change the assignee ?</p>
      </Modal>
      <Modal
        title="Confirm Priority Change"
        visible={isPriorityChangeVisible}
        onOk={handleConfirmPriorityChange}
        onCancel={handleCancelPriorityChange}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to change the assignee to {newPriority}?</p>
      </Modal>
    </div>
  );
};

export default Task;
