export const castType = <T>(data: any): T => {
  const variable: any = data;

  return variable as T;
};
