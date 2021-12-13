function coloring() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.querySelector('body').style.backgroundColor = `rgb(${r}, ${g}, ${b})`
}
function throttle(func , delay) {
    // let timer;
    let prev = 0 
    return function () {
    //     let context = this;
    //     let args = arguments;
    //     if (timer) {
    //         return
    //     }
    //     timer = setTimeout(function () {
    //         func.apply(context, args);
    //         timer = null;
    //     },delay)
        
        
         //用data方法
        let now = new Date();
        if (now - prev > delay) {
            func();
            prev =now;
        }
    }


}
window.addEventListener('resize', throttle(coloring , 2000))