const supabase = require('../config/supabaseClient');
const jwt = require('jsonwebtoken')

exports.getProfile = async (req, res) => {
  try {
    const token = req.cookies['sb-access-token'];
    if (!token) {
      console.log("Problem: No token found in cookies");
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    let verified;
    try{
    verified = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error){
      console.log("Error Message: ", error.message)
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
    }

    const userId = verified.sub; // Supabase stores user_id in 'sub' claim
    console.log("Decoded user ID:", userId);

    // Fetch profile data from Supabase
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ profile });

  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
