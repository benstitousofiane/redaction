sheet = document.getElementById("sheet");
footer = document.getElementById("footer");
bindlocker = false

function createTextElement(){
    bindlocker = true;
    let newTextElementInput = document.createElement("textarea");
    newTextElementInput.setAttribute("class","text");
    newTextElementInput.setAttribute("cols","30");
    newTextElementInput.setAttribute("rows","5");
    
    footer.appendChild(newTextElementInput);
    
    setTimeout(() => {
        newTextElementInput.focus();
    }, 1);

    newTextElementInput.addEventListener("keydown", (event) => {
        if (event.shiftKey && event.key === "Enter"){
            
            if (newTextElementInput.value !== ""){
                // séparer les mots et crée un élément pour chaque mot
                newTextElementInput.value.split(/\s+/).forEach((mot) => {
                    let newTextElement = document.createElement("h2");
                    newTextElement.textContent = mot;
                    sheet.appendChild(newTextElement);
                });

                footer.removeChild(newTextElementInput);
            }
            else{
                footer.removeChild(newTextElementInput);
            }
            bindlocker = false;
        }
    });
}


function createMathElement(){
    bindlocker = true;
    let newMathElementInput = document.createElement("textarea");
    newMathElementInput.setAttribute("class","math");
    newMathElementInput.setAttribute("cols","30");
    newMathElementInput.setAttribute("rows","5");
    
    footer.appendChild(newMathElementInput);
    
    setTimeout(() => {
        newMathElementInput.focus();
    }, 1);

    newMathElementInput.addEventListener("keydown", (event) => {
        if (event.shiftKey && event.key === "Enter"){
            
            if (newMathElementInput.value !== ""){
                // séparer les mots et crée un élément pour chaque mot
                newMathElementInput.value.split(/\s+/).forEach((mot) => {
                    let newMathElement = document.createElement("h2");
                    // newMathElement.textContent = mot;
                    katex.render(mot, newMathElement, {
                        throwOnError: false,
                        displayMode: true,
                    });
                    sheet.appendChild(newMathElement);
                });

                footer.removeChild(newMathElementInput);
            }
            else{
                footer.removeChild(newMathElementInput);
            }
            bindlocker = false;
        }
    });
}


window.addEventListener("keydown", (event) => {
    
    if (bindlocker !== true){
        if (event.key === "Backspace" || event.key === "Delete"){
            if (sheet.childElementCount > 0){
                sheet.removeChild(sheet.lastChild);
            }
        }
        if (event.key === "t" || event.key === "T"){
            createTextElement();
        }
        if (event.key === "m" || event.key === "M"){
            createMathElement();
        }
    }

});

