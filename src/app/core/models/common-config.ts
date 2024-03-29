export interface currentUser {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    userRole?: string,
    status?: string,
    createdBy?: string,
    assignTo?: {id:string, name:string} | null,
    name?: string,
}
export interface codeReview {
    title?: string,
    startDate?: string,
    endDate?: string,
    codeDescription?: string,
    textEditor?: string,
    userId?: string,
    assignTo?: {id:string, name:string} | null,
    createdBy?: string,
    reviewedBy?: object,
    status?: string,
    codeReview?: string,
}
export interface addUser {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    userRole?: string
    status?: string
    assignTo?: {id:string, name:string} | null,
    createdBy?: string
}