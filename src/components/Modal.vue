<template>
  <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button type="button" class="cancel" @click="$emit('close')">Отмена</button>
                  <button type="button" class="delete">Удалить</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {

    }
  },
  mounted () {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    })
  }
}
</script>
