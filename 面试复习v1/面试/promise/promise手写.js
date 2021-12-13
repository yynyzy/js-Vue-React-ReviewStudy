const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('类型错误'))
    }

    let called = false
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            const then = x.then
            if (typeof then === 'function') {
                the.call(x,
                    (y) => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    (x) => {
                        if (called) return
                        called = true
                        reject(x)
                    }
                )
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        } 
    }else {
        if (called) return
        called = true
        resolve(x)
    }
}
class promise {
    constructor(executor) {
        // 默认的状态
        this.status === PENDING
        // 成功的结果
        this.value = undefined
        // 失败的原因
        this.reason = undefined
        this.onFulfilledCallback = []
        this.onRejectedCallback = []
        const resolve = (value) => {
            // 保证状态为pending时才执行下去，已经更改过状态(RESOLVE,REJECT)，就无法再改变状态，具有唯一性。
            if (this.status === PENDING) {
                this.status === RESOLVE
                this.value = value
                //调用resolve时遍历函数
                this.onFulfilledCallback.forEach(cb => cb)
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status === REJECT
                this.reason = reason
                this.onRejectedCallback.forEach(cb => cb)
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled =(v)=>v
        }
        if (typeof onRejected !== 'function') {
            onRejected = (err) => {
                throw err
            }
        }
        const promise2 = new Promise((resolve, reject) => {
            // onFulfilled 是成功时你传入的处理函数
            // onRejected 是失败时你传入的处理函数
            if (this.status === RESOLVE) {
                queueMicrotask(() => {
                    try {
                        //如果状态为resolve，则在then中调用onFulfilled方法操作之前保存的成功时的value
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === REJECT) {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            //处理当有定时器等异步操作时，then处于pending状态，将此状态下的onFulfilled, onRejected的函数调用分别保存到onFulfilledCallback，onRejectedCallback数组中，定时器完成时从数组中取出运行onFulfilled, onRejected函数
            if (this.status === PENDING) {
                this.onFulfilledCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                    this.onRejectedCallback.push(() => {
                        queueMicrotask(() => {
                            try {
                                const x = onRejected(this.reason)
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        })
                    })
                })
            }
        })
        return promise2
    }
}