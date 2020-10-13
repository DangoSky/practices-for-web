const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new koa();

// 转换为 csv 表格
function _trans2csv(arr, keyNameObj) {
  let csvStr = "\uFEFF";
  // 取 arr[0] 来获取每条数据的 key 从而提取表头，keyNameObj 为 key 与表头名字的映射
  const header = arr.length
    ? Object.keys(arr[0]).map(key => {
        return keyNameObj[key] || key;
      })
    : [];
  csvStr += header.join(",") + "\r\n";
  arr.forEach(row => {
    const keys = Object.keys(row);
    const rowData = keys.map(key => {
      return row[key];
    });
    csvStr += rowData.join(",") + "\r\n";
  });
  return csvStr;
}

// test demo
router.post('/table', async (ctx, next) => {
  const data = [
    { 'name': '李淳罡', 'weapon': '木马牛' },
    { 'name': '姜泥', 'weapon': '大凉龙雀' },
    { 'name': '陈芝豹', 'weapon': '梅子酒' },
    { 'name': '白狐儿脸', 'weapon': '绣春冬雷' },
    { 'name': '温华', 'weapon': '木剑' },
  ];
  const keyNameObj = {
    'name': '名字',
    'weapon': '兵器'
  };
  const filename = 'export';
  const res = _trans2csv(data, keyNameObj);
  // 注意需要设置响应头和响应体
  ctx.set({
    "Content-Type": "text/csv",
    "Content-Disposition": `attachment; filename=${filename}.csv`
  });
  ctx.response.body = res;
  return res;
})

app.use(bodyParser());
app.use(router.routes());

app.listen('3000');
console.log('app started at port 3000...');
