
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Welcome = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-advanta-lightgray flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-advanta-blue">Welcome to ADVANTA</h1>
        <p className="text-xl text-gray-600">The Next-Gen Media Intelligence Platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Already have an account?</CardTitle>
            <CardDescription>Sign in to access your dashboard and manage your campaigns</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" className="bg-advanta-blue" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New to ADVANTA?</CardTitle>
            <CardDescription>Create an account to start using our media intelligence platform</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" variant="outline" className="border-advanta-blue text-advanta-blue" asChild>
              <Link to="/auth/signup">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 max-w-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose ADVANTA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Intelligent Media Planning</h3>
            <p className="text-sm text-gray-600">AI-powered recommendations for the most effective media channels</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Campaign Optimization</h3>
            <p className="text-sm text-gray-600">Real-time insights to optimize your media investments</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Streamlined Workflows</h3>
            <p className="text-sm text-gray-600">End-to-end management from planning to execution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
