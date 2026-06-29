const cartBasket = document.querySelector('.cart-btn img');
const cartPopup = document.querySelector('.cart');
const closeBtn = document.querySelector('.close-btn');
const menuIcon = document.querySelector('.menu');
const sideBar = document.querySelector('.side-bar');
const modal = document.querySelector('.modal')
const productImg = document.querySelector('.main-image .img');
const closeBtnLightBox = document.querySelector('.close-btn-lightBox');
const thumbnailImages = document.querySelectorAll('.thumbnail-list .thumbnail-btn');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');
const productImgLightBox = document.querySelector('.shown-img')
const thumbnailImagesLightBox = document.querySelectorAll('.thumbnail-list-lightBox .thumbnail-btn')
const nextBtnInMob = document.querySelector('.next-btn-mob');
const previousBtnInMob = document.querySelector('.previous-btn-mob');
const increaseBtn = document.querySelector('.qty-btn-inc');
const decreaseBtn = document.querySelector('.qty-btn-dec');
const quantityBtn = document.querySelector('.qty-number');
const addToCartBtn = document.querySelector('.add-to-cart-btn');


// Logic to open and close Cart PopUp once clicking
cartBasket.addEventListener('click', showCartPopup)
function showCartPopup() {
    cartPopup.classList.toggle('show-cart')
}


// Logic for sidebar and menu in small screens
menuIcon.addEventListener('click', showSideBar)
function showSideBar() {
    sideBar.classList.add('show-side-bar')
}
closeBtn.addEventListener('click', closeSideBar)
function closeSideBar() {
    sideBar.classList.remove('show-side-bar')
}


// Logic for lightBox to show or hide LightBox
productImg.addEventListener('click', showLightBox)
function showLightBox() {
    if (window.innerWidth > 450) modal.classList.add('show-modal');
}

closeBtnLightBox.addEventListener('click', closeLightBox)
function closeLightBox() {
    modal.classList.remove('show-modal')
}

// optional when clicking the lightBox it closes
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeLightBox()
    }
})



// SOURCE OF TRUTH
const arrayOfThumbnails = Array.from(thumbnailImages); // array of images [thumbnails]
const arrayOfThumbnailsInLightBox = Array.from(thumbnailImagesLightBox)
let pointer = 0
let currentImage = arrayOfThumbnailsInLightBox[pointer]


// logic for main image thumbnails
const defaultThumbnail = arrayOfThumbnails[0].classList.add('activeImg');
for (let image of arrayOfThumbnails) {
    image.addEventListener('click', () => {
        arrayOfThumbnails.forEach((image) => image.classList.remove('activeImg'));
        image.classList.add('activeImg')
        productImg.setAttribute('src', `${image.getAttribute('data-large-src')}`)
    })
}


// Logic for lightBox tumbnails
arrayOfThumbnailsInLightBox[0].classList.add('activeImg')
nextBtn.addEventListener('click', nextImage)
function nextImage() {
    if (arrayOfThumbnailsInLightBox.indexOf(currentImage) === arrayOfThumbnailsInLightBox.length - 1) return;
    pointer += 1
    currentImage = arrayOfThumbnailsInLightBox[pointer]
    // change the current image
    productImgLightBox.firstElementChild.src = currentImage.getAttribute('data-large-src')
    // show active thumbnail
    arrayOfThumbnailsInLightBox.forEach((image) => image.classList.remove('activeImg'))
    currentImage.classList.add('activeImg')
}

previousBtn.addEventListener('click', previousImage)
function previousImage() {
    if (arrayOfThumbnailsInLightBox.indexOf(currentImage) === 0) return;
    pointer -= 1
    currentImage = arrayOfThumbnailsInLightBox[pointer]
    productImgLightBox.firstElementChild.src = currentImage.getAttribute('data-large-src')
    // show active thumbnail
    arrayOfThumbnailsInLightBox.forEach((image) => image.classList.remove('activeImg'))
    currentImage.classList.add('activeImg')
}


// Logic for thumbnails in small screens(Mobile)
let pointerInMob = 0
const currentImageInMob = arrayOfThumbnails[pointerInMob]
nextBtnInMob.addEventListener('click', nextImageInMobile)
function nextImageInMobile() {
    if (arrayOfThumbnails.indexOf(currentImage) === arrayOfThumbnails.length - 1) return;
    pointerInMob += 1
    currentImage = arrayOfThumbnails[pointerInMob]
    productImg.setAttribute('src', `${currentImage.getAttribute('data-large-src')}`)
}

