import { 
  User, 
  InsertUser, 
  Destination, 
  InsertDestination, 
  Hotel, 
  InsertHotel,
  ContactForm,
  InsertContactForm,
  Booking,
  InsertBooking 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Destination methods
  getDestination(id: number): Promise<Destination | undefined>;
  getDestinations(): Promise<Destination[]>;
  getPopularDestinations(): Promise<Destination[]>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Hotel methods
  getHotel(id: number): Promise<Hotel | undefined>;
  getHotels(): Promise<Hotel[]>;
  getHotelsByDestination(destinationId: number): Promise<Hotel[]>;
  getFeaturedHotels(): Promise<Hotel[]>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  
  // Contact form methods
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private hotels: Map<number, Hotel>;
  private contactForms: Map<number, ContactForm>;
  private bookings: Map<number, Booking>;
  
  private userId: number;
  private destinationId: number;
  private hotelId: number;
  private contactFormId: number;
  private bookingId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.hotels = new Map();
    this.contactForms = new Map();
    this.bookings = new Map();
    
    this.userId = 1;
    this.destinationId = 1;
    this.hotelId = 1;
    this.contactFormId = 1;
    this.bookingId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Destination methods
  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getPopularDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.isPopular);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.destinationId++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }
  
  // Hotel methods
  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }
  
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }
  
  async getHotelsByDestination(destinationId: number): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(
      (hotel) => hotel.destinationId === destinationId
    );
  }
  
  async getFeaturedHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => hotel.isFeatured);
  }
  
  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = this.hotelId++;
    const hotel: Hotel = { ...insertHotel, id };
    this.hotels.set(id, hotel);
    return hotel;
  }
  
  // Contact form methods
  async createContactForm(insertForm: InsertContactForm): Promise<ContactForm> {
    const id = this.contactFormId++;
    const createdAt = new Date();
    const form: ContactForm = { ...insertForm, id, createdAt };
    this.contactForms.set(id, form);
    return form;
  }
  
  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const createdAt = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt };
    this.bookings.set(id, booking);
    return booking;
  }
  
  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  // Initialize with sample data
  private initializeData() {
    // Sample destinations
    const destinations: InsertDestination[] = [
      {
        name: "Paris",
        country: "France",
        description: "The City of Light, famous for its stunning architecture, art museums, historical monuments, and romantic atmosphere.",
        imagePath: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        propertyCount: 126,
        rating: 5,
        isPopular: true
      },
      {
        name: "Bali",
        country: "Indonesia",
        description: "A beautiful island known for its volcanic mountains, beaches, coral reefs, religious sites, and vibrant nightlife.",
        imagePath: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        propertyCount: 214,
        rating: 5,
        isPopular: true
      },
      {
        name: "New York",
        country: "USA",
        description: "The Big Apple, known for its skyscrapers, Broadway shows, iconic landmarks, and diverse culture.",
        imagePath: "https://images.unsplash.com/photo-1522083165195-3424ed129620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        propertyCount: 305,
        rating: 4,
        isPopular: true
      },
      {
        name: "Sydney",
        country: "Australia",
        description: "Australia's largest city, known for its Opera House, harbor bridge, beautiful beaches, and vibrant culture.",
        imagePath: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        propertyCount: 176,
        rating: 4,
        isPopular: true
      },
      {
        name: "Santorini",
        country: "Greece",
        description: "A stunning island known for its white-washed buildings, blue domes, beautiful sunsets, and crystalline waters.",
        imagePath: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        propertyCount: 93,
        rating: 5,
        isPopular: true
      },
      {
        name: "Tokyo",
        country: "Japan",
        description: "Japan's busy capital, mixing the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.",
        imagePath: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        propertyCount: 287,
        rating: 4,
        isPopular: true
      }
    ];
    
    // Create destinations
    destinations.forEach(destination => {
      this.createDestination(destination);
    });
    
    // Sample hotels
    const hotels: InsertHotel[] = [
      {
        name: "Luxury Ocean View",
        destinationId: 2, // Bali
        description: "Elegant beachfront resort with breathtaking ocean views, infinity pools, and luxurious spa treatments.",
        address: "Jl. Karang Mas Sejahtera, Bali, Indonesia",
        imagePath: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        rating: 5,
        pricePerNight: 299,
        facilities: ["Swimming Pool", "Spa", "Restaurant", "Free Wifi"],
        isFeatured: true
      },
      {
        name: "Urban Oasis",
        destinationId: 3, // New York
        description: "Sophisticated urban retreat in the heart of Manhattan, offering stunning city skyline views and premium amenities.",
        address: "123 Fifth Avenue, New York, USA",
        imagePath: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        rating: 5,
        pricePerNight: 359,
        facilities: ["Gym", "Rooftop Bar", "Business Center", "Free Wifi"],
        isFeatured: true
      },
      {
        name: "Mountain Lodge Retreat",
        destinationId: 3, // Using New York as proxy for Aspen
        description: "Cozy mountain lodge with rustic charm, fireplace lounge, and easy access to ski slopes and hiking trails.",
        address: "789 Mountain Road, Aspen, USA",
        imagePath: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        rating: 4,
        pricePerNight: 249,
        facilities: ["Fireplace", "Hot Tub", "Ski Access", "Free Wifi"],
        isFeatured: true
      },
      {
        name: "Beachfront Paradise",
        destinationId: 2, // Using Bali as proxy for Maldives
        description: "Exclusive overwater bungalows with private pools, direct access to crystal clear waters, and world-class dining.",
        address: "Maldives Island Resort, North Malé Atoll, Maldives",
        imagePath: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        rating: 5,
        pricePerNight: 599,
        facilities: ["Private Pool", "Beach Access", "Butler Service", "Free Wifi"],
        isFeatured: true
      },
      {
        name: "Historic Boutique",
        destinationId: 1, // Paris
        description: "Charming boutique hotel housed in a historic building, offering elegant rooms with Parisian flair and modern comforts.",
        address: "45 Rue de Rivoli, Paris, France",
        imagePath: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        rating: 5,
        pricePerNight: 329,
        facilities: ["Concierge", "Fine Dining", "City Views", "Free Wifi"],
        isFeatured: true
      },
      {
        name: "Zen Sanctuary",
        destinationId: 6, // Tokyo
        description: "Minimalist Japanese-inspired hotel offering tranquil spaces, traditional tea ceremonies, and zen gardens.",
        address: "2-8-1 Shinjuku, Tokyo, Japan",
        imagePath: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        rating: 4,
        pricePerNight: 289,
        facilities: ["Meditation Room", "Japanese Garden", "Tea Ceremony", "Free Wifi"],
        isFeatured: true
      }
    ];
    
    // Create hotels
    hotels.forEach(hotel => {
      this.createHotel(hotel);
    });
  }
}

export const storage = new MemStorage();
