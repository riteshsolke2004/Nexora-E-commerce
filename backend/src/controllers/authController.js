const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret-key', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
exports.signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('📝 Signup request received:', { name, email });

        // Validate input
        if (!name || !email || !password) {
            console.log('❌ Missing fields');
            return res.status(400).json({
                success: false,
                error: 'Please provide name, email, and password',
            });
        }

        // Check if user exists
        console.log('🔍 Checking if user exists...');
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            console.log('⚠️  User already exists:', email);
            return res.status(400).json({
                success: false,
                error: 'User already exists with this email',
            });
        }

        console.log('✅ User does not exist, creating new user...');

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`,
        });

        console.log('✅✅ User created successfully in MongoDB:');
        console.log('  - ID:', user._id);
        console.log('  - Email:', user.email);
        console.log('  - Name:', user.name);
        console.log('  - Collection: users');

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Error creating user',
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔐 Login request:', { email });

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password',
            });
        }

        // Find user with password
        console.log('🔍 Finding user in database...');
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            console.log('⚠️  User not found:', email);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            console.log('⚠️  Password mismatch for:', email);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }

        console.log('✅ Login successful:', user.email);

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Error logging in',
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('❌ Get profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching profile',
        });
    }
};

// @desc    Update profile
// @route   PUT /api/auth/profile
exports.updateProfile = async(req, res) => {
    try {
        const { name, email, phone, address, avatar } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email.toLowerCase();
        if (phone !== undefined) user.phone = phone;
        if (avatar) user.avatar = avatar;
        if (address) user.address = {...user.address, ...address };

        await user.save();

        console.log('✅ Profile updated for:', user.email);

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error('❌ Update profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Error updating profile',
        });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
exports.changePassword = async(req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Current password is incorrect',
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        console.log('✅ Password changed for:', user.email);

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.error('❌ Change password error:', error);
        res.status(500).json({
            success: false,
            error: 'Error changing password',
        });
    }
};