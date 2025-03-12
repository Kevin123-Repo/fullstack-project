const supabase = require('../config/supabaseClient');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request

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
