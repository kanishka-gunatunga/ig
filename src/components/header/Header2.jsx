import { useEffect, useRef } from "react";
import Canvas from "../canvas/Canvas";
import DesignStudioLogo from "../logo/DesignStudioLogo";
import NavItem from "../nav/NavItem";

export default function Header2({ navData }) {
  const ofCanvasArea = useRef();
  const headerArea = useRef();

  // Remove all scroll-related logic since we want it always black
  useEffect(() => {
    // Set initial background to black
    if (headerArea.current) {
      headerArea.current.style.background = "#121212";
      headerArea.current.classList.add("sticky-2");
    }
  }, []);

  const openCanvas = () => {
    ofCanvasArea.current.style.opacity = "1";
    ofCanvasArea.current.style.visibility = "visible";
  };

  return (
    <>
      {navData && Object.keys(navData).length && (
        <>
          <header className="header__area-2" ref={headerArea}>
            <div className="header__inner-2">
              <DesignStudioLogo />
              {navData.nav && navData.nav.length && (
                <NavItem nav={navData.nav} />
              )}
            </div>
          </header>
        </>
      )}
      <Canvas ofCanvasArea={ofCanvasArea} />
    </>
  );
}