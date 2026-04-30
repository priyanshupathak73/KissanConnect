const jwt = require('jsonwebtoken');

// Authentication middleware: validates Bearer JWT and attaches decoded payload
// to `req.user`. Returns 401 for missing/invalid tokens.
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentication required: missing token.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // In production, JWT_SECRET must be set. Fail early during development.
        // eslint-disable-next-line no-console
        console.error('JWT_SECRET is not set in environment');
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        // Attach the decoded token payload (usually contains user id and role)
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed: invalid or expired token.' });
    }
}

module.exports = { verifyToken };