const checkIsSeller = (req, res, next) => {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied.Not a Seller' });
    }
  
    next();
  };
  
  module.exports = checkIsSeller;
  