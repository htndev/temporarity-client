export const PASSWORD_REGEX = () =>
  /^(?=.*[ -/:-@[-`{-~]{1,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,255}$/;

export const FULL_NAME_REGEX = () => /^([[A-Za-zА-ЯҐЄІЇа-яґєії\.]+.?\s?){0,255}$/;
