import { Search, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="text-primary text-3xl" />,
      number: 1,
      title: "Search Destinations",
      description: "Browse through our curated list of destinations and find the perfect one for your travel plans.",
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      icon: <Calendar className="text-[#FF9500] text-3xl" />,
      number: 2,
      title: "Choose Your Dates",
      description: "Select your check-in and check-out dates for your stay to see available properties.",
      bgColor: "bg-[#FF9500]/10",
      textColor: "text-[#FF9500]"
    },
    {
      icon: <CheckCircle className="text-[#00A699] text-3xl" />,
      number: 3,
      title: "Instant Confirmation",
      description: "Receive instant confirmation of your booking without any calls or emails needed.",
      bgColor: "bg-[#00A699]/10",
      textColor: "text-[#00A699]"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">How TravelEase Works</h2>
          <p className="text-gray-600 text-lg">Book your travel appointments in three simple steps</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full ${step.bgColor} flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <div className={`absolute top-0 right-0 w-8 h-8 rounded-full ${step.textColor.replace('text', 'bg')} text-white font-bold text-lg flex items-center justify-center`}>
                  {step.number}
                </div>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center">
            Start Booking Now <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
