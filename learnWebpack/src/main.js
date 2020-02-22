import './style/index.css';
import './style/index.less';

console.log('webpack 基本测试之打包');
console.log('内容修改后，文件名的 hash 是否变化');
console.log('清除旧的打包文件');



const map = new Map();
map.set('a', 1);
map.has('b');
map.set('b', 2);
map.get('b');
console.log(map);
