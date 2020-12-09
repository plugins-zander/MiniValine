import { pf } from '../Default'
import getScript from './plugins/getScript'
import GetIP from './plugins/GetIP'
const script = (root) => {
  if ((root.backend == 'lc') && root.config.RecordIP) {
    if (typeof window.MV.ip == 'undefined') {
      GetIP(root)
    } else {
      root.C.ip = window.MV.ip
    }
  }
  if (typeof window.MV.pf == 'undefined') {
    getScript(pf)
    window.MV.pf = true
  }
  if (root.config.barrager) {
    if (typeof window.MV.jq == 'undefined') {
      if (typeof jQuery == 'undefined') {
        getScript('https://cdn.jsdelivr.net/npm/jquery')
      }
      window.MV.jq = true
    }
  }
  if ((root.backend == 'lc') && root.config.visitor) {
    getScript('https://cdn.jsdelivr.net/npm/fingerprintjs2')
  }
}
module.exports = script
