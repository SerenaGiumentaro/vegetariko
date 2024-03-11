import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailRecipe from "./pages/DetailRecipe";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<DetailRecipe />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
