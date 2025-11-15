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

import AdminPage from "./pages/AdminPage";

import ProtectedRoute, { PublicOnly } from "./components/ProtectedRoute";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Index7 /></ProtectedRoute>} />
        <Route path="/aimonitoring" element={<ProtectedRoute><Aimonitoring /></ProtectedRoute>} />
        <Route path="/id" element={<ProtectedRoute><Id /></ProtectedRoute>} />
        <Route path="/dataprivacy" element={<ProtectedRoute><Dataprivacy /></ProtectedRoute>} />
        <Route path="/geofencing" element={<ProtectedRoute><Geofencing /></ProtectedRoute>} />
        <Route path="/panicbutton" element={<ProtectedRoute><Panicbutton /></ProtectedRoute>} />
        <Route path="/touristinsights" element={<ProtectedRoute><Touristinsights /></ProtectedRoute>} />
        <Route path="/gpslogsviewer" element={<ProtectedRoute><GpsLogsViewer /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><Chatbot/></ProtectedRoute>} />
        <Route path="/signup" element={<PublicOnly><Signup /></PublicOnly>} /> 
        <Route path="/signin" element={<PublicOnly><Signin /></PublicOnly>} /> 
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App
