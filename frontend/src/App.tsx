import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [reply, setReply] = useState<string>("")
  const [messageContent, setMessageContent] = useState<string>("")


  const sendMessage = async (e: React.FormEvent) => {
    // prevent default
    e.preventDefault()
    setReply("")

    // make API request to the backend
    const response = await fetch(`api/message`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "content": messageContent,
      })
    })

    if (!response.ok) {
      console.error("failed API request.")
    }

    const data = await response.json()

    console.log("successfully loaded reply: ", data)


    setReply(data.content)
  }

  return (
    <>
      {messageContent && (
        <div>
          {messageContent
            .split('\n')
            .map((line, i) => (
              <p key={i}>{line}</p>
            ))}
        </div>
      )}
      {reply && <div> {reply}</div>}
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={messageContent}
          onChange={(e) => {setMessageContent(e.target.value)}}
        >
        </input>
        <button type='submit'> Send </button>
      </form>
    </>
  )
}

export default App
