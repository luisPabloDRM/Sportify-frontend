export type PasswordRecoveryRequestDTO = {
    email: string;
    code: string;
    password: string;
};

export type PasswordRecoveryValidityDTO = {
    valid: boolean
}