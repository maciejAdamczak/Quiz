import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Zegar from "./components/Zegar";
import Trivia from "./components/Trivia";


function App() {
  const [questionNumber, setQuestionNumber]= useState(1);
  const [timeOut, setTimeOut]=useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [username, setUsername] = useState(null);

  const data =[
    //pytanie 1
    {
      id: 1,
      Pytanie: "Stolicą polski jest?",
      Odpowiedzi: [
        {
          text: "Sopot",
          correct: false,
        },
        {
          text:"Warszawa",
          correct: true,
        },
        {
          text:"Berlin",
          correct:false,
        },
        {
          text:"Hel",
          correct:false,
        }
      ],
    },
    //pytanie 2
    {
      id: 2,
      Pytanie: "Które ze zwierząt jest ptakiem?",
      Odpowiedzi: [
        {
          text:"Kazuar",
          correct:true,
        },
        {
          text:"Gibon",
          correct:false,
        },
        {
          text:"Skolopendra",
          correct:false,
        },
        {
          text:"Rechotka",
          correct:false,
        },
      ],
    },
    //pytanie 3
    {
      id: 3,
      Pytanie: "W którym roku Boleslaw Chrobry zostal Krolem Polski?",
      Odpowiedzi:[
        {
          text:"996r.",
          correct:false,
        },
        {
          text:"1000r.",
          correct:false,
        },
        {
          text:"1024r.",
          correct:true,
        },
        {
          text:"1017r.",
          correct:false,
        },
      ],
    }
  ];
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );
  
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">Zarobiles: {earned}</h1>
            ) : (
              <>
                <div className="gora">
                  <div className="zegar">
                    <Zegar
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="dol">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="ListaNagrod">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "PozycjaListyNagrod active"
                      : "PozycjaListyNagrod"
                  }
                >
                  <span className="PozycjaNagrodNumer">{m.id}</span>
                  <span className="PozycjaNagrodSuma">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;