import bcrypt from 'bcryptjs';

export const generateTrackingNumber = async (): Promise<string> => {
  const prefix: string = 'FM3D';
  const date: string = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD format

  // Generate a unique random string
  const randomString: string = `${Date.now()}-${Math.random()}`;

  // Hash the random string with bcrypt
  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(randomString, salt);

  // Extract a clean alphanumeric portion of the hash
  const uniqueCode: string = hash
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 6)
    .toUpperCase();

  return `${prefix}-${date}-${uniqueCode}`;
};
