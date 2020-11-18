
import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/modules/user'


export const checkbtn: DirectiveOptions = {
  inserted(el, binding, vnode) {
    const { value } = binding
    const btns = UserModule.buttonVoList
    if (value && value instanceof Array && value.length > 0) {
      const btnArr = value

      const hasBtn = btns.some(btns => {
        return btnArr.includes(btns)
      })

      if (!hasBtn) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need btns! Like v-checkbtn="['admin','editor']"`)
    }
  }
}