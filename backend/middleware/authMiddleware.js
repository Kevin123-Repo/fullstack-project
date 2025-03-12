const supabase = require('../config/supabaseClient');

exports.protectRoute = async (req, res, next) => {
  const token = req.cookies['sb-access-token'];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data, error } = await supabase.auth.getUser(token);

  if (error) return res.status(401).json({ error: 'Invalid token' });
  console.log('Supabase Response:', data)
  req.user = data.user;
  next();
};