previousBtnInMob.addEventListener('click', previousImageInMobile)
function previousImageInMobile() {
    if (arrayOfThumbnails.indexOf(currentImage) === -1) return;
    if (arrayOfThumbnails.indexOf(currentImage) === 0) return;
    pointerInMob -= 1
    currentImage = arrayOfThumbnails[pointerInMob]
    productImg.setAttribute('src', `${currentImage.getAttribute('data-large-src')}`)
}


// loigic for quantity increase and decrease
const availabilityMessage = document.querySelector('.availability');

let quantity = Number(quantityBtn.textContent);
increaseBtn.addEventListener('click', increaseQuantity);
function increaseQuantity() {
    if (quantity < 5) {
        quantity++
        updateQuantity()
        return;
    }
    availableQuantity()
}

decreaseBtn.addEventListener('click', decreaseQuantity);
function decreaseQuantity() {
    availabilityMessage.classList.remove('show-availability');
    if (quantity > 0) {
        quantity--
    }
    updateQuantity()
}

function updateQuantity() {
    return quantityBtn.textContent = quantity;
}

function availableQuantity() {
    availabilityMessage.classList.add('show-availability');
}


// Logic for price calculation and update
const originalPrice = document.querySelector('.original-price');
function getpriceAndFilter() {
    let price = originalPrice.textContent
    let newPrice = Number((price.replace('$', '')) * 50 / 100)
    return newPrice
}

function calcOfCost() {
    let price = getpriceAndFilter();
    let totalPricePaid = price * quantity
    return totalPricePaid
}

// creation for new products in the cart
const cartsection = document.querySelector('.cart-section')
addToCartBtn.addEventListener('click', () => {
    if (quantity === 0) return;
    // stop notification if found
    stopNotificationSound()
    createProduct()
    deleteProduct()
    emptyCartMessage()
    notification()
    playNotificationSound()
    showRecipt()
})


function createProduct() {
    const productHtml = `
    <div class="full-product-details">
     <div class="product-in-cart">
      <div class="product-cart-img">
      <img src="./images/image-product-1-thumbnail.jpg"/>
     </div>
     <div class="product-detail">
     <p class="product-content">fall limited edition sneakers</P>
     <p class="product-amount">${'$' + getpriceAndFilter() + '.00'} x ${quantity} <strong> ${'$' + calcOfCost() + '.00'} </strong> </P>
     </div>
     <div class="delete">
     <img src="./images/icon-delete.svg"/>
     </div>
     </div>
     <div class="checkout">
     <button class="checkout-btn">checkout</button>
     </div>
    </div>
    `
    cartsection.insertAdjacentHTML('beforeend', productHtml)
}

function deleteProduct() {
    const deletBtn = document.querySelectorAll('.delete')
    deletBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.remove()
            notification()
            if (document.querySelectorAll('.full-product-details').length === 0) {
                document.querySelector('.cart-empty').style.display = 'block'
            }
        })
    })
}

// message when the cart is empty
function emptyCartMessage() {
    const products = document.querySelectorAll('.full-product-details')
    const empty = document.querySelector('.cart-empty')
    if (products.length !== 0) {
        empty.style.display = 'none'
    }
}

// creating notifications
function notification() {
    const productsNumber = document.querySelector('.products-number');
    const productsInCart = document.querySelectorAll('.full-product-details')
    productsNumber.textContent = productsInCart.length
}

function showRecipt() {
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    const recipt = document.querySelector('.recipt')
    checkoutBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            recipt.classList.add('show-recipt')
            createdataInRecipt()
        })
    })
}

function closeRecipt() {
    const recipt = document.querySelector('.recipt')
    recipt.addEventListener('click', () => {
        recipt.classList.remove('show-recipt')
    })
}

closeRecipt()

function createdataInRecipt() {
    const recipt = document.querySelector('.recipt')
    recipt.innerHTML = `
    <div class="data">
    <h3 class="recipt-header">purchase recipt</h3>
    <p class="operation"> <strong>operation</strong>: successfull </P>
    <p class="product"> <strong>product</strong>: sneakers show </P>
    <p class="purchased-quantity"> <strong>quantity</strong>: ${quantity} </P>
    <p class="discount"><strong>discount</strong>: 50%</P>
    <p class="cost"> <strong>price</strong>: ${'$' + ' ' + calcOfCost() + '.00'} </P>
    <p class="total-price"> <strong>total</strong>: ${'$' + ' ' + calcOfCost() + '.00'} </P>
    <p class="thanks-word">thanks for visiting our website</P>
    </div>
    `
}

const alarm = new Audio('./audio/mixkit-correct-answer-tone-2870.wav')
function playNotificationSound() {
    alarm.play()
}

function stopNotificationSound() {
    alarm.pause()
    alarm.currentTime = 0
}

