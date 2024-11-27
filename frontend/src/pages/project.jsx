import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Select,
  DatePicker,
  Form,
  notification,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // To manage date formatting
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../redux/user/actions";
import { createProject, getProject } from "../redux/project/action";
import { generatePopup } from "../utility/popup";
import { createTask } from "../redux/task/action";

const { Option } = Select;

const Project = () => {
  const dispatch = useDispatch();
  const projectsData = [
    { key: 1, name: "Project A", category: "Description of Project A" },
    { key: 2, name: "Project B", category: "Description of Project B" },
  ];

  const users = [
    { key: 1, name: "User 1" },
    { key: 2, name: "User 2" },
    { key: 3, name: "User 3" },
  ];

  const taskStatuses = ["Not Started", "In Progress", "Completed"];
  const priorityLevels = ["High", "Moderate", "Low"];

  // State for managing the selected project and modal visibility
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const [filters, setFilters] = useState({ priority: "", dueDate: "" });

  const user = useSelector((state) => state?.User?.users);
  const userOptions = user?.data?.map((user) => ({
    value: user?._id,
    label: `${user?.first_name} ${user?.last_name}`,
  }));

  const project = useSelector((state) => state?.Project?.project);

  // Helper function to determine priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Moderate":
        return "orange";
      case "Low":
        return "green";
      default:
        return "default";
    }
  };
  // Handle Create Project
  const handleCreateProject = async (values) => {
    const newProject = {
      created_by: values.user,
      name: values.name,
      category: values.category,
    };

    // Add the new project to the projects list
    try {
      await dispatch(createProject(newProject)).then((res) => {
        if (res?.status === 201) {
          generatePopup("success", res?.message);
          dispatch(getProject());
          setIsCreateModalVisible(false);
          createForm.resetFields();
        } else {
          console.log("res :>> ", res);
        }
      });
    } catch (error) {
      console.log("error===== :>> ", error);
    }
  };

  // Handle task creation
  const handleCreateTask = async (values) => {
    const newTask = {
      title: values?.title,
      description: values?.description, // Description from the form
      projectId: selectedProject?._id, // Project ID from the selected project
      userId: values?.assignee, // Assignee from the form
      dueDate: values?.dueDate.format("YYYY-MM-DD"),
      priority: values.priority,
    };
    try {
      await dispatch(createTask(newTask)).then((res) => {
        if (res?.status === 201) {
          setIsModalVisible(false);
          generatePopup("success", res?.message);
          dispatch(getProject());
        } else {
          console.log("res :>> ", res);
        }
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // Handle task filtering
  const handlePriorityFilter = (value) => {
    setFilters((prev) => ({ ...prev, priority: value }));
  };

  const handleDueDateFilter = (date) => {
    setFilters((prev) => ({
      ...prev,
      dueDate: date ? date.format("YYYY-MM-DD") : "",
    }));
  };

  // Columns for the Project Table
  const projectColumns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => setSelectedProject(record)} type="primary">
          View Tasks
        </Button>
      ),
    },
  ];

  // Columns for the Task Table with Sorting for Due Date
  const taskColumns = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
    },
    { title: "Assignee", dataIndex: "user", key: "user" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a, b) => (dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1), // Sort by due date
      render: (dueDate) => dayjs(dueDate).format("YYYY-MM-DD"), // Format the due date
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <span
          className={`px-2 py-1 rounded ${
            priority === "High"
              ? "bg-red-200"
              : priority === "Moderate"
              ? "bg-yellow-200"
              : "bg-green-200"
          }`}
        >
          {priority}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>,
    },
  ];

  const formattedTasks = selectedProject?.tasks?.map((task) => ({
    key: task?._id, // Unique key for each task
    title: task?.title, // Task Title
    user: `${task?.userId?.first_name} ${task?.userId?.last_name}`, // Assignee (Full Name)
    dueDate: task?.dueDate, // Due Date
    priority: task?.priority, // Priority
    status: task?.status, // Status
  }));

  // Filter tasks based on priority and due date
  const filteredTasks = formattedTasks?.filter((task) => {
    const matchesPriority = filters.priority
      ? task.priority === filters.priority
      : true;
    const matchesDueDate = filters.dueDate
      ? dayjs(task.dueDate).format("YYYY-MM-DD") === filters.dueDate
      : true;
    return matchesPriority && matchesDueDate;
  });

  useEffect(() => {
    if (selectedProject) {
      setTasks(selectedProject?.tasks || []); // Set tasks for the selected project
    }
  }, [selectedProject]);

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold mb-6">Project Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalVisible(true)}
        >
          Create Project
        </Button>
      </div>

      {/* Project Table */}
      <Table
        columns={projectColumns}
        dataSource={project?.data}
        pagination={false}
        rowKey="key"
        className="mb-6"
      />

      {selectedProject && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Tasks for {selectedProject.name}
          </h2>

          {/* Filters for Priority and Due Date */}
          <div className="mb-6 flex gap-4">
            <Select
              placeholder="Filter by Priority"
              style={{ width: 200 }}
              onChange={handlePriorityFilter}
            >
              <Option value="">All</Option>
              {priorityLevels.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>

            <DatePicker
              placeholder="Filter by Due Date"
              onChange={handleDueDateFilter}
              format="YYYY-MM-DD"
            />
          </div>

          {/* Task Table with Filters */}
          <Table
            columns={taskColumns}
            dataSource={filteredTasks}
            pagination={false}
            rowKey="key"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mt-4"
          >
            Create Task
          </Button>
        </div>
      )}

      {/* Modal for creating a new task */}
      <Modal
        title="Create New Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={taskForm} onFinish={handleCreateTask}>
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
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="priority" label="Priority" initialValue="Moderate">
            <Select>
              {priorityLevels.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="Not Started">
            <Select>
              {taskStatuses.map((status) => (
                <Option key={status} value={status}>
                  {status}
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

      {/* Create Project Modal */}
      <Modal
        title="Create New Project"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={createForm} onFinish={handleCreateProject}>
          <Form.Item
            name="user"
            label="User"
            rules={[{ required: true, message: "Please select any user!" }]}
          >
            <Select placeholder="Select User">
              {userOptions?.map((user) => (
                <Option key={user?.value} value={user?.value}>
                  {user?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Project Category"
            rules={[
              {
                required: true,
                message: "Please input the project category!",
              },
            ]}
          >
            <Input placeholder="Enter Project Category" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Project;
