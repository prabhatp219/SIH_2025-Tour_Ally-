import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import './index.css'
import './Index7css.css'
import './Idcss.css'
import './Geofencingcss.css'
import './Panicbuttoncss.css'
import './Aimonitoringcss.css'
import './Dataprivacycss.css'
import './Touristinsightscss.css'
import './pages/Signupcss.css'
import Id from "./Id";
import Index7 from './index7'
import Aimonitoring from './Aimonitoring'
import Dataprivacy from './Dataprivacy'
import Geofencing from './Geofencing'
import Panicbutton from './Panicbutton'
import Touristinsights from './Touristinsights'
import Signup  from './pages/Signup'

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
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App
