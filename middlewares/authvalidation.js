const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(3, "username must contain at least 3 characters"),
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must contain at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must contain at least 8 characters"),
});

const signupValidation = (req, res, next) => {
  try {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.format();
      return res.status(400).json({ error });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginValidation = (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.format();
      return res.status(400).json({ error });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { signupValidation, loginValidation };


// const schema = z.object({
//   password: z.string().min(8),
//   confirmPassword: z.string(),
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"]
// });

