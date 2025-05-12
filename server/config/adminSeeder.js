import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@blog.com' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const newAdmin = new User({
        name: 'Super Admin',
        email: 'admin@blog.com',
        password: hashedPassword,
        role: 'admin',
        avatar: 'https://i.ibb.co/default-avatar.png', // optional
      });

      await newAdmin.save();
      console.log('✅ Default admin created');
    } else {
      console.log('⚠️ Admin already exists');
    }
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
  }
};
