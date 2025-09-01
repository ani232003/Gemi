import { useTheme } from "../../context/themecontext.jsx";
import "./darkmode.css"

const Mode = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <label className="mode-switch">
      <input
        type="checkbox"
        checked={mode === "dark"}
        onChange={toggleMode}
      />
      <span className="slider"></span>
    </label>
  );
};

export default Mode;
