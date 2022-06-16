export default function checkAuth(to, from, next) {
  if (!localStorage.getItem('token')) {
    return next('/login');
  }

  return next();
}