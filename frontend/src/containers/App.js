import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Routes, Route, Link } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import HomePage from './HomePage';
import SpotResult from './SpotResult';
import NavBar from './NavBar';
import PersonalPage from './PersonalPage';
import OwnSchedule from './OwnSchedule';
import ScheduleCard from '../components/ScheduleCard';
import Weather from './Weather';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width:100%;
  margin: auto;
`;

const USERKEY = "save-user"
const SCHEDULEKEY = "save-schedule"

export default function App() {
  // const [user, setUser] = useState({ _id: '63b55b8e1f483583d9562b85', name: 'ethan', email: 'abcd@gmail.com' });
  const savedUser = JSON.parse(localStorage.getItem(USERKEY))
  const [user, setUser] = useState(null);

  const [searchKey, setSearchKey] = useState('');
  const [spotList, setSpotList] = useState([]);
  const [scheduleID, setScheduleID] = useState(-1)

  useEffect(() => {
    try {
      const lastUser = JSON.parse(localStorage.getItem(USERKEY))
      setUser(lastUser)
      // console.log(lastUser)
    }
    catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
      try{
        const lastSchedule = localStorage.getItem(SCHEDULEKEY)
        setScheduleID(lastSchedule)
      }
      catch{
        setScheduleID(-1)
      }
  },[])

  useEffect(() => {
    console.log('user:', user)
  }, [user]);

  return (
    <Wrapper>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route>
          <Route path="login" element={<Login user={user} USERKEY={USERKEY} setUser={setUser} />} />
          <Route path="register" element={<Register />} />

          <Route index element={<HomePage setSearchKey={setSearchKey} />} />
          <Route path='personal' element={<PersonalPage user={user} setUser={setUser} setScheduleID={setScheduleID} SCHEDULEKEY={SCHEDULEKEY} />} />
          <Route path="spot_result" element={<SpotResult user={user} setUser={setUser} searchKey={searchKey} setSearchKey={setSearchKey} spotList={spotList} setSpotList={setSpotList} />} />
          <Route path='ownschedule' element={<OwnSchedule user={user} setUser={setUser} searchKey={searchKey} setSearchKey={setSearchKey} spotList={spotList} setSpotList={setSpotList} scheduleID={scheduleID} USERKEY={USERKEY} />}></Route>

          <Route path='scheduleCard' element={<ScheduleCard />}></Route>
          <Route path='weather' element={<Weather />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Wrapper>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Oops!</h2>
      <p>
        <Link to="/">Go to the <b>Travelaurence</b> login page</Link>
        {/* 要記得改！！ */}
      </p>
    </div>
  );
}