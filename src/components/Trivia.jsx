import { useEffect, useState } from "react";
import useSound from "use-sound";
import Wrong from "../sounds/Wrong.wav.mp3";
import Correct from "../sounds/Correct.wav.wav";
import play from "../sounds/play.wav.wav";

export default function Trivia({
    data,
    setTimeOut,
    QuestionNumber,
    setQuestionNumber,
}) {
    const [Pytanie,setQuestion]=useState(null);
    const [WybierzOdpowiedz,setWybierzOdpowiedz]=useState(null);
    const [className,setclassName]=useState("Odpowiedz");
    const [letsPlay] = useSound(play);
    const [trafna] = useSound(Correct);
    const [bledna] = useSound(Wrong);

    useEffect(() => {
        letsPlay();
      }, [letsPlay]);
    
    useEffect(()=>{
        setQuestion(data[QuestionNumber-1]);
    },[data,QuestionNumber]);

      const delay = (duration, callback) => {
        setTimeout(() => {
          callback();
        }, duration);
      };
      
      const handleClick = (a) => {
        setWybierzOdpowiedz(a);
        setclassName("Odpowiedz Active");
        delay(3000, () => {
          setclassName(a.trafna ? "Odpowiedz Trafna" : "Odpowiedz Bledna");
        });


          delay(5000, () => {
          if (a.trafna) {
            trafna();
            delay(1000, () => {
              setQuestionNumber((prev) => prev + 1);
              setWybierzOdpowiedz(null);
            });

          } else {
            bledna();
            delay(1000, () => {
              setTimeOut(true);
            });
          }

          })
      };

    return(
    <div className="Trivia">
        <div className="Pytanie">{Pytanie?.Pytanie}</div>
        <div className="Odpowiedzi">
            {Pytanie.Odpowiedzi.map((a)=>(
                <div
                 className={WybierzOdpowiedz===a ? className : "Odpowiedz"}
                  onClick={()=>!WybierzOdpowiedz && handleClick(a)}
                  >
                    {a.text}
                    </div>
            ))}
        </div>
    </div>
    );
}