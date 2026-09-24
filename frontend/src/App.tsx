import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { Servers } from "./pages/Servers";
import { About } from "./pages/About";
import { Privacy } from "./pages/Privacy";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-bg text-primary">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
