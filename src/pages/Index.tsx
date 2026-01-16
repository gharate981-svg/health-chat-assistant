import { Heart, Shield, Clock } from "lucide-react";
import HealthChatbot from "@/components/HealthChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/20 to-background" />
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm text-accent-foreground mb-6">
              <Heart className="w-4 h-4" />
              <span className="font-medium">Your Personal Health Companion</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Get Trusted Health
              <span className="text-primary"> Guidance</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ask questions about wellness, nutrition, exercise, and healthy living. 
              Our AI assistant provides helpful information to support your health journey.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground">Available 24/7</h3>
                <p className="text-xs text-muted-foreground">Get answers anytime</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground">Private & Secure</h3>
                <p className="text-xs text-muted-foreground">Your data stays safe</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground">Evidence-Based</h3>
                <p className="text-xs text-muted-foreground">Reliable health info</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Section */}
      <main className="container mx-auto px-4 pb-16">
        <HealthChatbot />
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            This health assistant provides general information only and is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
