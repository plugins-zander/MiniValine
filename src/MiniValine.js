import body from './body'
import util from './utils'
const MiniValineFactory = function (option) {
  const root = this
  try {
    root.config = option
    if (!document.querySelectorAll(root.config.el)[0]) return
    util.Config(root)
    util.initStyle(root)
    util.ActivateCode(root)
    util.script(root)
    util.i18n(root)
    util.initLibs(root)
  } catch (e) { console.error(e) }
}
MiniValineFactory.prototype.initCheck = function () {
  const root = this
  try {
    const check = setInterval(function () {
      if (!root.i18n) return
      clearInterval(check)
      if (root.backend == 'lc') {
        import(/* webpackChunkName: "fetch-lc-base" */'./utils/fetch/lc/Base.js').then(({ FetchBase }) => {
          FetchBase(root)
        })
        if (root.config.cloudflag) {
          import(/* webpackChunkName: "fetch-lc-CloudFlag" */'./utils/fetch/lc/CloudFlag.js').then(({ FetchCloudFlag }) => {
            FetchCloudFlag(root)
          })
        }
      } else if (root.backend == 'waline') {
        import(/* webpackChunkName: "fetch-waline-base" */'./utils/fetch/waline/Base.js').then(({ FetchBase }) => {
          FetchBase(root)
        })
      }
      if (root.mode === 'DesertsP') {
        import(/* webpackChunkName: "body-DesertsP" */'./body/DesertsP.js').then(({ getEle }) => {
          root.ele = getEle(root)
          root.Start()
        })
        import(/* webpackChunkName: "vcard-DesertsP" */'./body/vcard-DesertsP.js').then(({ Vcard }) => {
          root.Vcard = Vcard(root)
        })
      } else if (root.mode === 'xCss') {
        if (root.config.enableUA && (root.backend != 'waline')) {
          import(/* webpackChunkName: "ua" */'./utils/plugins/ua.js').then(({ init }) => {
            init()
          })
        }
        import(/* webpackChunkName: "body-xCss" */'./body/xCss.js').then(({ getEle }) => {
          root.ele = getEle(root)
          root.Start()
        })
      }
      if (root.config.barrager) {
        import(/* webpackChunkName: "vcard-barrager" */'./body/vcard-barrager.js').then(({ Vbarrager }) => {
          root.Vbarrager = Vbarrager(root)
        })
      }
    }, 5)
  } catch (e) { console.error(e) }
}
MiniValineFactory.prototype.Start = function () {
  const root = this
  try {
    body.el(root)
    body.loading(root)
    root.nodata.show()
    body.smiles(root)
    if (root.backend == 'lc') { root.setAV(root) }
    util.visitor(root)
  } catch (e) {
    console.error(e)
    return
  }
  try {
    root.loading.hide(root.parentCount)
    root.loading.show()
    const checkFetchCount = setInterval(function () {
      if (!root.fetchCount) return
      clearInterval(checkFetchCount)
      root.fetchCount(root)
      util.insertComment(root, body)
      util.parentQuery(root)
      util.nestQuery(root)
    }, 5)
    util.alert(root)
    util.inputs(root)
    util.previewEvt(root)
    util.smileEvt(root)
    if (root.mode === 'DesertsP') {
      util.startEvt(root)
    }
    if (root.config.barrager) {
      util.barrager(root)
    }
    util.getCache(root)
    util.resetForm(root)
    util.uploadImage(root)
    util.cancelReply(root)
    util.smileBtnEvt(root)
    util.previewBtnEvt(root)
    util.atEvt(root)
    util.submitBtnEvt(root)
    util.smile(root)
  } catch (e) { console.error(e) }
}
module.exports = MiniValineFactory
