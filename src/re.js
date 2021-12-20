export function validateCategory(text) {
  if (text.length < 1 || text.length > 30) return false
  const exp = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/;
  return exp.test(String(text).toLowerCase());
};

export function validateUrl(text) {
  const exp = /^[0-9a-z_\-.&?=:\/]*$/;
  return exp.test(String(text).toLowerCase());
};

export function validateSplacePhone(text) {
  const exp = /^[0-9]{8,11}$/;
  return exp.test(String(text).toLowerCase());
};

export function validatePhone(text) {
  const exp = /^01([0|1|6|7|8|9])?([0-9]{7,8})$/;
  return exp.test(String(text));
};

export function validatePassword(text) {
  const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$?!@#$%^&*/])[A-Za-z\d$?!@#$%^&*/]{8,15}$/;
  return exp.test(String(text));
};

export function validateEmail(text) {
  const exp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  return exp.test(String(text));
};

export function validateUsername(text) {
  if(text.length < 1 || text.length > 30) return false
  const exp = /^[0-9a-z._]*$/;
  return exp.test(String(text));
};

export function AtoS(arr) {
  var str = ""
  for (var i = 0; i < arr.length; i++) {
    str = str + arr[i] + ' '
  }
  return str
}