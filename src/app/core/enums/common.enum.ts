export enum commonEnum {
  title= 'Code Review Hub',
  profile = "Profile",
  addUser = "Add User",
  editUser = "Update User",
  addCodeReview = "Add Code Review Request",
  editCodeReview = "Edit Code Review Request",
  viewCodeReview = "View Code Review Request",
  approveCodeReview = "Approve Code Review Request",
  userModule = "User Module",
  superAdmin = "superAdmin",
  Admin = "Admin",
  Candidate = "Candidate",
  codeModule = "Code Review Module",
  reviewedBy = "reviewedBy",
  email = "email",
  update = "update",
  approve = "approve",
  save = "save",
  string = "string",
  assignTo = "assignTo",
  userRole = "userRole"
}

export enum headingEnum {
  addUser = "Add User",
  editUser = "Update User",
  addCodeReview = "Add Code Review Request",
  editCodeReview = "Edit Code Review Request",
  viewCodeReview = "View Code Review Request",
  userModule = "User Module",
  superAdmin = "superAdmin",
  Admin = "Admin",
  Candidate = "Candidate",
  codeModule = "Code Review Module",
  reviewedBy = "Reviewed By",
}

export enum modalData {
  declineRequest = "Decline Request",
  declineTitle = "Add reasons to decline request",
  declinedRequest = "Declined Request",
  declinedTitle = "Reason for request is declined",
  approveRequest = "Approve Request",
  selectAdmin = "Please select an admin to assign this candidate",
  deleteUser = 'Delete User',
  deleteCodereview = 'Delete CodeReview',
  deleteTitle = 'Are you sure you want to delete this?',
  assignAdmin = "Select Admin"
}

export enum tableEnum {
  password = "password",
  addUser = "AddUser",
  signUp = "Sign Up",
  statusBtn = "statusBtn",
  status = "status",
  assignTo = "assignTo",
  createdBy = "createdBy",
  userId = "userId",
  Active = "active",
  Inactive = "inactive",
  Rejected = "rejected",
  Pending = "pending",
  Reviewed = "reviewed",
  Request = "request",
  Id = "id",
  textEditor = "textEditor",
  codeReview = "codeReview",
  addReviewRequest = "AddReviewRequest",
  action = "action",
  codeReviewListing = "Code Review Listing",
  Admin = "Admin",
  superAdmin = "superAdmin",
  userListing = "User Listing",
  endDate = "endDate",
  startDate = "startDate",
  developmentDate = "developmentDate",
  srNo = "sr No",
  Candidate = "Candidate",
  confirmPassword = "confirmPassword"
}

export enum succssMessage { 
  Updated = "User updated successfully",
  signUp = "Sign-up successful",
  login = "Login successfully",
  passwordUpdated = "Your password has been updated successfully",
  emailVerified = "email verified successfully",
  enterValidEmail = "please enter valid email",
  userAdded = "User added successfully",
  codeReview = "Code Review sent successfully.",
  changePassword = "Your Password Changed Successfully",
  detailsUpdated = "Details updated successfully",
  statusUpdated = "Status updated successfully",
  codeReviewUpdated = "Code Review updated successfully."
}

export enum errorMessage { 
  alreadyRegistered = "This email is already registered. Please use a different email address.",
  invalidEmail = "Invalid email",
  Invalid = "Invalid email or password",
  inActive = "Your profile is inactive. Please contact the administrator",
  alreadyEmailRegistered = "This email is already registered. Please use a different email address.",
  oldPassword = "Old Password Does Not Match",
  statusInctive = "Your Profile is inactive. Password cannot be changed, Please contact adminninistrator.",
  wrongOtp = "Your OTP is incorrect. Please enter a valid OTP."
} 

export enum warningMessage { 
  nothingToUpdated = "There is nothing to update.",
} 

export enum validation {
  requiredFeild = "This field is required",
  invalidInput = "Invalid input",
  passwordHint = "Hint :- 8+ chars, mix: upper, lower, num, special.",
  emailHint = "Hint :- abc@gmail.com",
  passwordMismatched = "Password mis-matched",
} 

export enum apiEndPoints {
  users = "users",
  user = "users/",
  codeReviews = "codeReview",
  codeReview = "codeReview/",
}

export enum routes {
  user = "user",
  users = "/user",
  edit = "/edit/",
  view = "/view/",
  codeReview = "codeReview",
  admin = "admin",
  auth = "/auth",
  login = "/login",
  empty = "/",
  approve = "/approve/",
}

export enum setItem { 
  user = "user",
  token = "token"
}

export enum getItem { 
  user = "user",
  token = "token"
}


