import JWT from "jsonwebtoken";

//protected Riutes token base

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        next()
    } catch (e) {
        console.log(e);
    }
}