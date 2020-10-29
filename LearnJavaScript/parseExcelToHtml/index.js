const xlsx = require('node-xlsx');
const sheets = xlsx.parse('./grades.xlsx');
const fs = require('fs');

const students = [];
const card = {};
const subjectObj = {
  "姓名": -1,
  "语文": -1,
  "数学": -1,
  "英语": -1,
  "物理": -1,
  "政治": -1,
  "历史": -1,
  "总分": -1,
  "班名次": -1,
  "班进退": -1,
  "级名次": -1,
  "级进退": -1,
};

sheets.forEach(sheet => {
  const { name, data } = sheet;
  // 获取各个学生的成绩信息，格式化成 students 对象
  if (name === '段测一') {
    // 将需要的列信息和其所在的索引映射起来
    data[1].forEach((item, index) => {
      if (subjectObj[item]) {
        subjectObj[item] = index;
      }
    })
    for (let i=2; i<data.length; i++) {
      const student = data[i];
      if (student.length === 0) {
        break;
      }
      const item = {};
      for (const [key, value] of Object.entries(subjectObj)) {
        item[key] = student[value] === undefined ? '{{}}' : student[value];
      }
      students.push(item);
    }
  } else if (name === '成绩单') {
    card.header = data[0].filter(item => { return item });
    card.oneLine = data[1].filter(item => { return item });
    card.secondLine = data[2];
    card.threeLine = data[3];
    card.fourLine = data[4];
  }
})

const htmlTemplate = `
  <!DOCTYPE html>
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        width: 858px;
        margin: 60px 30px 0;
      }
      .container:nth-child(7n) {
        background-color: black;
      }
      .header {
        text-align: center;
        margin-bottom: 5px;
        font-size: 18px;
      }
      .footer {
        margin-top: 3px;
        font-size: 12px;
      }
      .table-box {
        border: 1px solid black;
      }
      .table-tr span {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-right: 1px solid black;
      }
      .table-tr span:last-child {
        border: none;
      }
      .table-tr:nth-child(1),
      .table-tr:nth-child(2) {
        border-bottom: 1px solid black;
      }
      .table-tr:nth-child(3) {
        color: transparent;
      }
      .table-cell-long-long {
        width: 125px !important;
        color: black;
      }
    </style>
  </head>
  <body>
    {{body}}
    <script src="./test.js"></script>
  </body>
  </html>
`;

const tableTemplate = `
  <div class="container">
    <p class="header">{{header}}</p>
    <div class="table-box">
      <div class="table-tr">
        <span class="table-cell-long-long">科目</span>
        <span>语文</span>
        <span>数学</span>
        <span>英语</span>
        <span>物理</span>
        <span>政治</span>
        <span>历史</span>
        <span>总分</span>
        <span>班名次</span>
        <span>班进退</span>
        <span>级名次</span>
        <span>级进退</span>
      </div>
      <div class="table-tr">
        <span class="table-cell-long-long">第一次段测成绩</span>
        <span>{{语文}}</span>
        <span>{{数学}}</span>
        <span>{{英语}}</span>
        <span>{{物理}}</span>
        <span>{{政治}}</span>
        <span>{{历史}}</span>
        <span>{{总分}}</span>
        <span>{{班名次}}</span>
        <span>{{班进退}}</span>
        <span>{{级名次}}</span>
        <span>{{级进退}}</span>
      </div>
      <div class="table-tr">
        <span class="table-cell-long-long">第二次段测目标</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
        <span>{{}}</span>
      </div>
    </div>
    <p class="footer">{{footer}}</p>
  </div>
`;

let tableCode = ``;

students.forEach(student => {
  const header = card.header.slice(0);
  header[1] = student['姓名'];
  const headerStr = header.join(' ');
  let str = '';
  str = tableTemplate
    .replace('{{语文}}', student['语文'])
    .replace('{{数学}}', student['数学'])
    .replace('{{英语}}', student['英语'])
    .replace('{{物理}}', student['物理'])
    .replace('{{政治}}', student['政治'])
    .replace('{{历史}}', student['历史'])
    .replace('{{总分}}', student['总分'])
    .replace('{{班名次}}', student['班名次'])
    .replace('{{班进退}}', student['班进退'])
    .replace('{{级名次}}', student['级名次'])
    .replace('{{级进退}}', student['级进退'])
    .replace('{{header}}', headerStr)
    .replace('{{footer}}', card.fourLine);
  tableCode +=  str + '\n';
})

const finallHtmlContent = htmlTemplate.replace('{{body}}', tableCode);
fs.writeFileSync('./print.html', finallHtmlContent);
