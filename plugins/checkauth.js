export default ({ store, route, redirect }) => {
  if (!store.getters.loggedin && route.name !== 'login') {
    redirect('/login')
  }
}
