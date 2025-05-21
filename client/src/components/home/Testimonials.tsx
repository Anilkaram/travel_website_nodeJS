import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "The booking process was incredibly smooth. I loved that I didn't have to make any phone calls or send emails. Just a few clicks and everything was confirmed!",
      author: "Jessica Davis",
      trip: "Booked trip to Bali",
      initials: "JD"
    },
    {
      rating: 4.5,
      text: "I was able to find the perfect hotel for our family vacation in minutes. The photos and detailed descriptions really helped us make our decision. Highly recommend!",
      author: "Michael Rodriguez",
      trip: "Booked trip to Tokyo",
      initials: "MR"
    },
    {
      rating: 5,
      text: "The instant confirmation feature is a game-changer. No more waiting for emails or calls to know if your booking went through. TravelEase made planning our honeymoon stress-free!",
      author: "Sarah Williams",
      trip: "Booked trip to Santorini",
      initials: "SW"
    }
  ];

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 stroke-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star className="fill-gray-200 stroke-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="fill-yellow-400 stroke-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="fill-gray-200 stroke-gray-200" />);
    }
    
    return (
      <div className="flex text-yellow-400 mb-4">
        {stars}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Hear from travelers who've used our booking platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl [box-shadow:_0_4px_12px_rgba(0,0,0,0.08)]">
              {renderStars(testimonial.rating)}
              <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
