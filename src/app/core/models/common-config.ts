export interface currentUser {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    userRole?: string,
    status?: string,
    createdBy?: string,
    assignTo?: Array<object>,
    name?: string,
}
export interface codeReview {
    title?: string,
    startDate?: string,
    endDate?: string,
    codeDescription?: string,
    textEditor?: string,
    userId?: string,
    assignTo?: object,
    createdBy?: string,
    reviewedBy?: object,
    status?: string,
    codeReview?: string,
}

export interface signUp {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    userRole?: string,
    status?: string,
    assignTo?: object,
    createdBy?: string,
}

export interface addUser {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    userRole?: string
    status?: string
    assignTo?: string
    createdBy?: string
}