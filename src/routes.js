import Dashboard from 'view/Dashboard'
import AccessBO from 'view/AccessBO'
import PermisosBO from 'view/PermisosBO'
import LiverpoolPush from 'view/LiverpoolPush'
import InditexBO from 'view/InditexBO'
import StatusTool from 'view/StatusTool'
import SearchOrder from 'view/SearchOrder'

const routes =  [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
  { path: '/accessbo', name: 'Dashboard', componente: AccessBO },
  { path: '/permisosbo', name: 'Dashboard', componente: PermisosBO },
  { path: '/liverpoolpush', name: 'Dashboard', componente: LiverpoolPush },
  { path: '/inditex', name: 'Dashboard', componente: InditexBO },
  { path: '/status', name: 'Dashboard', componente: StatusTool },
  { path: '/searchorder', name: 'Dashboard', componente: SearchOrder },
]

export default routes