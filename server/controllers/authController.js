import { register, login, GoogleLogin } from "../service/authService.js";

export const Register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password, avatar } = req.body;

  try {
    const user = await register({ name, email, password, avatar });

    console.log("from signUP controller", user);
    res.status(201).json({
      // success: true,
      // message: "User registered successfully",
      user: user.user,
      token: user.token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    const user = await login({ email, password });
    console.log("from login controller", user);
    res.status(200).json({
      // success: true,
      // message: "User logged in successfully",
      user: user.user,
      token: user.token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// export const googleLogin = async (req, res) => {
//   const { googleId } = req.body;

//   if (!googleId) {
//     return res.status(400).json({ message: "ID token is required" });
//   }

//   try {
//     const { user, token } = await GoogleLogin(googleId);
//     res.status(200).json({ user, token });
//   } catch (error) {
//     console.error("Google login failed:", error);
//     res
//       .status(500)
//       .json({ message: "Authentication failed", error: error.message });
//   }
// };

export const googleLogin = async (req, res) => {
  const { name, email, avatar, role } = req.body;

  console.log("from google login/signup controller", req.body);
  if (!email || !name) {
    return res
      .status(400)
      .json({ message: "Name and email are required for login" });
  }

  try {
    const  user= await GoogleLogin({ name, email, avatar, role });
    console.log("success", user);
    res.status(200).json({ user: user.user, token: user.token });
  } catch (error) {
    console.error("Google login failed:", error);
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
};
