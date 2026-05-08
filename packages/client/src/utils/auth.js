const CURRENT_USER_KEY = `currentUser`;

export const getCurrentUser = () => {
  if (typeof window === `undefined`) {
    return null;
  }

  // eslint-disable-next-line no-undef
  const storedUser = window.localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (typeof window === `undefined`) {
    return;
  }

  // eslint-disable-next-line no-undef
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // eslint-disable-next-line no-undef
  window.localStorage.removeItem(CURRENT_USER_KEY);
};
