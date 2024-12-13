const validateEmail = (email: string | null | undefined) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
const validatePassword = (password: string | null | undefined) => {
  if (!password) return false;
  const regex = /^[^\s]{6,}$/
  return regex.test(password);
}

export { validateEmail, validatePassword }