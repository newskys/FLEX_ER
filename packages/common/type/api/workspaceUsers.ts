export interface WorkspaceUsersResponse {
  currentUser: {
    user: {
      customerIdHash: string
      name: string
      userIdHash: string
      workspaceIdHash: string
    }
  }
}