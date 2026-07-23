export enum Role {
    Administrador = 'Adiministrador',
    USER = 'Usuario'
}

export enum Permission {
  ReadMyself = 'READ_MYSELF',
  WriteMyself = 'WRITE_MYSELF',
  ReadUsers = 'READ_USERS',
  WriteUsers = 'WRITE_USERS',
  DeleteUsers = 'DELETE_USERS',
  ReadLogIns = 'READ_LOG_INS',
  ReadSports = 'READ_SPORTS',
  CreateSports = 'WRITE_SPORTS',
  ReadEventSports = 'READ_EVENT_SPORTS',
  WriteEventSports = 'WRITE_EVENT_SPORTS',
  DeleteEventSports = 'DELETE_EVENT_SPORTS',
  ActivateNotifications = 'ACTIVATE_NOTIFICATIONS',
  SendNotifications = 'SEND_NOTIFICATIONS',
}