export const OtpType = {
  SMS: "SMS",
  EMAIL: "EMAIL",
  AUTHENTICATOR_APP: "AUTHENTICATOR_APP",
} as const;

export type OtpType = (typeof OtpType)[keyof typeof OtpType];
