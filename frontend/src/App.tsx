import './App.css'
import EventTable from "./components/eventTable";

function App() {

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="block max-w-xg p-6 bg-white border border-gray-200 rounded-lg shadow ">
        <EventTable />
      </div>
    </div>
  )
}

export default App
