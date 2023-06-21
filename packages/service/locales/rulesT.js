export function rulesT(i18n) {
  const { t } = i18n.global
  const option = {
    input(msg) {
      return t('common.form.input', { msg })
    },
    selection(msg) {
      return t('common.form.selection', { msg })
    },
    required(msg) {
      return t('common.form.required', { msg })
    },
  }

  Object.assign(i18n.global, { rulesT: option })
}
