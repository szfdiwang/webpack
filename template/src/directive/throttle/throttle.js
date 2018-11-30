export default {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('click', () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          binding.value()
        }, 1000)
      }
    })
  }
}
