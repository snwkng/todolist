<template>
  <div class="modal main-modal" id="main-modal">
     <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Добавить проект</h3>
             <v-icon class="icon" name="info"></v-icon>
          </div>
          <div class="modal-body">
            Вы действительно хотите удалить <span>asdasd</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="cancel">Отмена</button>
            <button type="button" class="create">Удалить</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {

    }
  }
}
</script>
