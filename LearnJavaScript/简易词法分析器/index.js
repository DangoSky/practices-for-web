const fs = require('fs');
const path = require('path');
const root = __dirname;
const filterChars = [' ', '\t', '\n', '\r'];
const operatorChars = ['+', '-', '*', '/', '=', '<', '>', '=', ':'];
const demoPath = path.resolve(root, './test');
const demoFiles = fs.readdirSync(demoPath).map(file => {
  return path.join(demoPath, file)
});

const enumType = {
  'KEYWORK': '关键字',
  'DELIMITER': '界符　',
  'OPERATOR': '操作符',
  'VARIABLE': '变量　',
  'CONSTANT': '常数　'
}

const tokenObj = {
  'if': { type: enumType.KEYWORK, typeVal: 0 },
  'then': { type: enumType.KEYWORK, typeVal: 1 },
  'else': { type: enumType.KEYWORK, typeVal: 2 },
  'while': { type: enumType.KEYWORK, typeVal: 3 },
  'begin': { type: enumType.KEYWORK, typeVal: 4 },
  'do': { type: enumType.KEYWORK, typeVal: 5 },
  'end': { type: enumType.KEYWORK, typeVal: 6 },
  '=': { type: enumType.OPERATOR, typeVal: 7 },
  ';': { type: enumType.DELIMITER, typeVal: 8 },
  '#': { type: enumType.DELIMITER, typeVal: 10 },
  '+': { type: enumType.OPERATOR, typeVal: 34 },
  '-': { type: enumType.OPERATOR, typeVal: 35 },
  '*': { type: enumType.OPERATOR, typeVal: 36 },
  '/': { type: enumType.OPERATOR, typeVal: 37 },
  ':=': { type: enumType.OPERATOR, typeVal: 38 },
  'and': { type: enumType.KEYWORK, typeVal: 39 },
  'or': { type: enumType.KEYWORK, typeVal: 40 },
  'not': { type: enumType.KEYWORK, typeVal: 41 },
  '<=': { type: enumType.OPERATOR, typeVal: 42 },
  '<': { type: enumType.OPERATOR, typeVal: 42 },
  '>=': { type: enumType.OPERATOR, typeVal: 42 },
  '>': { type: enumType.OPERATOR, typeVal: 42 },
  '==': { type: enumType.OPERATOR, typeVal: 42 },
  '(': { type: enumType.DELIMITER, typeVal: 48 },
  ')': { type: enumType.DELIMITER, typeVal: 49 },
  '{': { type: enumType.DELIMITER, typeVal: 50 },
  '}': { type: enumType.DELIMITER, typeVal: 51 },
  'main': { type: enumType.KEYWORK, typeVal: 52 },
  'int': { type: enumType.KEYWORK, typeVal: 53 },
  'float': { type: enumType.KEYWORK, typeVal: 54 },
  '_variable': { type: enumType.VARIABLE, typeVal: 56 },
  '_constant': { type: enumType.CONSTANT,  typeVal: 57 }
}

function getFileContentArr(file) {
  const content = fs.readFileSync(file, {
    encoding: 'utf8'
  });
  return content.split('\n');;
}

function isNumber(s) {
  return s >= '0' && s <= '9';
}

function isLetter(s) {
  return (s >= 'a' && s <= 'z') || (s >= 'A' && s <= 'Z');
}

function writeAns(target, curToken, type) {
  const token = type === enumType.VARIABLE ? '_variable' : 
    type === enumType.CONSTANT ? '_constant' : curToken;
  const obj = tokenObj[token];
  target.push({
    token: curToken,
    type: type,
    typeVal: obj.typeVal
  })
}

function analyze(contentArr) {
  const ansTokens = [];
  contentArr.forEach(line => {
    for(let i=0; i<line.length;) {
      const char = line[i];
      let curToken = '';
      // 无效的字符则跳过如换行符等
      if (filterChars.includes(char)) {
        i++;
        continue;
      }
      // 是关键字或变量
      if (isLetter(char)) {
        while(isLetter(line[i]) || isNumber(line[i])) {
          curToken += line[i];
          i++;
        }
        if (tokenObj.hasOwnProperty(curToken)) {
          writeAns(ansTokens, curToken, enumType.KEYWORK);
        } else {
          writeAns(ansTokens, curToken, enumType.VARIABLE);
        }
        continue;
      } 
      // 是常数
      if (isNumber(char) || line[i] === '.') {
        while(isNumber(line[i]) || line[i] === '.') {
          curToken += line[i++];
        }
        writeAns(ansTokens, curToken, enumType.CONSTANT);
        continue;
      }
      const nextChar = line[i + 1];
      const twoOperator = `${char}${nextChar}`;
      if (operatorChars.includes(char)) {
        // 双字符运算符如 >= 和 ++ 等
        if (tokenObj.hasOwnProperty(twoOperator)) {
          writeAns(ansTokens, twoOperator, enumType.OPERATOR);
          i += 2;
          continue;
        }
        // 单字符运算符
        writeAns(ansTokens, char, enumType.OPERATOR);
        i++;
      } else if (tokenObj.hasOwnProperty(char)) {
        // 界符
        writeAns(ansTokens, char, enumType.DELIMITER);
        i++;
      } else {
        i++;
      }
    }
  })
  return ansTokens;
}

function printAns(ans) {
  console.log('\x1B[32m%s\x1B[0m', '索引\t\t单词\t\t类型\t\t\t种别码');
  for(let [key, item] of Object.entries(ans)) {
    console.log(key, '\t\t', item.token, '\t\t', item.type, '\t\t', item.typeVal);
  }
}

(function main() {
  demoFiles.forEach(file => {
    console.log('\x1B[31m%s\x1B[0m', `对 ${file} 进行分析后结果如下`)
    const arr = getFileContentArr(file);
    const ans = analyze(arr);
    printAns(ans);
  })
})()



/* 
  1. 还是会解析不符合规范的数字，如 1..1
*/