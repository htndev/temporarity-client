export const setInitialValues = (state: any, initialState: any) => {
  Object.entries(initialState).forEach(([key, value]) => {
    (state as any)[key] = value;
  });
};
