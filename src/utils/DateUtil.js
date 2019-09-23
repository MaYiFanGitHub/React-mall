/* 
  日期工具
*/

export const dateFormat = (dateData) => {
  let date = new Date(dateData)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate().toString().padStart(2, 0);
  let h = date.getHours().toString().padStart(2, 0);
  let m = date.getMinutes().toString().padStart(2, 0);
  let s = date.getSeconds().toString().padStart(2, 0);

  return `${year}年${month}月${day}日 ${h}:${m}:${s}`
}