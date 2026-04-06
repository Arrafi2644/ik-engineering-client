import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/lib/authContext';
import type { RegisterFormData, AuthError } from '@/types/auth';
import { Link, useLocation } from 'react-router-dom';

const Register = () => {
  const { signUp, isLoading } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false,
  });

  const [error, setError] = useState<AuthError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'fair' | 'strong' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Calculate password strength
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password: string): 'weak' | 'fair' | 'strong' => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'fair';
    return 'strong';
  };

  const getPasswordStrengthColor = () => {
    if (!passwordStrength) return 'bg-muted';
    if (passwordStrength === 'weak') return 'bg-red-500';
    if (passwordStrength === 'fair') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError({ message: 'Please enter your first name' });
      return false;
    }

    if (!formData.lastName.trim()) {
      setError({ message: 'Please enter your last name' });
      return false;
    }

    if (!formData.email.trim()) {
      setError({ message: 'Please enter your email address' });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError({ message: 'Please enter a valid email address' });
      return false;
    }

    if (!formData.password) {
      setError({ message: 'Please enter a password' });
      return false;
    }

    if (formData.password.length < 8) {
      setError({ message: 'Password must be at least 8 characters' });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError({ message: 'Passwords do not match' });
      return false;
    }

    if (!formData.agreeToTerms) {
      setError({ message: 'Please agree to the terms and conditions' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: signUpError } = await signUp(formData.email, formData.password);

      if (signUpError) {
        setError({
          message: signUpError.message || 'Failed to create account. Please try again.',
          code: signUpError.name,
        });
      } else {
        // Redirect to login with success message
        location.href = '/login?registered=true';
      }
    } catch (err) {
      setError({
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-block rounded-full bg-gradient-to-br from-primary to-accent p-4 mb-4">
            <span className="text-3xl">🏗️</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Ik Engineering</h1>
          <p className="text-sm text-muted-foreground mt-1">Create Your Account</p>
        </div>

        {/* Register Card */}
        <Card className="border-border/50 shadow-lg dark:shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Create an account to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Provide First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                    autoComplete="given-name"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Provide Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                  autoComplete="new-password"
                  required
                />
                {/* Password Strength Indicator */}
                {passwordStrength && (
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getPasswordStrengthColor()}`}
                        style={{
                          width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'fair' ? '66%' : '100%'
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: <span className="capitalize font-semibold">{passwordStrength}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, agreeToTerms: checked === true }))
                  }
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <Label htmlFor="agreeToTerms" className="text-xs font-normal cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold mt-6"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-muted-foreground">
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your data is secure and protected with Supabase
        </p>
      </div>
    </div>
  );
}

export default Register;