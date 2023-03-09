import { useEffect, useState } from 'react'
import { data } from './data/data'



export default function App() {

  const {spanish} = data
  
  const [ word, setWord ] = useState(() => spanish[Math.random() * spanish.length | 0])
  const [ characterCount, setCharacterCount ] = useState(0);
  const [ buffer, setBuffer ] = useState("");
  const [ time, setTime ] = useState(0);
  const [ play, setPlay ] = useState(true)

  function handleSubmit( event ){
    event.preventDefault();

    if ( buffer === word ) {
      setWord(spanish[Math.random() * spanish.length | 0]);
      setCharacterCount((characterCount) => characterCount + word.length);
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
    setPlay(true)
    characterCount(0)
  }


useEffect(() => {
  if (time !== 0) {
    const timeout = setTimeout(() => setTime(time -1), 1000)

    return () => clearTimeout(timeout)
  }
}, [time])


  return (
    <>sdaasdasdasd
    <h1 className='text-fuchsia-200 font-mono text-center text-4xl mb-10 underline underline-offset-8 '>Write per minute</h1>
      <div className=" relative bg-orange-400 text-center w-96 h-96 flex flex-col justify-center rounded-3xl font-mono shadow-gray-900 shadow-xl border border-b-8 border-yellow-300">
        <button className='absolute top-4 left-4 text-stone-900  text-3xl border py-0 px-2 rounded-lg  border-slate-800' onClick={() => handleReset()}>←</button>
        {Boolean(time) && play && <h2 className='text-xl mb-10'>{word}</h2>}
        {time && play ? (
          <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
            <input className='rounded self-center h-8' value={buffer} onChange={(e) => setBuffer(e.target.value)} type="text" autoFocus />
            <button className='block self-center text-center mt-4 py-2 px-4 border rounded-lg' type="submit">Submit</button>
          </form>
        ) :  <button className='self-center border border-fuchsia-900 py-2 px-4 rounded-xl text-3xl hover:bg-orange-200 animate-bounce border border-b-8 border-slate-800' onClick={() => handlePlay()}>Play</button>}
              <h3 className='mt-10 text-lg'> Characters typed: {characterCount}</h3>
              <h4 className='text-lg'>Remaining time: {time}</h4>
      </div>
    </>
  )
}


