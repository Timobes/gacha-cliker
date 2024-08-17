//  Main btn
let clickAmountText = document.getElementById('amount-click-num')
let pressAmountText = document.getElementById('amount-press-num')
let buyBtnAmountText = document.getElementById('buy-item-num')
let buyItemPriceText = document.getElementById('buy-item-price')

// Banner
let banner = document.getElementById('banner-main')
let bannerBeginnerAmountText = document.getElementById('banner-amount')

// banner pop up 
let popUp = document.getElementById('b-pop-up')

let itemNameText = document.getElementById('item-name') 
let itemRarityText = document.getElementById('item-rarity') 
let itemActionText = document.getElementById('item-action') 
// let autoClickAmount = document.getElementById('amount-autoclick-num')

// banner
let x1 = document.getElementById('banner-btn-x1') 
let x10 = document.getElementById('banner-btn-x10')

let bannerBeginnerAmount = 0 // Кол-во открученных 
// let chanceBeginnerAmount = 0 // Шанс выбить 5 звёзд (0 - 100%) 

// Inventory
let inventory = document.getElementById('inventory') 

// Warn
let warnMsg = document.getElementById('warn-msg')

// Click
let buyItemAmount = 1 // Кол-во Доп нажатия
let clickAmount = 0 //Кол-во кликов
let nowPress = 1 //Сколько Кликов за одно надатие
let itemPrice = 1 // Цена доп нажатия

// Auto click
let autoClickAmount = 1

// User inventory
let inv = []

// Init Class game object
class Obj {
    constructor (name, rarity, action, text) {
        this.name = name // название 
        this.rarity = rarity // редкость от 1 - 5
        this.action = action // действие, +n к клику, либо +n к авто клику 
        this.text = text // текст, +n к клику, либо +n к авто клику
    }

    // actions() {
    //     // this.action = `${this.action}`
    //     this.action = 'hahah'
    // }

    // set actions(x) {
    //     this.action = x 
    // }

}

// Init obj
// let tv = new Obj('tv', 5, 100, )
// let microwave = new Obj('microwave', 5, 80)
// let refrigerator = new Obj('refrigerator', 4, 60)
// let laptop = new Obj('laptop', 3, 40)
// let conditioner = new Obj('conditioner', 2, 20)

function nowPressPlus(x) {
    return nowPress += x
}


let testObj = new Obj('test obj', 5, nowPressPlus(20), '20 к клику')

// Создание массива со всеми объектами 

// let masBeginner = [tv, microwave, refrigerator, laptop, conditioner]
let masBeginner = [testObj]


// inv.push(microwave)

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage) {
        clickAmount = parseInt(localStorage.getItem('clickAmount')) || 0
        nowPress = parseInt(localStorage.getItem('nowPress')) || 1
        buyItemAmount = parseInt(localStorage.getItem('buyItemAmount')) || 1
        itemPrice = parseInt(localStorage.getItem('itemPrice')) || 1
        bannerBeginnerAmount = parseInt(localStorage.getItem('bannerBeginnerAmount')) || 0
        inv = JSON.parse(localStorage.getItem('inv')) || []

        if (bannerBeginnerAmountText) {
            bannerBeginnerAmountText.innerText = bannerBeginnerAmount
        }

        if (clickAmountText) {
            clickAmountText.innerText = clickAmount 
            pressAmountText.innerText = nowPress
            buyBtnAmountText.innerText = buyItemAmount
            buyItemPriceText.innerText = itemPrice
            autoClick()
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
    localStorage.setItem('bannerBeginnerAmount', bannerBeginnerAmount)
    localStorage.setItem('inv', JSON.stringify(inv));
}

function mainClick() {
    console.log('click')

    clickAmount += nowPress
    pressAmountText.innerText = nowPress
    clickAmountText.innerText = clickAmount

    saveAllitem()
}

function clickOnXBtn(count, amount, bannerAmount, mas, bannerAmountText) {
    // Count сколько круток за раз
    // Amount - Сколько вычесть
    // bannerAmount - счётчик круток n баннера
    // mas - из какого массива  взять предметы
    // bannerAmountText - кол-во сделанных круток в виде текста 

    if (clickAmount >= amount) {
        warnMsg.innerText = ''

        clickAmount -= amount
        
        let item;

        for (let i = 0; i < count; i++) {

            itemNext()

            if (bannerAmount < 50) {
                item = mas[Math.floor(Math.random() * mas.length )]
            }
    
            if (item.rarity == 5) {
                bannerAmount = 0
            }
            
            console.log(item)
    
            inv.push(item)
    
            nowPress += item.action
    
            bannerAmount += 1
            bannerAmountText.innerText = bannerAmount
    
            popUp.classList.remove('close')
            banner.classList.add('close')
            
            // alert(`test! ${i}`)

            itemNameText.innerText = item.name
            itemRarityText.innerText = item.rarity
            itemActionText.innerText = item.text
        }

        saveAllitem()
    } else {
        warnMsg.innerText = "Нехватка кликов!"
    }
}

function onX1() {
    // if (clickAmount >= 10) {
    //     warnMsg.innerText = ''

    //     clickAmount -= 10
        
    //     let item;

    //     if (bannerBeginnerAmount < 50) {
    //         item = masBeginner[Math.floor(Math.random() * masBeginner.length )]
    //     }

    //     if (item.rarity == 5) {
    //         bannerBeginnerAmount = 0
    //     }
        
    //     console.log(item)

    //     inv.push(item)

    //     nowPress += item.action

    //     bannerBeginnerAmount += 1
    //     bannerBeginnerAmountText.innerText = bannerBeginnerAmount

    //     popUp.classList.remove('close')
    //     banner.classList.add('close')

    //     itemNameText.innerText = item.name
    //     itemRarityText.innerText = item.rarity
    //     itemActionText.innerText = item.text

    //     saveAllitem()
    // } else {
    //     warnMsg.innerText = "Нехватка кликов!"
    // }
    clickOnXBtn(1, 10, bannerBeginnerAmount, masBeginner, bannerBeginnerAmountText)

}

function onX10() {
    clickOnXBtn(10, 100, bannerBeginnerAmount, masBeginner, bannerBeginnerAmountText)
}

function autoClick() {
    console.log('auto click active!')
    setInterval(function () {
        clickAmount += autoClickAmount
        console.log('auto')
        console.log(clickAmount)
        clickAmountText.innerText = clickAmount
        saveAllitem()

    }, 1000)

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
    // let q = confirm('Вы уверены?')

    // if (q == true) {
        localStorage.clear()
        location.reload()
    // }
}

document.addEventListener('click', function() {
    console.log(clickAmount)
})





