import { useState } from "react"
import ViewSection from "./components/sections/ViewSection"
import Header from "./components/Header/Header"

function App() {
  const [section, setSection] = useState('view')

  return (
    <>
      <Header switchButtonText={section == 'view' ? 'Upload' : 'View'} switchUploadState={() => setSection(section == 'view' ? 'upload' : 'view')}/>

      <main>
        {section == 'view' && <ViewSection/>}
      </main>
    </>
  )
}

export default App
