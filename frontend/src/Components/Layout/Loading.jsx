import React from 'react'

function Loading() {
  return (
    <div className="text-xl md:text-3xl text-center">
        <p>
            <span class="logo-letter font-bold text-black">L</span>
            <lord-icon
                src="https://cdn.lordicon.com/dycatgju.json"
                trigger="loop"
                delay="0"
                colors="primary:#121331"
                state="loop"
                style={{width: "25px", height: "25px", paddingTop: "4px"}}>
            </lord-icon>
            <span class="logo-letter font-bold text-black">oading...</span>
        </p>
    </div>
  )
}

export default Loading