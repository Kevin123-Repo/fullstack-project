const supabase = require('../config/supabaseClient');

//SIGNUP
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, address, city, postcode } = req.body;

  // Create the user in auth user table
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const user = data.user;
  //creates the user in profiles table
  if (user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        address: address,
        city: city,
        postcode: postcode
      }
    ]);

    // Check for error in profile creation
    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    // Return successful response with user and profile data
    res.status(201).json({
      user,
      message: "User created successfully and profile saved"
    });
  } else {
    res.status(400).json({ error: "User creation failed" });
  }
};

//LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ user: data.user, session: data.session });
};
