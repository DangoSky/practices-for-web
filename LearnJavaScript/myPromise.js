const PEDDING = 'pedding';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function Promise(fn) {
  if (typeof fn !== 'function') {
    throw new Error('fn is not a function');
  }
  let self = this;
  this.status = PEDDING;
  this.value = null;
  this.callbacks = [];  // resolve 或 reject 后的回调函数

  function resolve(res) {
    if (self.status === PEDDING) {
      self.status = RESOLVED;
      self.value = res;
      // 异步执行 then 函数，对于 resolve 或 reject 后的代码会继续同步执行
      setTimeout(function() {
        self.callbacks.forEach(item => {
          item.onResolve(res);
        })
      })
    }
  }
  function reject(err) {
    if (self.status === PEDDING) {
      self.status = REJECTED;
      self.value = err;
      setTimeout(function() {
        self.callbacks.forEach(item => {
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

Promise.prototype.parse = function(selfPromise, result, resolve, reject) {
  // then 中返回的 promise 不能和 resolve/reject 回调函数中返回的 promise 一样
  if (selfPromise === result) {
    throw new TypeError('chaining cycle detected');
  }
  try {
    if (result instanceof Promise) {
      // 获取到返回的 promise 的结果值，返回给下一个 then
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch(err) {
    reject(err);
  }
}

Promise.prototype.then = function(onResolve, onReject) {
  // onResolve = typeof onResolve === 'function' ? onResolve : function() { return this.value };
  if (typeof onResolve !== 'function') {
    onResolve = () => {
      return this.value;
    }
    // onResolve = () => this.value;
  }
  onReject = typeof onReject === 'function' ? onReject : function() { return this.value };
  // TODO: resPromise status 
  const selfPromise =  new Promise((resolve, reject) => {
    // 使用箭头函数绑定this为外层的this指向
    // 当前promise还在pedding，先放入callbacks中等状态变化后再调用
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

Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    if (value instanceof Promise) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  })
}

Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  })
}

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
// let a = new Promise(function(resolve, reject) {
//   // setTimeout(function() {
//     resolve(1);
//     console.log('end');
//   // }, 1000)
// }).then(function(res) {
//   console.log(res);
//   console.log(dangosky);
//   return 'then1 end';
// }).then(function(res) {
//   console.log('then2: ', res);
// }, function(err) {
//   console.log(err);
// }).then(function(res) {
//   console.log('then3: ', res);
// });
// console.log('outer');


// then 的回调返回一个 promise 测试
// let a = new Promise(function(resolve, reject) {
//   setTimeout(function() {
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


// all 和 race 方法测试
let p1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve('resolve1');
    
  }, 3000);
})
let p2 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    
    resolve('resolve2');
  }, 3000);
})
let p3 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject('resolve3');
  }, 3000);
})
let a = Promise.race([p1, p2, p3]).then(function(value) {
  console.log('resolve', value);
}, function(reason) {
  console.log('reject', reason);
})