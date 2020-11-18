/**
 *
 * 序列化基础数据
 * @export
 * @param {*} arr
 * @param {*} val
 */
export function checkBaseData(val: string, arr: any[]) {
  // console.log(arr)
  if (arr && arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (String(arr[i].key) === String(val) || String(arr[i].id) === String(val)) {
        return arr[i].text
      }
      if (arr[i].value === val) {
        return arr[i].label
      }
    }
  }
}