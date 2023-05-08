
const tilesContainers = document.querySelector('.tiles');
const colors = [`aqua`,`chocolate`,`blueviolet`, `pink`, `lavender`, `gold`,`lawngreen`,`maroon`];
const colorsPickList = [...colors,...colors];
const tileCount = colorsPickList.length;

// console.log(colorsPicklist);
// Game starts

let revealedCount = 0;
let activeTile = null;
let awatingEndOfMove = false;


function buildTile(color) {
    const element = document.createElement(`div`);

    element.classList.add(`tile`);
    element.setAttribute(`data-color`, color);
    element.setAttribute(`data-revealed`, `false`)

    element.addEventListener(`click`, ()=> {
       const revealed = element.getAttribute(`data-revealed`);
       
        if (awatingEndOfMove || revealed === `true` || element === activeTile) {
            return
        }

        element.style.backgroundColor = color;

        if(!activeTile) {
            activeTile = element;

            return;
        }

        const colorToMatch = activeTile.getAttribute(`data-color`);

        if (colorToMatch === color) {
            activeTile.setAttribute(`data-revealed`,`true`);
            element.setAttribute(`data-revealed`,`true`);

            awatingEndOfMove = null;
            activeTile = null;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                alert(`YOU WIN! Refresh the page to play again!`)
            }

            return;
        }

        //incorrect match
        awatingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor= null;

            awatingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });

    return element;
}






for(let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPickList.length);
    const color = colorsPickList[randomIndex];
    const tile = buildTile(color);

    colorsPickList.splice(randomIndex, 1);
  tilesContainers.appendChild(tile);

// console.log(color);
}