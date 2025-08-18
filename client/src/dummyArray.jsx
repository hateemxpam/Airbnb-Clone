const dummyListings = [
  {
    id: 1,
    title: "Modern Apartment in Islamabad",
    location: "G-11, Islamabad",
    price: 8500,
    image:
      "https://i.pinimg.com/736x/74/de/e7/74dee7cafa270d2504e2edd50d9a1b6e.jpg",
    description: "Experience luxury living in this modern apartment located in the heart of G-11, Islamabad. This beautifully furnished 2-bedroom apartment features contemporary design, high-end appliances, and stunning city views. Perfect for both business travelers and families seeking comfort and convenience.",
    address: "Street 15, G-11/1, Islamabad, Pakistan",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Air conditioning", "Washer", "Dryer", "TV", "Balcony", "Gym access", "Pool"],
    images: [
      "https://i.pinimg.com/736x/74/de/e7/74dee7cafa270d2504e2edd50d9a1b6e.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800",
      "https://images.unsplash.com/photo-1560448204-6033c33be9a8?w=800"
    ]
  },
  {
    id: 2,
    title: "Cozy Studio in Lahore",
    location: "DHA Phase 6, Lahore",
    price: 6500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYHT5qdFlRJnHLQ7ejEkmlF4kZaX4CVJ7fEw&s",
    description: "A charming studio apartment in the prestigious DHA Phase 6 area. This compact yet comfortable space is perfect for solo travelers or couples. Features modern amenities, a fully equipped kitchen, and a private balcony with garden views.",
    address: "Block A, DHA Phase 6, Lahore, Pakistan",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Air conditioning", "TV", "Balcony", "Garden view"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYHT5qdFlRJnHLQ7ejEkmlF4kZaX4CVJ7fEw&s",
      "https://images.unsplash.com/photo-1560448204-6033c33be9a8?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 3,
    title: "Beachside Hut in Karachi",
    location: "Clifton, Karachi",
    price: 9200,
    image:
      "https://i.pinimg.com/736x/5f/fa/8e/5ffa8e189b5d226aff835968d07785a6.jpg",
    description: "Escape to this unique beachside hut located just steps away from the Arabian Sea. This rustic yet comfortable accommodation offers breathtaking ocean views, private beach access, and a peaceful atmosphere perfect for relaxation and adventure.",
    address: "Beach Road, Clifton Block 4, Karachi, Pakistan",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Beach access", "Ocean view", "Outdoor seating", "BBQ facilities"],
    images: [
      "https://i.pinimg.com/736x/5f/fa/8e/5ffa8e189b5d226aff835968d07785a6.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 4,
    title: "Luxury Condo in Murree",
    location: "Mall Road, Murree",
    price: 10000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgU8SMPYffsZnUsQkANX95dEfD29gKyxYS3-Y0ohxagDlVGksowZqvcTwuiuhSbH09rWE&usqp=CAU",
    description: "Experience the beauty of Murree from this luxurious condo on Mall Road. This premium accommodation features panoramic mountain views, modern furnishings, and easy access to shopping, restaurants, and scenic hiking trails.",
    address: "Mall Road, Murree Hills, Pakistan",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Mountain view", "Fireplace", "Balcony", "Hiking access"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgU8SMPYffsZnUsQkANX95dEfD29gKyxYS3-Y0ohxagDlVGksowZqvcTwuiuhSbH09rWE&usqp=CAU",
      "https://images.unsplash.com/photo-1560448204-6033c33be9a8?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 5,
    title: "Cottage Near Lake View Park",
    location: "Lake View, Islamabad",
    price: 7500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-i8cEx3nT0ENtLL3KtHj20UK0o10V-uA0kQ6vUWPKxPNei5kFxcIQLT17xzTHP6HfKE&usqp=CAU",
    description: "A charming cottage nestled near the scenic Lake View Park. This peaceful retreat offers a perfect blend of nature and comfort, with walking trails, lake views, and a cozy interior that makes you feel at home.",
    address: "Lake View Park Road, Islamabad, Pakistan",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Lake view", "Garden", "Walking trails", "Outdoor seating"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-i8cEx3nT0ENtLL3KtHj20UK0o10V-uA0kQ6vUWPKxPNei5kFxcIQLT17xzTHP6HfKE&usqp=CAU",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 6,
    title: "Penthouse in Karachi Skyline",
    location: "Sea View, Karachi",
    price: 12000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IgXHAgRXzlxIeBQ_POajd0b5Bu2xDlKhhdQXS5xFBI9Cy5LJtUlrnV-JU-3lLe3qcQw&usqp=CAU",
    description: "Live like royalty in this stunning penthouse with panoramic views of the Arabian Sea and Karachi skyline. This luxury accommodation features high-end finishes, private terrace, and world-class amenities for the discerning traveler.",
    address: "Sea View Boulevard, Block 6, Karachi, Pakistan",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    amenities: ["WiFi", "Kitchen", "Free parking", "Sea view", "Private terrace", "Gym", "Pool", "Concierge"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IgXHAgRXzlxIeBQ_POajd0b5Bu2xDlKhhdQXS5xFBI9Cy5LJtUlrnV-JU-3lLe3qcQw&usqp=CAU",
      "https://images.unsplash.com/photo-1560448204-6033c33be9a8?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 7,
    title: "Hilltop Villa in Abbottabad",
    location: "Shimla Hills, Abbottabad",
    price: 9500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDNUHdV5gax1iepEnaiWtQEutjJiuCqDBWZS6TCUWD66A8HKpJJS08njRc-_Afg5bE4aU&usqp=CAU",
    description: "Perched on a hilltop in the scenic Shimla Hills, this villa offers breathtaking panoramic views of the surrounding mountains and valleys. Perfect for nature lovers and those seeking tranquility away from city life.",
    address: "Shimla Hills Road, Abbottabad, Pakistan",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Mountain view", "Garden", "Hiking trails", "Fireplace"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDNUHdV5gax1iepEnaiWtQEutjJiuCqDBWZS6TCUWD66A8HKpJJS08njRc-_Afg5bE4aU&usqp=CAU",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 8,
    title: "Furnished Guesthouse in Multan",
    location: "Cantt, Multan",
    price: 5800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5pR968oUJLFeHSlQGpS_wRJDdp0f-t16d10CQlnpuY7HCU0S3ioi0CLxRAe2ZYg8f88&usqp=CAU",
    description: "A comfortable and well-maintained guesthouse in the heart of Multan Cantt. This traditional-style accommodation offers modern comforts while maintaining the cultural charm of the region. Perfect for business travelers and tourists.",
    address: "Cantt Road, Multan, Pakistan",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Air conditioning", "TV", "Garden", "Traditional decor"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5pR968oUJLFeHSlQGpS_wRJDdp0f-t16d10CQlnpuY7HCU0S3ioi0CLxRAe2ZYg8f88&usqp=CAU",
      "https://images.unsplash.com/photo-1560448204-6033c33be9a8?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
  {
    id: 9,
    title: "Farm Stay Near Faisalabad",
    location: "Jaranwala Road, Faisalabad",
    price: 7200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSi6WyVzJcHJ3P5q2mfidb1a6W_SzTAsyNJw&s",
    description: "Experience authentic rural life at this charming farm stay near Faisalabad. Surrounded by lush green fields, this accommodation offers a unique opportunity to connect with nature and experience traditional Pakistani hospitality.",
    address: "Jaranwala Road, Faisalabad, Pakistan",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Farm view", "Organic meals", "Farm activities", "Fresh air"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSi6WyVzJcHJ3P5q2mfidb1a6W_SzTAsyNJw&s",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
    ]
  },
];

export default dummyListings;
