// Selected in select list
function OptionList(elem) {
    // alert(document.getElementById("ez").value);
    alert(elem.value);
};



// // Asks if want to close tab after clicking once anywhere on screen
// window.addEventListener('beforeunload', (e) => {
//     e.preventDefault();
//     e.returnValue = '';
//     // return e;
// });

// // Instantly closes tab when opening page 
// window.close();



// Hacked Text Effect
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

let interval = null;

document.querySelector("#hacked").onmouseover = (event) => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return event.target.dataset.value[index];
                };
                return characters[Math.floor(Math.random() * 36)];
            })
            .join("");

        if (iteration >= event.target.dataset.value.length) {
            clearInterval(interval);
        };

        iteration += (1 / 3);
    }, 30);
};