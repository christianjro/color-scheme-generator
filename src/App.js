import './App.css'
import React from "react"


function App() {

  function handleSubmit(event) {
    event.preventDefault()
    const colorData = new FormData(event.target)
    
    const seedColorHex = colorData.get("colorPicker").slice(1)
    const selectedOption = colorData.get("dropDownMenu").toLowerCase()
    
    const url = `https://www.thecolorapi.com/scheme?hex=${seedColorHex}&mode=${selectedOption}&count=5`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const colorsArray = data.colors
        const hexArray = []
        for(let color of colorsArray){
          hexArray.push(color.hex)
        }
        
        const colorHTML = hexArray.map((item) => {
          return (
            `<div class="color-box" 
                key="${item.value}"
                id="${item.value}"
                style="background-color:${item.value}"
                onClick={copyHexCode}
            >
                <p class="colorTitle">${item.value}</p>
            </div>`
          )
        })
        
        document.getElementById("colorContainer").innerHTML = colorHTML.join("")
      })
  }


  function copyHexCode(event) {
    var copyText = event.target
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
    alert("Copied the text:" + copyText.value)
  }


  return (
    <main>
      <form id="form" action="" class="colorForm" onSubmit={handleSubmit}> 
            <input name="colorPicker" type="color" class="colorPicker"/>
            
            <select name="dropDownMenu" class="dropDownMenu">
                <option value="Monochrome" selected>Monochrome</option>
                <option value="Monochrome-dark">Monochrome-dark</option>
                <option value="Monochrome-light">Monochrome-light</option>
                <option value="Analogic">Analogic</option>
                <option value="Complement">Complement</option>
                <option value="Analogic-complement">Analogic-complement</option>
                <option value="Triad">Triad</option>
                <option value="Quad">Quad</option>
            </select>
         
            <button id="buttonClick" class="buttonClick" type="submit">Get Color Scheme</button>
        </form>
        <div id="colorContainer" onClick={copyHexCode}>
        </div>
    </main>
  )
}

export default App
