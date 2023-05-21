let items = document.querySelectorAll(".hero-bg");
let dataM = document.querySelector("body").dataset.mult;

document.addEventListener("scroll", () => {
    let scroll = window.scrollY;

    let mult = (dataM * (items.length - 1));
    let per = 10;

    items.forEach((elem) => {
        // var = condition ? yes : no
        let tranY = ((elem === items[6]) ? ((scroll * mult) + 40) : (scroll * mult));

        elem.style.transform = `translateY(${tranY}px) perspective(${per*scroll}px)`;

        mult -= dataM;
        per -= 1;
    });
});