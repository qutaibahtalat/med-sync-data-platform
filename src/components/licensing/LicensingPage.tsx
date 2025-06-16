
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Building, Star } from "lucide-react";

const LicensingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "PKR 15,000",
      period: "/month",
      description: "Perfect for small clinics",
      icon: Zap,
      features: [
        "Up to 100 tests/month",
        "Basic reporting",
        "2 user accounts",
        "Email support",
        "Basic templates"
      ],
      color: "bg-blue-500"
    },
    {
      id: "professional",
      name: "Professional",
      price: "PKR 35,000",
      period: "/month",
      description: "Ideal for growing practices",
      icon: Crown,
      features: [
        "Up to 1,000 tests/month",
        "Advanced reporting",
        "10 user accounts",
        "Priority support",
        "Custom templates",
        "Inventory management",
        "Equipment tracking"
      ],
      color: "bg-purple-500",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "PKR 75,000",
      period: "/month",
      description: "For large healthcare facilities",
      icon: Building,
      features: [
        "Unlimited tests",
        "Advanced analytics",
        "Unlimited users",
        "24/7 phone support",
        "Custom integrations",
        "API access",
        "Dedicated account manager",
        "Custom branding"
      ],
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your MedSync Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful laboratory management solutions designed for healthcare providers of all sizes
          </p>
          <div className="mt-6">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              Powered by mindspire.org
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                } ${plan.popular ? 'scale-105' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${selectedPlan === plan.id ? 'bg-blue-600' : ''}`}
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Ready to Get Started?</CardTitle>
            <CardDescription>
              Contact our sales team for custom enterprise solutions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button size="lg" className="w-full">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              All plans include free setup and training. No setup fees.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LicensingPage;
