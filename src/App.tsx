import { SWRConfig } from "swr";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fetcher } from "./utils/swr";
import Header from "./components/Header";

import "./global.css";
import Home from "./pages/Stage";

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
          <Route path="/stage" element={<Home />} />
        </Routes>
      </SWRConfig>
    </Router>
  );
}

export default App;
