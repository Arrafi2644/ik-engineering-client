import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/authContext";
import type { LoginFormData, AuthError } from "@/types/auth";

const Login = () =>  {
  const navigate = useNavigate();
  const { signIn, isLoading, getToken } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState<AuthError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError({ message: "Please enter your email address" });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError({ message: "Please enter a valid email address" });
      return false;
    }

    if (!formData.password) {
      setError({ message: "Please enter your password" });
      return false;
    }

    if (formData.password.length < 6) {
      setError({ message: "Password must be at least 6 characters" });
      return false;
    }

    return true;
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const { error: signInError } = await signIn(
      formData.email,
      formData.password
    );

    if (signInError) {
      setError({
        message:
          signInError.message ||
          "Failed to sign in. Please check your credentials.",
      });
      return;
    }

    const token = await getToken();

    await fetch("http://localhost:5000/api/auth/sync-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });

    navigate("/admin");
  } catch {
    setError({ message: "Something went wrong" });
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
          <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-lg dark:shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your dashboard and manage your projects
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error.message}</AlertDescription>
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
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary dark:border-primary/20"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      rememberMe: checked === true,
                    }))
                  }
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Register here
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Protected by industry-standard security with Supabase
        </p>
      </div>
    </div>
  );
}


export default Login;