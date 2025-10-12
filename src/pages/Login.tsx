import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, Scan, Fingerprint } from "lucide-react";
import bankingHero from "@/assets/banking-hero.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    navigate("/dashboard");
  };

  const handleBiometricAuth = async (type: 'faceId' | 'fingerprint') => {
    setIsAuthenticating(true);
    
    // Simulate biometric authentication process
    try {
      if (type === 'faceId') {
        console.log("Initiating Face ID authentication...");
        // In a real app, you would call the Web Authentication API or native biometric APIs
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate auth delay
      } else {
        console.log("Initiating Fingerprint authentication...");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate auth delay
      }
      
      // Simulate successful authentication
      console.log(`${type} authentication successful`);
      navigate("/dashboard");
    } catch (error) {
      console.error(`${type} authentication failed:`, error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bankingHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 sm:px-12 lg:px-16">
        <div className="w-full max-w-sm mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-primary tracking-tight">Smart Branch</h1>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 pl-11 input-focus"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pl-11 pr-11 input-focus"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold button-primary mt-6"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? "Authenticating..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Biometric Authentication Options */}
            <div className="space-y-3">
              {/* Face ID Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:border-primary/50 transition-all duration-200"
                onClick={() => handleBiometricAuth('faceId')}
                disabled={isAuthenticating}
              >
                <Scan className="h-5 w-5 mr-3 text-primary" />
                {isAuthenticating ? "Authenticating..." : "Sign in with Face ID"}
              </Button>

              {/* Fingerprint Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:border-primary/50 transition-all duration-200"
                onClick={() => handleBiometricAuth('fingerprint')}
                disabled={isAuthenticating}
              >
                <Fingerprint className="h-5 w-5 mr-3 text-primary" />
                {isAuthenticating ? "Authenticating..." : "Sign in with Fingerprint"}
              </Button>
            </div>

            {/* Footer */}
            <div className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Contact your administrator
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
