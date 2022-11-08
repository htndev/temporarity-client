export const containsFile = (obj: any): boolean => {
  if (typeof obj === 'object') {
    if (obj instanceof File) {
      return true;
    }

    for (const key in obj) {
      if (containsFile(obj[key])) {
        return true;
      }
    }
  }

  return false;
};
