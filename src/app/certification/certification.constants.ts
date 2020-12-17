export enum CERTIFICATION_ROLE {
  USER = "USER", // user can only add certifications for himself
  MANAGER = "MANAGER", // manager can add certification for any as well as send reminders
  ADMIN = "ADMIN", // can export too
}
