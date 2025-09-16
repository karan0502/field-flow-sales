import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Truck, Target, Users } from "lucide-react";

interface OnboardingWelcomeProps {
  onComplete: () => void;
}

export function OnboardingWelcome({ onComplete }: OnboardingWelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* App Logo */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Truck className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SalesForce</h1>
          <p className="text-blue-100 text-lg">Your sales journey made simple</p>
        </div>

        {/* Features Preview */}
        <div className="space-y-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Track Performance</h3>
                <p className="text-blue-100 text-sm">Monitor your daily targets</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Manage Customers</h3>
                <p className="text-blue-100 text-sm">Keep track of all visits</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Route Optimization</h3>
                <p className="text-blue-100 text-sm">Plan efficient field visits</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started Button */}
        <Button 
          onClick={onComplete}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 h-12 text-lg font-medium shadow-lg"
        >
          Get Started
        </Button>

        {/* Footer */}
        <p className="text-center text-blue-200 text-sm">
          Welcome to the future of field sales
        </p>
      </div>
    </div>
  );
}