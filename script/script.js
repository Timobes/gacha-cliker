//  Main btn
let clickAmountText = document.getElementById('amount-click-num')
let pressAmountText = document.getElementById('amount-press-num')
let buyBtnAmountText = document.getElementById('buy-item-num')
let buyItemPriceText = document.getElementById('buy-item-price')
let bannerAmountText = document.getElementById('banner-amount')

let banner = document.getElementById('banner-main')

// banner pop up 
let popUp = document.getElementById('b-pop-up')

let itemNameText = document.getElementById('item-name') 
let itemRarityText = document.getElementById('item-rarity') 
let itemActionText = document.getElementById('item-action') 

// banner
let x1 = document.getElementById('banner-btn-x1') 
let x10 = document.getElementById('banner-btn-x10')

// Inventory
let inventory = document.getElementById('inventory') 

// Warn
let warnMsg = document.getElementById('warn-msg')
// let autoClickAmount = document.getElementById('amount-autoclick-num')

let buyItemAmount = 1 // Кол-во Доп нажатия
let clickAmount = 0 //Кол-во кликов
let nowPress = 1 //Сколько Кликов за одно надатие
let itemPrice = 1 // Цена доп нажатия

let bannerAmount = 0 // Кол-во открученных 

let inv = []

class Obj {
    constructor (name, rarity, action) {
        this.name = name // название 
        this.rarity = rarity // редкость от 1 - 5
        this.action = action // действие, +n к клику, либо +n к авто клику 
    }
}

let microwave = new Obj('microwave', 5, 100)

// inv.push(microwave)

// console.log('microwawe = ',microwave)

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage) {
        clickAmount = parseInt(localStorage.getItem('clickAmount')) || 0
        nowPress = parseInt(localStorage.getItem('nowPress')) || 1
        buyItemAmount = parseInt(localStorage.getItem('buyItemAmount')) || 1
        itemPrice = parseInt(localStorage.getItem('itemPrice')) || 1
        bannerAmount = parseInt(localStorage.getItem('bannerAmount')) || 0
        inv = JSON.parse(localStorage.getItem('inv')) || []

        if (bannerAmountText) {
            bannerAmountText.innerText = bannerAmount
        }

        if (clickAmountText) {
            clickAmountText.innerText = clickAmount 
            pressAmountText.innerText = nowPress
            buyBtnAmountText.innerText = buyItemAmount
            buyItemPriceText.innerText = itemPrice
        }

        if(inventory) {
            startInv()
        }
    }
    
})

function saveAllitem() {
    localStorage.setItem('buyItemAmount', buyItemAmount);
    localStorage.setItem('clickAmount', clickAmount);
    localStorage.setItem('nowPress', nowPress);
    localStorage.setItem('itemPrice', itemPrice);
    localStorage.setItem('bannerAmount', bannerAmount)
    localStorage.setItem('inv', JSON.stringify(inv));
}

function mainClick() {
    console.log('click')

    clickAmount += nowPress
    pressAmountText.innerText = nowPress
    clickAmountText.innerText = clickAmount

    saveAllitem()
}

function onX1() {
    if (clickAmount >= 10) {
        clickAmount -= 10

        // let item = masX1(random(100))
        let item = microwave
        console.log(item)
        
        console.log(typeof(inv))
        inv.push(item)

        nowPress += item.action

        console.log('inv = ',inv)

        bannerAmount += 1
        bannerAmountText.innerText = bannerAmount
        console.log('x1 input')

        popUp.classList.remove('close')
        banner.classList.add('close')

        itemNameText.innerText = item.name
        itemRarityText.innerText = item.rarity
        itemActionText.innerText = item.action

        saveAllitem()
    } else {

    }
}

function onX10() {
    if (clickAmount >= 100) {
        clickAmount -= 100

        // 

        saveAllitem()
    } else {

    }
}

function itemNext() {
    banner.classList.remove('close')
    popUp.classList.add('close')
}

function startInv() {
    console.log(inv)
    for(let i = 0; i <= inv.length; i++) {
        inventory.innerHTML += 
        `
            <div class="b-inv">
                <p class="item-name"><span id="item-name">${inv[i].name}</span></p>
                <p class="item-rarity"><span id="item-rarity">${inv[i].rarity}</span> звёзд</p>
                <p class="item-action">+<span id="item-action">${inv[i].action}</span> к клику / автоклику</p>
                <hr class="line">
            </div>
        `
    }
}

function buyBtn() {
    if (clickAmount >= itemPrice) {
        warnMsg.innerText = ''

        clickAmount -= itemPrice
        clickAmountText.innerText = clickAmount

        nowPress += buyItemAmount
        pressAmountText.innerText = nowPress

        buyItemAmount *= 2
        buyBtnAmountText.innerText = buyItemAmount

        itemPrice *= 6
        buyItemPriceText.innerText = itemPrice

        saveAllitem()
    } else {
        // console.log("Нехватка кликов!")
        warnMsg.innerText = "Нехватка кликов!"
    }
}

function delAllProgress() {
    let q = confirm('Вы уверены?')

    if (q == true) {
        localStorage.clear()
        location.reload()
    }
}

document.addEventListener('click', function() {
    console.log(clickAmount)
})





