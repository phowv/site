import { useState } from "react"
import ViewSection from "./components/sections/ViewSection"
import Header from "./components/Header/Header"
import UploadSection from "./components/sections/UploadSection"

function App() {
  const [section, setSection] = useState('upload')

  return (
    <>
      <Header switchButtonText={section == 'view' ? 'Upload' : 'View'} switchUploadState={() => setSection(section == 'view' ? 'upload' : 'view')}/>

      <main>
        {section == 'view' && <ViewSection/>}

        {section == 'upload' && <UploadSection/>}
      </main>
    </>
  )
}

export default App
