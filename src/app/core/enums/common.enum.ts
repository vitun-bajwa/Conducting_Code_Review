export enum commonEnum {
  addUser = "Add User",
  editUser = "Update User Form",
  addCodeReview = "Add Code Review Request",
  editCodeReview = "Edit Code Review Request",
  viewCodeReview = "View Code Review Request",
  userModule = "User Module",
  superAdmin = "superAdmin",
  Admin = "Admin",
  Candidate = "Candidate",
  codeModule = "Code Review Module",
  reviewedBy = "reviewedBy",
  email = "email",
  update = "update",
  string = "string",
  assignTo = "assignTo",
  userRole = "userRole"
}

export enum headingEnum {
  addUser = "Add User",
  editUser = "Update User Form",
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
  signUp = "Sign-Up",
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
  srNo = "sr No",
  Candidate = "Candidate",
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
  Invalid = "Invalid email or password",
  inActive = "Your profile is inactive. Please contact the administrator",
  alreadyEmailRegistered = "This email is already registered. Please use a different email address.",
  oldPassword = "Old Password Does Not Match",
} 

export enum validation {
  requiredFeild = "This feild is required",
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
  empty = "/"
}

export enum setItem { 
  user = "user",
  token = "token"
}

export enum getItem { 
  user = "user",
  token = "token"
}


