import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
// import DailyLogList from './components/DailyLogList/DailyLogList';
// import DailyLogDetails from './components/DailyLogDetails/DailyLogDetails';
// import DailyLogForm from './components/DailyLogForm/DailyLogForm';
import GoalList from './components/GoalList/GoalList';
import GoalDetails from './components/GoalDetails/GoalDetails';
// import GoalForm from './components/GoalForm/GoalForm';
// import * as dailyLogService from './services/dailyLogService';
import * as goalService from './services/goalService';


const App = () => {

  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!user) return;
      const data = await goalService.index();
      setGoals(data);
    };
    fetchGoals();
  }, [user]);


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />


        <Route path='/goals' element={<GoalList goals={goals} />} /> 
        <Route path="/goals/:goalId" element={<GoalDetails handleDeleteGoal={handleDeleteGoal} />} />

      </Routes>
    </>
  );
};

export default App;