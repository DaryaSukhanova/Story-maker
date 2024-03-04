import jwt from 'jsonwebtoken'
import config from 'config'

const authMiddleware = (req, res, next) => {
	if (req.methods === "OPTIONS") {
		return next()
	}

	try {
		const token = req.headers.authorization.split(" ")[1]
		if (!token) {
			return res.status(401).json({message: "Auth error"})
		}
		const decoded = jwt.verify(token, "mern-secret-key")
		req.user = decoded
		next()
	} catch (e) {
		return res.status(401).json({message: "Auth error"})
	}
}

export default authMiddleware