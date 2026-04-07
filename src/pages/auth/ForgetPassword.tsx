import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createClient } from '@/lib/supabase';  

type AlertType = 'error' | 'success' | 'info';

interface AlertState {
  type: AlertType;
  message: string;
}

const ForgotPassword = () => {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue.trim()) {
      setAlert({ type: 'error', message: 'Please enter your email address' });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    if (!validateEmail(email)) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setAlert({
          type: 'error',
          message: error.message || 'Failed to send reset email. Please try again.',
        });
      } else {
        setAlert({
          type: 'success',
          message: 'Check your email for a password reset link. You can close this page.',
        });
        setEmail('');
      }
    } catch {
      setAlert({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-block rounded-full bg-gradient-to-br from-primary to-accent p-4 mb-4">
            <span className="text-3xl">🏗️</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Ik Engineering</h1>
          <p className="text-sm text-muted-foreground mt-1">Reset Your Password</p>
        </div>

        {/* Reset Card */}
        <Card className="border-border/50 shadow-lg dark:shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Forgot Your Password?</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            {alert && (
              <Alert
                variant={alert.type === 'error' ? 'destructive' : 'default'}
                className="mb-6"
              >
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                  autoComplete="email"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Remember your password?</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {/* ← Link from react-router-dom uses "to" instead of "href" */}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          If you don't receive an email within 5 minutes, check your spam folder
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;