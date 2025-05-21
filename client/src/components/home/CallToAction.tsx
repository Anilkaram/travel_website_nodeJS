import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 relative bg-cover bg-center" style={{ backgroundImage: "url('https://pixabay.com/get/g13ab94acab01b6256d6ab9bd0e2c0c9060d05f53d04d10168b6832dfe705ff932748bea2ffdc23d56936c8ac25cc59d40c173b55176f52ba97418e9258c80a59_1280.jpg')" }}>
      <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">Ready to Book Your Next Adventure?</h2>
          <p className="text-white text-lg mb-8">Join thousands of happy travelers who book with TravelEase. No phone calls, no emails, just a few clicks to your dream vacation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto">
                Browse Destinations
              </Button>
            </Link>
            <a href="#contact">
              <Button className="bg-[#FF9500] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#FF9500]/90 transition-colors w-full sm:w-auto">
                Book Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
