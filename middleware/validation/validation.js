const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("username")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter"),
  body("nama").notEmpty().withMessage("Nama wajib diisi"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
