const supabase = require('../config/supabaseClient');
const jwt = require('jsonwebtoken')
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
    res.status(200).json({
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

  res.cookie('sb-access-token', data.session.access_token,{
    httpOnly:true,
    //sameSite:'None', //This needs to be commented out while localhost is http when https it can be uncommented
    secure:false,
    path:'/',
  });
  res.status(200).json({ message: "Login successful" });
  
};

//LOGOUT
exports.logout = async (req,res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.clearCookie('sb-access-token'); 
  res.status(200).json({ message: 'Logged out successfully' });
};

//getSession checks to display login or logout
exports.session = async(req,res)=>{
  const token = req.cookies['sb-access-token'];
  try {
    const token = req.cookies["sb-access-token"]; // Get token from cookies

    if (!token) {
      return res.status(200).json({ isAuthenticated: false, user: null });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("JWT Verification Error:", error.message);
      return res.status(200).json({ isAuthenticated: false, user: null });
    }

    // Fetch user session from Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(200).json({ isAuthenticated: false, user: null });
    }

    res.status(200).json({ isAuthenticated: true, user: true  });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }


}
