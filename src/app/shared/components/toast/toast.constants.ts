export enum ToastType {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Warning = 'WARNING',
  Info = 'INFO',
}

export const ToastIcon: { [key in ToastType]: string } = {
  [ToastType.Success]: 'check_circle',
  [ToastType.Error]: 'cancel',
  [ToastType.Warning]: 'error',
  [ToastType.Info]: 'info',
};
