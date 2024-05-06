const checkIsBuyer = (req, res, next) => {
    if (req.user.role !== 'buyer') {
      return res.status(403).json({ message: 'Access denied.Not a Customer' });
    }
  
    next();
  };
  
  module.exports = checkIsBuyer;
  