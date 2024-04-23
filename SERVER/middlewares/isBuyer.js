const checkIsBuyer = (req, res, next) => {
    if (req.user.role !== 'buyer') {
      return res.status(403).json({ error: 'Access denied. User is not a seller' });
    }
  
    next();
  };
  
  module.exports = checkIsBuyer;
  