export const Validations = {
  passwordRegex: new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?$%^&*])(?=.{8,12})"
  ),
  formPasswordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?$%^&*])(?=.{8,12})/
};

export const EmailRegex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  emailRegex: new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
};

export const MobileRegex = {
  mobile: /^[6789]\d{9}$/,
  mobileRegex: new RegExp("^[6-9]\\d{9}$")
};

export const IfSCRegex = {
  IFSC: /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/,
  IFSCRegex: new RegExp("^[A-Za-z]{4}0[A-Z0-9a-z]{6}$")
};

export const fileExtention = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/.bmp"
];
export const acceptfileExtention = ".png, .jpg, .jpeg, .bmp";

export const maxFileSize = 2048000;
export const maxFileSizeDocument = 5242880;
export const minFileSize = 0;
