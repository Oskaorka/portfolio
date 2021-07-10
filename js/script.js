'use strict'
const card1 = document.querySelector('#card-1');
const card2 = document.querySelector('#card-2');
const card3 = document.querySelector('#card-3');
const btnForm1 = document.querySelector('#btn-form1');
const cardSuccess = document.querySelector('#card-success');
const cardFailed = document.querySelector('#card-failed');
const addMore = document.querySelector('#addMore');
const chose = document.querySelectorAll('.choice');
const btnContinue = document.querySelector('#continue');
const btnForm3 = document.querySelector('#btnForm-3');
const productsForm3 = document.querySelector('#productsForm3');
const delProd = document.querySelectorAll('.f3-product-1');
const card = document.querySelectorAll('.card');
const tryAgain = document.querySelector('#try-again');
const back = document.querySelector('#back');
const loader = document.querySelector('.loader');
const loader1 = document.querySelector('.loader-1');
const progressbarMarker = document.querySelector('.progressbar-marker');
const progressbar = document.querySelector('.progressbar');
let addUrl = location.href;
let num = 80;
let height = productsForm3.getBoundingClientRect();
let countProduct;

btnForm1.addEventListener('click', ()=> {
    location.href = addUrl+'#cbp=ajax/paymentsuccess';
    setTimeout(()=>{addLoader(btnForm1,card1,cardSuccess,loader1,'form-3__loader-1')},100);
    function removeBtn() {
        btnForm1.innerHTML = `
        Submit and Pay 24.99 USD
        `
    }
    setTimeout(()=>{removeBtn();},1600);
    
})
actionBtn(back,cardSuccess,card1,loader1,'form-3__loader-1');
function actionBtn(btn,hideCard,viewCard,removeLoader,removeClassLoader) {
    btn.addEventListener('click', ()=> {
        nextCard(hideCard,viewCard)
        removeLoader.classList.remove(removeClassLoader);
        btnForm3.setAttribute('data-btn',5);
        // location.href = addUrl+'#cbp=ajax/';
        location.href = addUrl+'';
    })

}

function hideCard() {
    if(event){
        event.preventDefault();
    }
    card1.style.display = 'none';
    card2.style.display = 'flex';
}

function nextCard(hideCard,viewCard) {
    hideCard.style.display = 'none';
        viewCard.style.display = 'flex';
    }
    chose.forEach(item => {
        item.addEventListener('click', (e)=> {
            if(e.target && e.target.matches('p.sup-text')||e.target && e.target.matches('span.round')||e.target && e.target.matches('input.radio')||e.target && e.target.matches('label')||e.target && e.target.matches('p.sub-text')){
                
                num = e.target.offsetParent.getAttribute('data-price');
                
                countProduct = e.target.offsetParent.getAttribute('data-countProduct');
                for(let i=0; i<countProduct; i++){
                    card[i].style.display = 'flex'
                    card[i].setAttribute('data-id', i);
                    card[i].classList.add('card-basket');
                }
                btnContinue.addEventListener('click', ()=>{
                    btnForm3.textContent = `Submit and Pay ${num} USD`
                    nextCard(card2,card3)
                    height = productsForm3.scrollHeight;
                    scroll(2);
                })
            }
        })
    })
    function addLoader(btn,cardHide,cardView,addLoader,addClassLoader) {
        addLoader.classList.add(addClassLoader);
        btn.textContent = '';
        setTimeout(()=>{nextCard(cardHide,cardView)},1500);
    }
    function scroll(divider) {
        productsForm3.addEventListener('scroll', ()=> {
            let numscr  = productsForm3.scrollTop/divider;
            function scrollDown(num) {
                progressbarMarker.style.cssText = `
                top: ${num}px;
                ` 
            }
            if(numscr<=50) {
                scrollDown(50);
            }
            if(numscr>=50) {
                scrollDown(numscr);
            }
        })
    }
    
    function actinoForm3() {   
        btnContinue.addEventListener('click', ()=> {
            let  cardBasket = document.querySelectorAll('.card-basket')
            delProd.forEach(el => {
                el.addEventListener('click', (e)=>{
                    let del = e.target.offsetParent;
                    let namCard = del.getAttribute('data-cost');
                    let dardId = del.getAttribute('data-id');
                    cardBasket.forEach(item => {
                        item.style.display = 'none'    
                    })
                    
                    for( let i = 0; i<=dardId; i++) {
                        cardBasket[i].style.display = 'flex';
                        del.style.display = 'none';
                        del.classList.remove('card-basket');
                    }

                    btnForm3.textContent = `Submit and Pay ${namCard} USD`
                    btnForm3.setAttribute('data-btn',dardId);
                    scroll()
                })
            })
            let newDataBtn = btnForm3.getAttribute('data-btn');
            function pushForm(btn) {
            btn.addEventListener('click', (e)=> {
                if(e.target.dataset.btn == '0'){
                    location.href = addUrl+'#paymenterror';
                    setTimeout(()=>{addLoader(btnForm3,card3,cardFailed,loader,'form-3__loader')},0); 
                } else if (Number(newDataBtn) > 0) {
                    location.href = addUrl+'#paymentsuccess';
                    setTimeout(()=>{addLoader(btnForm3,card3,cardSuccess,loader,'form-3__loader')},0);
                }
            })
        }
        pushForm(btnForm3);
    })
}
addMore.addEventListener('click',hideCard);
actionBtn(tryAgain,cardFailed,card2,loader,'form-3__loader');
actionBtn(back,cardSuccess,card1,loader,'form-3__loader');
actinoForm3();


