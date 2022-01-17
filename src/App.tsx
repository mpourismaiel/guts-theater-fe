import { SWRConfig } from "swr";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fetcher } from "./utils/swr";
import Header from "./components/Header";
import Stage from "./pages/Stage";
import Groups from "./pages/Groups";

import "./global.css";
import Docs from "./pages/Docs";

function App() {
  return (
    <Router>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Header />
        <Routes>
          <Route path="/docs" element={<Docs />} />
          <Route path="/stage" element={<Stage />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </SWRConfig>
    </Router>
  );
}

export default App;
