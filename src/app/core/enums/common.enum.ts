export enum commonEnum {
    addUser = "Add User Form",
    editUser = "Update User Form",
    addCodeReview = "Add Code Review",
    editCodeReview = "Edit Code Review",
    userModule = "User Module",
    Admin = "Admin",
    Candidate = "Candidate",
  }

export enum modalData {
  declineRequest = "Decline Request",
  declineTitle = "Add reasons to decline request",
  approveRequest = "Approve Request",
  selectAdmin = "Please select an admin to assign this candidate"
}

export enum tableEnum {
  password = "password",
  addUser = "AddUser",
  signUp = "Sign-Up",
  statusBtn = "statusBtn",
  assignTo = "assignTo",
  Active = "Active",
  Inactive = "Inactive",
  Rejected = "Rejected",
  Pending = "Pending",
  superAdmin = "superAdmin",
  Admin = "Admin",
  Request = "Request",
  Id = "id",
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
  detailsUpdated = "Details updated successfully"
}

export enum errorMessage { 
  alreadyRegistered = "This email is already registered. Please use a different email address.",
  Invalid = "Invalid email or password",
  inActive = "Your profile is inactive. Please contact the administrator",
  alreadyEmailRegistered = "This email is already registered. Please use a different email address.",
  oldPassword = "Old Password Does Not Match"
} 

export enum endPoints {
  users = "users/"
}

export enum setUser { 
  user = "user"
}