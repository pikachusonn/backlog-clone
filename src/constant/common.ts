export enum ProjectInviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum ProjectRole {
  COLLABORATOR = 'COLLABORATOR',
  OWNER = 'OWNER',
}

export enum ErrorKey {
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNAUTHORIZED_PROJECT = 'UNAUTHORIZED_PROJECT',
  PENDING_PROJECT_INVITE = 'PENDING_PROJECT_INVITE',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export const DefaultTaskStatusText = [
  {
    text: 'To do',
    color: '#f45e53',
  },
  {
    text: 'In progress',
    color: '#3b90db',
  },
  {
    text: 'Done',
    color: '#47c678',
  },
];
