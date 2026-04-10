import { menuArray } from './data.js'

const lists = document.querySelector(".item-lists")

menuArray.forEach((menu) => {
    const postEl = document.createElement("div")
    postEl.classList.add("item")

    postEl.innerHTML = `
    <div class="icon">${menu.emoji}</div>
    <div class="name-description">
        <h2 class="item-name">${menu.name}</h2>
        <p class="item-description">${menu.ingredients.join(', ')}</p>
        <p class="item-price">$${menu.price}</p>
    </div>
    <div class="add-btn" data-id="${menu.id}">+</div>`

     lists.appendChild(postEl)

     const divider = document.createElement("div")
     divider.classList.add("divider")

     lists.appendChild(divider)
})


const checkoutItems = document.querySelector('.checkout-items')
const totalPrice = document.querySelector('.total-price-value')
const checkOutPayment = document.querySelector('.checkout-payment')
let cart = []

lists.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn")
    if(!btn) return

    const id = Number(btn.dataset.id)
    const selectedItem = menuArray.find(item => item.id === id)
    
    cart.push(selectedItem)

        const selectedEl = document.createElement("div")
        selectedEl.classList.add("checkout-item")

        selectedEl.innerHTML = `
        <div class="checkout-item-name">
            <p class="checkout-item-name-title">${selectedItem.name}</p>
            <button class="remove-btn">remove</button>
        </div>
         <div class="checkout-item-price">$${selectedItem.price}</div>
        `
        checkoutItems.appendChild(selectedEl)

        const total = cart.reduce((sum,item) => sum + item.price, 0)
        totalPrice.textContent = `$ ${total}`

        checkOutPayment.style.display = "block"
})

