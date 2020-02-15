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
  return new Promise((resolve, reject) => {
    // 使用箭头函数绑定this为外层的this指向
    // 当前promise还在pedding，先放入callbacks中等状态变化后再调用
    if (this.status === PEDDING) {
      this.callbacks.push({
        onResolve: val => {
          try {
            let result = onResolve(val);
            if (result instanceof Promise) {
              // 获取到返回的 promise 的结果值，返回给下一个 then
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch(err) {
            reject(err);
          }
        },
        onReject: err => {
          try {
            let result = onReject(err);
            if (result instanceof Promise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch(err) {
            reject(err);
          }
        }
      })
    } else if (this.status === RESOLVED) {
      // 模仿 then 的异步操作
      setTimeout(() => {
        try {
          let result = onResolve(this.value);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch(error) {
          reject(error);
        }
      })
    } else if (this.status === REJECTED) {
      setTimeout(() => {
        try {
          let err = onReject(this.value);
          if (err instanceof Promise) {
            err.then(resolve, reject);
          } else {
            resolve(err);
          }
        } catch(error) {
          reject(error);
        }
      })
    }
  })
}


Promise.prototype.finally = function() {

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


let a = new Promise(function(resolve, reject) {
  setTimeout(function() {
    // resolve(0);
    reject(0);
    console.log('end');
  }, 1000)
}).then(function(val) {
  return new Promise(function(resolve, reject) {
    console.log('then1 is resolved', val);  
    resolve('new promise resolve');
    // reject("new promise reject");
  })
}, function(err) {
  console.log('then1 is rejected', err);
  // resolve(1)
}).then(function(val) {
  console.log('then2 is resolved', val);
  return 2;
}, function(err) {
  console.log('then2 is rejected', err);
});

console.log('outer');

