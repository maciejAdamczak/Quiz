import { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="WprowadzSwojeImie"
        ref={inputRef}
      />
      <button className="PrzyciskStart" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}
