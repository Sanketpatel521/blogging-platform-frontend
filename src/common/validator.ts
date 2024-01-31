export const validateName = (name: string): string | undefined => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    return undefined;
};

export const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    return undefined;
};

export const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    return undefined;
};

export const validatePhoneNumber = (phoneNumber: string): string | undefined => {
    if (/^[0-9]{10}$/.test(phoneNumber)) return 'Phone number must be 10 digits';
    return undefined;
};