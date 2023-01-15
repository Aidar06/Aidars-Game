const arrBox = []
for (let i =1;i <= 15;i++){
    arrBox.push(Array.from(document.querySelector(`.d${i}`).children))
}

arrBox[arrBox.length - 1][0].classList.add('ship')

window.addEventListener('keydown', (e)=> {
    if (e.key === 'w' || e.key === 'ц'){
        for (let i = 0;i < arrBox.length;i++){
            if (i !== 0){
                if (arrBox[i][0].classList.contains('ship')){
                    arrBox[i][0].classList.remove('ship')
                    arrBox[i-1][0].classList.add('ship')
                }
            }
        }
    }
})

window.addEventListener('keydown', (e)=> {
    if (e.key === 's' || e.key === 'ы'){
        for (let i = arrBox.length-1;i >= 0;i--){
            if (i !== arrBox.length -1){
                if (arrBox[i][0].classList.contains('ship')){
                    arrBox[i][0].classList.remove('ship')
                    arrBox[i+1][0].classList.add('ship')
                }
            }
        }
    }
})


function randomEnemy(){
    let one = Math.ceil(Math.random() * arrBox.length -1)
    let two = Math.ceil(Math.random() * arrBox[0].length-1)
    if (one === 0){
        one += 1
    }
    if (two === 0){
        two += 1
    }

    arrBox[one][two].classList.add(`enemy`)
}


const enemyCount = document.querySelector('.enemy-count')
 let c = 0
window.addEventListener('keydown', (e)=> {
    if (e.key === ' '){
        for (let i = 0;i < arrBox.length;i++){
            if (arrBox[i][0].classList.contains('ship')){
                for (let j = 1;j < arrBox[i].length;j++){
                    arrBox[i][j].classList.add('bullet')
                        if(arrBox[i][j].classList.contains(`enemy`)){
                            arrBox[i][j].classList.remove(`enemy`)
                            c++
                            enemyCount.innerHTML = c
                        }
                    setTimeout(()=> {
                        arrBox[i][j].classList.remove('bullet')
                    }, 200)
                }
            }
        }
    }
})

const startBtn  = document.querySelector('.btnStart')
const menu = document.querySelector('.menu')
const realTime = document.querySelector('.real-time')
const nameInput = document.querySelector('.inputName')
const andMenu = document.querySelector('.and-menu')
const burgerBtn = document.querySelector('.burger-menu-btn')
const burgerMenu = document.querySelector('.burger-menu')
const playerName = document.querySelector('.player-name')
const playerPoint = document.querySelector('.player-point')
const burgerPlayerList = document.querySelector('.burger-menu--block__list')
const newGame = document.querySelector('.newGame')
const again = document.querySelector('.again')

//------burger-menu

burgerBtn.addEventListener('click', ()=> {
    burgerBtn.classList.toggle('btnBur')
    if (burgerBtn.classList.contains('btnBur')){
        burgerMenu.classList.remove('burger-claus')
        burgerBtn.innerHTML = '<ion-icon name="arrow-forward-outline"></ion-icon>'
        burgerMenu.classList.add('burger-open')
        burgerMenu.style.display = 'block'
    }else {
        burgerBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>'
        burgerMenu.classList.remove('burger-open')
        burgerMenu.classList.add('burger-claus')
        setTimeout(()=> {
            burgerMenu.style.display = 'none'
        }, 990)
    }
})

//-----------------

function forGame(){
    let t = +realTime.innerHTML
    let interTime = setInterval(()=> {
        t = t - 1
        realTime.innerHTML = t
        cleatTime()
    }, 1000)

    let enemyInter = setInterval(()=> {
        randomEnemy()
    }, 800)

    function cleatTime(){
        if (t === 0){
            realTime.innerHTML = '30'
            playerPoint.innerHTML = enemyCount.innerHTML
            c = 0
            enemyCount.innerHTML = c
            clearInterval(interTime)
            clearInterval(enemyInter)
            clearAllEnemy()
            andMenu.style.display = 'block'
        }
    }
}
function clearAllEnemy(){
    for (let i = 0;i < arrBox.length;i++){
        for (let j = 1;j < arrBox[i].length;j++){
            if(arrBox[i][j].classList.contains(`enemy`)){
                arrBox[i][j].classList.remove(`enemy`)
            }
        }
    }
}
function startGame(){
    if (nameInput.value.length !== 0){
        menu.style.display = 'none'
        playerName.innerHTML = nameInput.value
        forGame()
        nameInput.value = ''
    }else {
        nameInput.style.border = '1px solid red'
        setTimeout(()=> {
            nameInput.style.border = ''
        }, 1000)
    }
}

startBtn.addEventListener('click', ()=> {
 startGame()
})

window.addEventListener('keydown', (e)=> {
    if (e.key === 'Enter'){
        startGame()
    }
})

let playersList = []

function addPlayer(){
    playersList = JSON.parse(localStorage.getItem('p')) || []
    burgerPlayerList.innerHTML = ''
    if (playersList.length !== 0){
        playersList.map((el)=>{
            burgerPlayerList.innerHTML += `<div class="burger-menu--block__list--item">
        <h3>${el.name}</h3>
        <h3>${el.point}</h3>
        </div>`
        })
    }
}

addPlayer()

newGame.addEventListener('click', ()=> {
    andMenu.style.display = 'none'
    menu.style.display = 'block'
    let info = {
        name: playerName.innerHTML,
        point: playerPoint.innerHTML
    }
    playersList = [...playersList, info]
    localStorage.setItem('p',JSON.stringify(playersList))
    addPlayer()
})

again.addEventListener('click', ()=> {
    andMenu.style.display = 'none'
    forGame()
})







