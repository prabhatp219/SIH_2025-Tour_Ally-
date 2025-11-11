import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
// import './App.css'
// import './index.css'
import './Index7css.css'  
import './Idcss.css'
import './Geofencingcss.css'
import './Panicbuttoncss.css'
import './Aimonitoringcss.css'
import './Dataprivacycss.css'
import './Insights.css'
import './Chatbot.css'
import './GpsLogsViewercss.css'
import './pages/Signupcss.css'
import './pages/Signincss.css'
import Id from "./Id";
import Index7 from './Index7' //here

import Aimonitoring from './Aimonitoring'
import Dataprivacy from './Dataprivacy'
import Geofencing from './Geofencing'
import Panicbutton from './Panicbutton'
import Touristinsights from './Touristinsights'
import Signup  from './pages/Signup'
import Signin  from './pages/Signin'
import GpsLogsViewer from './GpsLogsViewer'
import Chatbot from './Chatbot'
import Signupb from './Signupb'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Index7 />} />
        <Route path="/aimonitoring" element={<Aimonitoring />} />
        <Route path="/id" element={<Id />} />
        <Route path="/dataprivacy" element={<Dataprivacy />} />
        <Route path="/geofencing" element={<Geofencing />} />
        <Route path="/panicbutton" element={<Panicbutton />} />
        <Route path="/touristinsights" element={<Touristinsights />} />
        <Route path="/gpslogsviewer" element={<GpsLogsViewer />} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} /> 
        <Route path="/signupb" element={<Signupb />} />
      </Routes>
    </>
  );
}

export default App
