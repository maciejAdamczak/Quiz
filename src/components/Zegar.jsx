import { useEffect, useState } from "react";

export default function Zegar({ setTimeOut, questionNumber }) {
  const [Zegar, setTimer] = useState(30);

  useEffect(() => {
    if (Zegar === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [Zegar, setTimeOut]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return Zegar;
}
