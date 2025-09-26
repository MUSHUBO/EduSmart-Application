
const loginAttempts = new Map(); 

export const checkLoginAttempt = (email) => {
  const now = Date.now();
  if (!loginAttempts.has(email)) {
    loginAttempts.set(email, { count: 0, lockUntil: 0 });
  }

  const data = loginAttempts.get(email);

  if (now < data.lockUntil) {
    return { locked: true, remaining: Math.ceil((data.lockUntil - now) / 1000) };
  }

  return { locked: false };
};

export const recordFailedAttempt = (email) => {
  const now = Date.now();
  let data = loginAttempts.get(email) || { count: 0, lockUntil: 0 };

  data.count += 1;

  if (data.count >= 4) {
    data.lockUntil = now + 2 * 60 * 1000; // 2 minute lock
    data.count = 0; 
  }

  loginAttempts.set(email, data);
};

export const resetAttempts = (email) => {
  loginAttempts.delete(email);
};
