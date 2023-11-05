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



// Age counter
const launchDate = new Date('January 2, 2008, 12:00:00');
setInterval(() => {
    const ms = 365.25 * 24 * 60 * 60 * 1000;
    const age = ( (Date.now() - launchDate.getTime()) / (ms) );
    document.getElementById('ageCount').innerText = age;
}, 100);



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
                    return event.target.dataset.hackedtext[index];
                };
                return characters[Math.floor(Math.random() * 36)];
            })
            .join("");

        if (iteration >= event.target.dataset.hackedtext.length) {
            clearInterval(interval);
        };

        iteration += (1 / 3);
    }, 30);
};



// Text Morph

const elts = {
    text1: document.getElementById("text-morph1"),
    text2: document.getElementById("text-morph2")
};

const texts = [
    "Why",
    "is",
    "this",
    "so",
    "satisfying",
    "to",
    "watch?",
    "Ez",
    "😀"
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {

        if (shouldIncrementIndex) {
            textIndex++;
        };

        // doMorph

        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;

        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        };

        // setMorph

        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    } else {

        // doCooldown

        morph = 0;

        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";

        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";

    };
};

animate();