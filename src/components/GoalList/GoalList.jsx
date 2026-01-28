import { Link } from "react-router";
import { useState } from "react";

const GoalList = ({ goals = [] }) => {

  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredGoals =
    statusFilter === "ALL"
      ? goals
      : goals.filter((goal) => goal.status === statusFilter);

  return (
    <main>
      <h1>Goals</h1>

      <Link to="/goals/new">New Goal</Link>
 
      {/* Filter */}
      <div>
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="Active">Active</option>
        <option value="Paused">Paused</option>
        <option value="Completed">Completed</option>
      </select>
      </div>

      {/* List */}
      {filteredGoals.length === 0 ? (
        <p>No goals found for this status.</p>
      ) : (
        filteredGoals.map((goal) => (
          <Link key={goal._id} to={`/goals/${goal._id}`}>
          <article>
            <h2> {goal.title}</h2>
            <p>{goal.status}</p>
          </article>
          </Link>
        ))
      )}
    </main>
  );
};

export default GoalList;
