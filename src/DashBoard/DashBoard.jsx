import { useEffect, useState } from "react";
import api from "../Api/Api";


function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => console.log("API Error"));
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;