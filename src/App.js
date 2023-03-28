import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

import axios from 'axios';

import './App.css';

import Modal from './Modal';
import Example from './Example';

function App() {
  let [hidden, setHidden] = useState(true);
  let [showModal, setShowModal] = useState(false);

  let [titles, setTitles] = useState([]);
  let [abstract, setAbstract] = useState('');
  
  function handleAbstractChange(e) {
    let value = e.target.value;
    setAbstract(value);
  }

  useEffect(() => {
    try{
      if(localStorage.getItem('OPENAI_API_KEY').length !== 51){
        setShowModal(true)
      }
    } 
    catch {
      setShowModal(true)
    }  
    
  }, []);

  let onGenerate = () => {

    let generatePrompt = async () => {

        const response = await axios.post(
            'https://api.openai.com/v1/completions', {
                'model': 'text-davinci-003',
                'prompt': 'Generate a title for a scientific paper with the following abstract : ' + abstract,
                'max_tokens': 1024,
                'temperature': 0.3,
                'n': 3,
                'stop': ['\n\n\n']
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('OPENAI_API_KEY')
                }
            }
        )

        return response.data.choices
    }

    generatePrompt().then((result) => {
        setTitles([
          result[0].text.trim(),
          result[1].text.trim(),
          result[2].text.trim(),
        ])
        setHidden(false)
    })
}

  return (
    <div>
      <div className='font-mono max-w-[30%] mx-auto'>
        <h1 className={ 'font-mono text-6xl text-center ' + (hidden? 'my-32' : 'my-16') }>
          researchGPT
        </h1>
        <p className='my-4'>enter an abstract:</p>
        <textarea value={abstract} onChange={handleAbstractChange} className='w-full h-36 border-solid border-2 border-black rounded-lg' name='abstract' />
        <p className={ 'my-4 ' + (hidden? 'hidden' : '') }>title:</p>
        <p className={ hidden? 'hidden' : '' }>1. {titles[0]}</p>
        <p className={ hidden? 'hidden' : '' }>2. {titles[1]}</p>
        <p className={ hidden? 'hidden' : '' }>3. {titles[2]}</p>

        <button onClick={() => {
          onGenerate()
        }} className='w-28 h-10 my-10 mx-auto block bg-white text-black border-solid border-2 border-black hover:bg-black hover:text-white hover:border-white rounded-md'>
          Generate
        </button>
      </div>

      <div className='flex absolute top-8	right-8'>
        <h1 className='h-6 my-auto'>OPENAI API KEY: </h1>&nbsp;&nbsp;
        <button className='p-2 bg-black text-white border-solid border-2 border-white hover:bg-white hover:text-black hover:border-black rounded-md' onClick={() => setShowModal(true)}>sk-******</button>
      </div>

      <Example showModal={showModal} setShowModal={setShowModal}/>

      <Analytics />
      
    </div>
  );
}

export default App;
