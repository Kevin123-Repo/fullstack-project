const supabase = require("../config/supabaseClient");
const jwt = require("jsonwebtoken");

//SIGNUP
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, address, city, postcode } =
    req.body;

  // Create the user in auth user table
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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
        postcode: postcode,
      },
    ]);

    // Check for error in profile creation
    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    // Return successful response with user and profile data
    res.status(200).json({
      user,
      message: "User created successfully and profile saved",
    });
  } else {
    res.status(400).json({ error: "User creation failed" });
  }
};

//LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.cookie("sb-access-token", data.session.access_token, {
    httpOnly: true,
    //sameSite:'None', //This needs to be commented out while localhost is http when https it can be uncommented
    secure: false,
    path: "/",
  });
  res.status(200).json({ message: "Login successful" });
};

//LOGOUT
exports.logout = async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.clearCookie("sb-access-token");
  res.status(200).json({ message: "Logged out successfully" });
};

//getSession
exports.session = async (req, res) => {
  try {
    const token = req.cookies["sb-access-token"];
    if (!token) {
      console.log("Problem: No token found in cookies");
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    let verified;
    try {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("Error Message: ", error.message);
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    //console.log("Session API");
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.session) {
      const { last_sign_in_at, role} = data.session.user
      res.status(200).json({ last_sign_in_at, role });
    } else {
      res.status(404).json({ message: "No active session" });
    }
  } catch (err) {
    console.error("Error fetching session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
