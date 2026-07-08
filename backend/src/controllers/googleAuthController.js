import jwt from "jsonwebtoken";

export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=auth_failed`
      );
    }

    const token = jwt.sign(
      {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || "7d",
      }
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
    );
  } catch (error) {
    console.error("Google OAuth Error:", error);

    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=auth_failed`
    );
  }
};