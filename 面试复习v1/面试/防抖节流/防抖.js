const button = document.querySelector('.btn');
function payMoney() {
    console.log("爱你")
}
function debounce(func, delay) {
    let timer;                      //将timer定义在外面，清除定时器清除同一个定时器
    return function () {
        let context = this;          //this在定时器中是window对象下，要注意
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.call(context);
            console.log(context);
        }, delay);
    }
}
button.addEventListener('click', debounce(payMoney, 1000));
