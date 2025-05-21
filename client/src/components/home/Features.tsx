import { CalendarCheck, Clock, DollarSign, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <CalendarCheck className="text-2xl" />,
      title: "Online Booking",
      description: "Book appointments without making phone calls or sending emails.",
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      icon: <Clock className="text-2xl" />,
      title: "Time Saving",
      description: "Skip the back and forth communication. Book in minutes.",
      bgColor: "bg-[#FF9500]/10",
      textColor: "text-[#FF9500]"
    },
    {
      icon: <DollarSign className="text-2xl" />,
      title: "Best Prices",
      description: "Access exclusive deals and special offers not available elsewhere.",
      bgColor: "bg-[#00A699]/10",
      textColor: "text-[#00A699]"
    },
    {
      icon: <ShieldCheck className="text-2xl" />,
      title: "Secure Booking",
      description: "Your payment and personal information are always protected.",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Why Book With TravelEase?</h2>
          <p className="text-gray-600 text-lg">Our platform simplifies travel planning with a seamless booking experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl [box-shadow:_0_4px_12px_rgba(0,0,0,0.08)]">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} ${feature.textColor} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
