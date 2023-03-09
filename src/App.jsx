import { useEffect, useState } from 'react'
import { data } from './data/data'



export default function App() {

  const {spanish} = data
  
  const [ word, setWord ] = useState(() => spanish[Math.random() * spanish.length | 0])
  const [ characterCount, setCharacterCount ] = useState(0);
  const [ buffer, setBuffer ] = useState("");
  const [ time, setTime ] = useState(0);
  const [ play, setPlay ] = useState(true)
  const [ wpm, setWpm] = useState(0)



  function handleSubmit( event ){
    event.preventDefault();

    if ( buffer === word ) {
      setWord(spanish[Math.random() * spanish.length | 0]);
      setCharacterCount((characterCount) => characterCount + word.length);
      setWpm((wpm) => wpm + 1 )

    }
    else{
      setTime(time-2)
      if(time <= 0)
      setTime(0)
    }

    setBuffer("");
  }

  function handleReset (){
    setTime(0);
    setCharacterCount(0);
    setPlay((play) => !play)
  }

  function handlePlay(){
    setTime(60);
    setPlay(true);
    setCharacterCount(0);
  }



useEffect(() => {


  if (time !== 0) {
    const timeout = setTimeout(() => setTime(time -1), 1000)

    return () => clearTimeout(timeout)
  }  
}, [time])





  return (
    <>
      <h1 className='text-fuchsia-200 font-mono text-center text-4xl mb-10 underline underline-offset-8 '>Write per minute</h1>
        <div className= "container text-lg relative bg-orange-400 text-center w-96 h-96 flex flex-col justify-center rounded-3xl font-mono shadow-gray-900 shadow-xl border border-b-8 border-yellow-300  m-auto">
          {play ? <button className='absolute top-4 left-4 text-stone-900  text-3xl border py-0 px-2 rounded-lg  border-slate-800' onClick={() => handleReset()}>x</button> : ""}
          {Boolean(time) && play && <h2 className='text-xl mb-5 mt-5'>{word}</h2>}
          {time && play ? (
            <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
              <input className={buffer && word? 'rounded self-center h-8 py-2 px-2 text-center border-lime-700 border-2' : 'rounded self-center h-8 py-2 px-2 text-center border-red-700 border-2 outline-2'} value={buffer} onChange={(e) => setBuffer(e.target.value)} type="text" autoFocus />
              <button className='block self-center text-center mt-5 py-2 px-4 border rounded-lg' type="submit">Submit</button>
            </form>
          ) :  <button className='self-center border border-fuchsia-900 py-2 px-4 rounded-xl text-3xl hover:bg-orange-200 animate-bounce border border-b-8 border-slate-800' onClick={() => handlePlay()}>Play</button>}
                <h3 className='mt-10 '> Characters typed: {characterCount}</h3>
                {time ? <h4 >Remaining time: {time}</h4> : ""}
                <h5>Words x minute: {wpm}</h5>
        </div>
    </>
  )
}


