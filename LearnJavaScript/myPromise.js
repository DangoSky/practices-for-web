const PEDDING = 'pedding';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function Promise(fn) {
  if (typeof fn !== 'function') {
    throw new Error('fn is not a function');
  }
  this.status = PEDDING;
  this.value = null;
  this.callbacks = [];  // resolve 或 reject 后的回调函数

  const resolve = (res) => {
    if (this.status === PEDDING) {
      this.status = RESOLVED;
      this.value = res;
      // 模仿异步执行 then 决断后的回调函数，对于 resolve 或 reject 后的代码会继续同步执行
      setTimeout(() => {
        this.callbacks.forEach(item => {
          item.onResolve(res);
        })
      })
    }
  }
  const reject = (err) => {
    if (this.status === PEDDING) {
      this.status = REJECTED;
      this.value = err;
      setTimeout(() => {
        this.callbacks.forEach(item => {
          item.onReject(err);
        })
      })
    }
  }

  try {
    fn(resolve, reject);
  } catch(error) {
    reject(error);
  }
}

// 决断 then 返回的 promise。对捕获错误、判断决断后回调函数返回的 promise 是否合规、解析该 promise 的值，这三种情况进行封装
Promise.prototype.parse = function(selfPromise, result, resolve, reject) {
  // then 中返回的 promise 不能和 resolve/reject 回调函数中返回的 promise 一样
  if (selfPromise === result) {
    throw new TypeError('chaining cycle detected');
  }
  try {
    // 如果 resolve/reject 回调函数中返回的是 promise，则解析该 promise 的值返回给下一个 then
    if (result instanceof Promise) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch(err) {
    reject(err);
  }
}

Promise.prototype.then = function(onResolve, onReject) {
  // 如果没有传 onResolve 或 onReject 函数的话，则默认返回当前 promise 的值，实现值穿透
  if (typeof onResolve !== 'function') {
    onResolve = () => {
      return this.value;
    }
  }
  if (typeof onReject !== 'function') {
    onReject = () => {
      return this.value;
    }
  }
  const selfPromise =  new Promise((resolve, reject) => {
    // 使用箭头函数绑定 this 为外层的 this 指向
    // 当前 promise 还在 pedding，先放入 callbacks 中等状态变化后再调用
    if (this.status === PEDDING) {
      this.callbacks.push({
        onResolve: val => {
          this.parse(selfPromise, onResolve(val), resolve, reject);
        },
        onReject: err => {
          this.parse(selfPromise, onReject(err), resolve, reject);
        }
      })
    } else if (this.status === RESOLVED) {
      // 模仿 then 的异步操作
      setTimeout(() => {
        this.parse(selfPromise, onResolve(this.value), resolve, reject);
      })
    } else if (this.status === REJECTED) {
      setTimeout(() => {
        this.parse(selfPromise, onReject(this.value), resolve, reject);
      })
    }
  })
  return selfPromise;
}

// 将 value 转化成 promise，默认为 resolve 状态
Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    // 如果 value 本身已经是 promise 了，则解析它的值来决断，否则直接 resolve
    if (value instanceof Promise) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  })
}

// 将 value 转化成 promise，默认为 reject 状态
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  })
}

// 返回一个 promise，所有 promise 都 resolve 后才 resolve，有一个 reject 则该 promise 会被 reject
Promise.all = function(promises) {
  const resolvePromises = [];
  return new Promise(function(resolve, reject) {
    promises.forEach(item => {
      item.then(function(result) {
        resolvePromises.push(result);
        // 等到所有 promise 都 resolve 后才能 resolve
        if (resolvePromises.length === promises.length) {
          resolve(resolvePromises);
        }
      }, function(reason) {
        reject(reason);
      })
    })
  })
}

// 返回一个 promise，其状态跟第一个决断的 promise 相同
Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    // 只要一个 promise 决断了就可以了，因为状态一经改变就不会再变，所以之后即使还有其他 promise 决断了也不会有影响
    promises.forEach(item => {
      item.then(function(result) {
        resolve(result);
      }, function(reason) {
        reject(reason);
      })
    })
  })
}


/* test */
let a = new Promise(function(resolve, reject) {
  // setTimeout(function() {
    resolve(0);
    console.log('end');
  // }, 1000)
}).then(function(res) {
  console.log('then1: ', res);
  // console.log(dangosky);
  return 1;
}).then(function(res) {
  console.log('then2 resolve: ', res);
  return 2;
}, function(err) {
  console.log('then2 reject: ', err);
}).then(function(res) {
  console.log('then3: ', res);
});
console.log('outer');


// test: then 的回调返回一个 promise
// let a = new Promise(function(resolve, reject) {
//   setTimeout(function() {z
//     // resolve(0);
//     reject(0);
//     console.log('end');
//   }, 1000)
// }).then(function(val) {
//   return new Promise(function(resolve, reject) {
//     console.log('then1 is resolved', val);  
//     resolve('new promise resolve');
//     // reject("new promise reject");
//   })
// }, function(err) {
//   console.log('then1 is rejected', err);
//   // resolve(1)
// }).then(function(val) {
//   console.log('then2 is resolved', val);
//   return 2;
// }, function(err) {
//   console.log('then2 is rejected', err);
// });


// test: all 和 race 方法
// let p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve('resolve1');
    
//   }, 3000);
// })
// let p2 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
    
//     resolve('resolve2');
//   }, 3000);
// })
// let p3 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     reject('resolve3');
//   }, 3000);
// })
// let a = Promise.race([p1, p2, p3]).then(function(value) {
//   console.log('resolve', value);
// }, function(reason) {
//   console.log('reject', reason);
// })
