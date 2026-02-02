export enum Role {
    Administrador = 'Adiministrador',
    USER = 'Usuario'
}

export enum Permission {
  ReadMyself = 'READ_MYSELF',
  WriteMySelf = 'WRITE_MYSELF',
  ReadUsers = 'READ_USERS',
  WriteUsers = 'WRITE_USERS',
  DeleteUsers = 'DELETE_USERS',
  ReadLogIns = 'READ_LOG_INS',
  ActivateNotifications = 'ACTIVATE_NOTIFICATIONS',
  SendNotifications = 'SEND_NOTIFICATIONS',
}