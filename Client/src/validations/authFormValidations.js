export const validateRegister = (fields) => {
  const phoneNumRegex =
    /^((98\d{8}|97\d{8}|91\d{8})|(0?[1-9]\d{0,1}-?\d{5,7})|(100|101|102|1498|900))$/;

  if (!phoneNumRegex.test(fields.phoneNum)) {
    return {valid: false, message: "Phone number is invalid"}
  }

  if (fields.password !== fields.confirmPassword) {
    return {valid: false, message: "Passwords don't match"}
  }

  return true
};
