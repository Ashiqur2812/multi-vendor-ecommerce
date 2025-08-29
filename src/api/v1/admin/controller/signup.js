const asyncHandler = require("../../../../utils/asyncHandler");
const ApiResponse = require("../../../../utils/ApiResponse");
const { adminRegisterServices } = require("../services");

const adminSignupController = asyncHandler(async (req, res) => {
  
  const { userInfo, links } = await adminRegisterServices(req);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userInfo, links },
        "Admin account created successfully."
      )
    );
});

module.exports = adminSignupController;
