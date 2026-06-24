module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {

        return res.status(401).json({

            success:false,

            message:"Unauthorized"

        });

    }

    if(token !== "earnview_admin_2026"){

        return res.status(403).json({

            success:false,

            message:"Invalid Token"

        });

    }

    next();

                                    }
