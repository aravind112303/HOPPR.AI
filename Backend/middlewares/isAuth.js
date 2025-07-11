import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

    // ✅ FIXED: your token has { userId: ... }
    req.userId = verifyToken.userId

    next()
  } catch (error) {
    console.log("Auth middleware error:", error.message)
    return res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}

export default isAuth
