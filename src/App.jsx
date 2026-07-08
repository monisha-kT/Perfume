import { useEffect, useState } from "react";
import Experience from "./components/scene/Experience";
import Loader from "./components/ui/Loader";
import Cursor from "./components/ui/Cursor";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import Essence from "./components/sections/Essence";
import Notes from "./components/sections/Notes";
import Craft from "./components/sections/Craft";
import Cta from "./components/sections/Cta";
import { initSmoothScroll, stopScroll, startScroll } from "./lib/scroll";
import "./App.css";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const cleanup = initSmoothScroll();
    stopScroll();
    return cleanup;
  }, []);

  useEffect(() => {
    if (loaded) startScroll();
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />

      <div className="canvas-layer">
        <Experience />
      </div>

      <div className="grain-overlay" />

      <Header />

      <main className="content-layer">
        <Hero />
        <Essence />
        <Notes />
        <Craft />
        <Cta />
      </main>
    </>
  );
}

export default App;
