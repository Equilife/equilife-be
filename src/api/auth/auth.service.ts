export const loginUser = async (email: string, pass: string) => {
  // TODO: Di sini logika untuk validasi user ke database
  console.log(`Attempting to log in user: ${email}`);
  
  // Simulasi berhasil login
  if (email && pass) {
    return { success: true, message: `User ${email} logged in successfully.` };
  }
  
  return { success: false, message: 'Invalid credentials' };
};

export const registerUser = async (email: string, pass: string) => {
  // TODO: Di sini logika untuk menyimpan user baru ke database
  console.log(`Attempting to register user: ${email}`);
  
  // Simulasi berhasil register
  if (email && pass) {
    return { success: true, message: `User ${email} registered successfully.` };
  }
  
  return { success: false, message: 'Missing required fields' };
};