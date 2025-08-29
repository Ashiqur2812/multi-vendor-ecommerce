const AdminUser = require("../../../../models/AdminUser/AdminUser");
const Role = require("../../../../models/Role.model/Role.model");
const { options } = require("../../../../routes/auth.routes/auth.routes");
const ApiError = require("../../../../utils/ApiError");
const compareBcryptPassword = require("../../../../utils/compareBcryptPassword");
const generateUserTokens = require("../../../../utils/userTokens");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const adminLoginController = async (req, res) => {
  // Extract data from the frontend or request body
  const { email, username, password } = req.body;

  // Validate the received data for correctness
  // This step could involve checking for required fields and data formats
  // It ensures that the received data is properly structured and conforms to expectations
  validateFieldsCheck(req.body, ["email", "password"]);

  // Search for the email in the database to verify if it exists
  // This step queries the database to find if the provided email exists in the records
  const admin = await AdminUser.findOne({
    $or: [{ email }, { username }],
  });

  // find role
  const role = await Role.findById(admin.role);

  // if admin not found
  if (!admin) {
    throw new ApiError(400, "Invalid credentials.");
  }

  const comparePassword = await compareBcryptPassword(password, admin.password);
  if (!comparePassword) {
    throw new ApiError(400, "Invalid credentials, email or password.");
  }

  const { accessToken, refreshToken } = generateUserTokens(admin, role);

  // HATEOAS links
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/admin/auth/login`,
      method: "POST",
      description: "Login to your admin account",
    },
    {
      rel: "profile",
      href: `${host}/admin/profile`,
      method: "GET",
      description: "",
    },
  ];
  res.cookie("refreshToken", refreshToken, options);
  res.cookie("accessToken", accessToken, options);
  const { password: pass, ...data } = admin.toObject();

  return { accessToken, refreshToken, user: data, links };
};

module.exports = adminLoginController;
