import { menuArray } from './data.js'

const lists = document.querySelector(".item-lists")
const checkoutItems = document.querySelector('.checkout-items')
const totalPrice = document.querySelector('.total-price-value')
const checkOutPayment = document.querySelector('.checkout-payment')
const completeOrder = document.getElementById('order-complete-btn')
const checkOutPaymentModal = document.querySelector('.checkout-payment-modal-state')
const form = document.getElementById('payment-form')
const customer = document.getElementById('customer')
const orderConfirm = document.querySelector('.order-confirm')
let cart = []
let customerName = ""

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


lists.addEventListener("click", (e) => {

    orderConfirm.style.display = "none"

    const btn = e.target.closest(".add-btn")
    if(!btn) return

    const id = Number(btn.dataset.id)
    const selectedItem = menuArray.find(item => item.id === id)

    cart.push(selectedItem)

    const selectedEl = document.createElement("div")
    selectedEl.classList.add("checkout-item")
    selectedEl.dataset.id = selectedItem.id

    selectedEl.innerHTML = `
        <div class="checkout-item-name">
            <p class="checkout-item-name-title">${selectedItem.name}</p>
            <button class="remove-btn">remove</button>
        </div>
         <div class="checkout-item-price">$${selectedItem.price}</div>
        `
        checkoutItems.appendChild(selectedEl)

        updatePrice()

        checkOutPayment.style.display = "block"
})

checkoutItems.addEventListener("click", (e) => {

    const removeBtn = e.target.closest(".remove-btn")
    if(!removeBtn) return

    const itemEl = removeBtn.closest(".checkout-item")
    const id = Number(itemEl.dataset.id)

    const index = cart.findIndex(item => item.id === id)
    if(index !== -1){
        cart.splice(index, 1)
    }

    itemEl.remove()

    updatePrice()

    if(cart.length === 0){
        checkOutPayment.style.display = "none"
    }

})

function updatePrice(){
    const total = cart.reduce((sum,item) => sum + item.price, 0)
    totalPrice.textContent = `$${total}`
}

completeOrder.addEventListener("click", () => {

    checkOutPaymentModal.style.display = "block"

})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value.trim()
    const card = document.getElementById('card').value.trim()
    const cvv = document.getElementById('cvv').value.trim()

    if(card.length<16){
        alert("Card number must be at least 16 digits")
        return
    }

    if(cvv.length !== 3){
        alert("CVV must be 3 digits")
        return
    }

    alert("Payment successful")

    customerName = name

    checkOutPaymentModal.style.display = "none"
    
    customer.textContent = `Thanks, ${customerName}! Your order is on its way!`

    checkOutPayment.style.display = "none"

    orderConfirm.style.display = "block"

    cart = []
    checkoutItems.innerHTML = ""
    customerName = ""
    updatePrice()
    form.reset()
})
