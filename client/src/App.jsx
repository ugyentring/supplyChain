import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}
        <Route exact path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
