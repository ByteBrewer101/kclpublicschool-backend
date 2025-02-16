
import { Credential } from "../db/models.js";
//@ts-expect-error
const authenticate = async (req, res, next) => {
  // next()
  try {
    // Get credentials from request headers
    const username = req.headers["x-username"];
    const password1 = req.headers["x-password1"];
    const password2 = req.headers["x-password2"];

    // Check if all credentials are provided
    if (!username || !password1 || !password2) {
      return res.status(401).json({
        error: "Authentication failed: Missing credentials",
      });
    }

    // Find credentials in database
    const validCredentials = await Credential.findOne({ username });

    if (!validCredentials) {
      return res.status(401).json({
        error: "Authentication failed: Invalid username",
      });
    }

    // Validate passwords
    if (
      password1 !== validCredentials.password1 ||
      password2 !== validCredentials.password2
    ) {
      return res.status(401).json({
        error: "Authentication failed: Invalid passwords",
      });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      error: "Internal server error during authentication",
    });
  }
};

export default authenticate;
