import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import bankingHero from "@/assets/banking-hero.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Left Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32">
        <div className="w-full max-w-md mx-auto">
          {/* Logo/Brand */}
          <div className="mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Secure Banking Platform</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Smart Branch</h1>
            <p className="text-muted-foreground text-sm">Banking made simple and secure</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
              <p className="text-muted-foreground text-sm">Please sign in to continue</p>
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
              >
                Sign In
              </Button>
            </form>

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

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bankingHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        </div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-end p-12">
          <div className="text-white space-y-4 max-w-lg">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold mb-3">
                Modern Banking Experience
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Access your accounts securely with our state-of-the-art banking platform designed for your convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
