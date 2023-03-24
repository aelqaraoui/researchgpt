import React, { useEffect, useState } from "react";

const Modal = (props) => {

    let [openaiapikey, setOpenaiapikey] = useState('');

    function handleOpenAIChange(e) {
        let value = e.target.value
        setOpenaiapikey(value)
    }

    useEffect(() => {
        setOpenaiapikey(localStorage.getItem('OPENAI_API_KEY'))
    }, [])

  return (
    <>
      {props.showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black text-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t ">
                  <h3 className="text-3xl font=semibold">All your keys are stored in the browser</h3>
                </div>
                <div className="relative p-6 flex-auto">

                  <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <a className='text-blue-500' target='_blank' rel='noreferrer' href='https://platform.openai.com/account/api-keys'>→ Get your API key from OpenAI dashboard.</a>
                    <br/><br/><br/>
                    <label className="block text-white text-sm font-bold mb-1">
                      OPENAI API KEYS : 
                    </label>
                    <input value={openaiapikey} onChange={handleOpenAIChange} id='openai' className="shadow appearance-none border rounded w-full py-2 px-1 bg-black text-white" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-black bg-white hover:text-white hover:bg-black border-2 border-black hover:border-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                        props.setShowModal(false)
                        localStorage.setItem('OPENAI_API_KEY', document.getElementById("openai").value);
                        } 
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;