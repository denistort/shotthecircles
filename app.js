'use strict'

const gameSection = document.querySelector('.game-section');
const gameField = document.querySelector('.game-field');
const gameBar = document.querySelector('.game-bar');
const settings = document.querySelector('.settings');
const ammoOut = document.querySelector('.ammo-out');
const modalSetting = document.querySelector('.settings-modal');
const buttonCloseModal = document.querySelector('#closemodal');
const scoresOut = document.querySelector('.scores-out');
const modalScores = document.querySelector('.modal-scores');

///
const shotSound = new Audio('sounds/shot.wav');
const reloadSound = new Audio('sounds/reload.mp3');
const emptyAmmoSound = new Audio('sounds/empty\ gun.mp3');
///
let ammo = 10;
let shots = 0;
let missedShots = 0;
ammoOut.textContent = ammo;
let scores = 0;
scoresOut.textContent = scores;

gameField.addEventListener('click', () =>{
    if (ammo > 0){
        shotSound.play();
        ammo -= 1;
        ammoOut.textContent = ammo;
        shots += 1;
    } else if (ammo == 0) {
        emptyAmmoSound.play();
        ammoOut.textContent = "Pls Reload";
    }
})

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyR' && ammo < 1) {
      reloading();
    }
  });

function reloading() {
    ammo = 0;
    ammoOut.textContent = 'reloading';
    reloadSound.play();
    setTimeout(() => {
        ammo = 10;
        ammoOut.textContent = ammo;
    },6000)
};
let newDiv;

function rand(divSize){
    const width = gameField.offsetWidth - 100;
    const height = gameField.offsetHeight - 100;

    const left = Math.floor(Math.random() * (width + 1));
    const top = Math.floor(Math.random() * (height + 1));

    newDiv = document.createElement("div");
    newDiv.classList.add('new-div');
    gameField.append(newDiv);

    newDiv.addEventListener('click', () =>{
        if (ammo > 0) {
            newDiv.style.backgroundColor = 'red';
            scores += 1;
            scoresOut.textContent = scores;
            setTimeout(() =>{
                newDiv.remove();
            },500)
            
        }
    })
    newDiv.style.cssText = `
    width: ${divSize}px;
    height: ${divSize}px;
    top:${top}px;
    left:${left}px;
    `;

    setTimeout(() =>{
        newDiv.remove()
    }, delay)
};


let delay = 1500;
let size = 70;
let counter = 0;

let timerId = setTimeout( function timer() {
    ++counter;
    if (size < 20) {
        size = 70;
    }
    rand(size)
	timerId = setTimeout(timer, delay); // (*)
}, delay);

let seconds = 60;
let globalTimer = setTimeout( function roundTimer () {
    seconds -= 1;
    document.querySelector('.timer-out').textContent = seconds;
    globalTimer = setTimeout(roundTimer, delay)

    
    if (seconds < 1){
        clearTimeout(timerId);
        clearTimeout(globalTimer);
        modalScores.style.display = 'flex';
        document.querySelector('.modal-scores-line-out').textContent = scores;
        document.querySelector('.modal-shots-line-out').textContent = shots;
        document.querySelector('.modal-missed-shots-line-out').textContent = shots - scores;
        // gameField.removeEventListener('click', () =>{
        //     if (ammo > 0){
        //         shotSound.play();
        //         ammo -= 1;
        //         ammoOut.textContent = ammo;
        //     } else if (ammo == 0) {
        //         emptyAmmoSound.play();
        //         ammoOut.textContent = "Pls Reload";
        //         reloading();
        //     }
        // })
    }
}, delay);

settings.addEventListener('click', () => {
    modalSetting.style.display = 'block';
});
buttonCloseModal.addEventListener('click', () => {
    modalSetting.style.display = 'none';
});
