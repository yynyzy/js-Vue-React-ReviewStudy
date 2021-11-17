# node 中的事件循环
浏览器中有事件循环，node 中也有，事件循环是 node 处理非阻塞 I/O 操作的机制，node中事件循环的实现是依靠的libuv引擎。由于 node 11 之后，事件循环的一些原理发生了变化，这里就以新的标准去讲，最后再列上变化点让大家了解前因后果。
·宏任务和微任务
node 中也有宏任务和微任务，与浏览器中的事件循环类似，其中，
  macro-task 大概包括：
    ·setTimeout
    ·setInterval
    ·setImmediate
    ·script（整体代码)
    ·I/O 操作等。

  micro-task 大概包括：
    ·process.nextTick(与普通微任务有区别，在微任务队列执行之前执行)
    ·new Promise().then(回调)等。

node事件循环整体理解
先看一张官网的 node 事件循环简化图：

图中的每个框被称为事件循环机制的一个阶段，每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段。

node 的事件循环的阶段顺序为：
输入数据阶段(incoming data)->轮询阶段(poll)->检查阶段(check)->关闭事件回调阶段(close callback)->定时器检测阶段(timers)->I/O事件回调阶段(I/O callbacks)->闲置阶段(idle, prepare)->轮询阶段...
阶段概述

·定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
·I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调。
·闲置阶段(idle, prepare)：仅系统内部使用。
·轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
·检查阶段(check)：setImmediate() 回调函数在这里执行
·关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)。


