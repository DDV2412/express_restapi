const { decode } = require('../helpers/jwt');

module.exports = {
    authentication: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: 401,
                message: 'No token provided.'
            });
        }

        try {
            req.Admins = decode(req.headers.authorization);

        } catch (err) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
            });
        }

        if (!req.headers.authorization) {
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Only logged in customer can access this endpoint.'
            })
          }
      
          try {
            req.Customers = decode(req.headers.authorization);
          } catch (err) {
            return res.status(401).json({
              status: 400,
              message: 'Token invalid'
            })
          }

          if (!req.headers.authorization) {
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Try log in as seller.'
            });
          }
      
          try {
            req.Sellers = decode(req.headers.authorization);

          } catch (err) {
            return res.status(401).json({
              status: 400,
              message: 'Token invalid'
            });
          }

          if (!req.headers.authorization) {
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Try log in as admin.'
            });
          }

          try {
            req.Admins = decode(req.headers.authorization);
          }
          catch (err) {
            return res.status(401).json({
              status: 400,
              message: 'Token invalid'
            });
          }

        next();
},
    authorization: {
        Admins: (req, res, next) => {
            if (req.Admins.role === 1) return next();
            return next({
              error: 'Unauthorized',
              authType: 'admin',
              body: JSON.stringify(req.Admins)
            })
        },

        Sellers: (req, res, next) => {
          if (req.Sellers.role === 2) return next();
          return next({
            error: 'Unauthorized',
            authType: 'seller',
          })
        },

        Customers: (req, res, next) => {
        if (req.Customers.role === 3) return next();
        return next({
          error: 'Unauthorized',
          authType: 'customer',
          })
        },
      }
    }

    
