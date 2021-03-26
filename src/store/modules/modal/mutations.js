export default {
  SET_SHOW_MODAL (state, modalSettings) {
    state.showModal = modalSettings.showModal
    state.modalType = modalSettings.modalType
  },
  SET_MODAL_INFO (state, modalInfo) {
    state.modalInfo = modalInfo
  }
}
