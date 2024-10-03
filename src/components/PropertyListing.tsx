import PropertyCard from "./cards/PropertyCard"

export default function PropertyListing() {
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-20">
            <PropertyCard title="Sobha Heartland | Villas" image="../../public/Screenshot 2024-10-03 at 22.55.40.png" description="4 Bedroom Villa for Rent in Al Barsha" location="1 Villa, Al Barsha, Dubai" price={189} rating={4.89} time="Night" />

            <PropertyCard title="Luxury Apartment | Downtown" image="../../public/Screenshot 2024-10-03 at 22.55.51.png" description="2 Bedroom Apartment for Sale in Downtown" location="Downtown, Dubai" price={350} rating={4.75} time="Night" />

            <PropertyCard title="Beachfront Condo | Jumeirah" image="../../public/Screenshot 2024-10-03 at 22.56.35.png" description="3 Bedroom Condo for Rent in Jumeirah" location="Jumeirah Beach, Dubai" price={250} rating={4.90} time="Day" />

            <PropertyCard title="Cozy Studio | Dubai Marina" image="../../public/Screenshot 2024-10-03 at 22.56.50.png" description="1 Bedroom Studio for Rent in Dubai Marina" location="Dubai Marina, Dubai" price={150} rating={4.50} time="Night" />

            <PropertyCard title="Spacious Villa | Arabian Ranches" image="../../public/Screenshot 2024-10-03 at 22.57.03.png" description="5 Bedroom Villa for Sale in Arabian Ranches" location="Arabian Ranches, Dubai" price={750} rating={4.85} time="Night" />

            <PropertyCard title="Modern Flat | Business Bay" image="../../public/Screenshot 2024-10-03 at 22.57.42.png" description="2 Bedroom Flat for Rent in Business Bay" location="Business Bay, Dubai" price={200} rating={4.80} time="Day" />

            <PropertyCard title="Elegant Townhouse | Arabian Ranches" image="../../public/Screenshot 2024-10-03 at 22.58.01.png" description="4 Bedroom Townhouse for Rent in Arabian Ranches" location="Arabian Ranches, Dubai" price={300} rating={4.80} time="Night" />

            <PropertyCard title="Penthouse Suite | Dubai Marina" image="../../public/Screenshot 2024-10-03 at 22.58.11.png" description="3 Bedroom Penthouse for Sale in Dubai Marina" location="Dubai Marina, Dubai" price={1_200} rating={4.95} time="Night" />

            <PropertyCard title="Charming Villa | Al Furjan" image="../../public/Screenshot 2024-10-03 at 22.58.34.png" description="5 Bedroom Villa for Rent in Al Furjan" location="Al Furjan, Dubai" price={400} rating={4.70} time="Day" />

            <PropertyCard title="Stylish Apartment | JLT" image="../../public/Screenshot 2024-10-03 at 22.59.01.png" description="2 Bedroom Apartment for Rent in JLT" location="Jumeirah Lake Towers, Dubai" price={180} rating={4.65} time="Night" />

            <PropertyCard title="Family Villa | Dubai Hills" image="../../public/Screenshot 2024-10-03 at 23.00.19.png" description="4 Bedroom Family Villa for Sale in Dubai Hills" location="Dubai Hills, Dubai" price={900} rating={4.88} time="Night" />

            <PropertyCard title="Luxury Duplex | DIFC" image="../../public/Screenshot 2024-10-03 at 23.00.32.png" description="3 Bedroom Duplex for Rent in DIFC" location="DIFC, Dubai" price={500} rating={4.82} time="Night" />

            <PropertyCard title="Serene Villa | Meadows" image="../../public/Screenshot 2024-10-03 at 23.00.47.png" description="4 Bedroom Villa for Sale in Meadows" location="Meadows, Dubai" price={1_000} rating={4.90} time="Day" />

            <PropertyCard title="Modern Studio | Dubai Design District" image="../../public/Screenshot 2024-10-03 at 23.01.22.png" description="1 Bedroom Studio for Rent in Dubai Design District" location="Dubai Design District, Dubai" price={160} rating={4.55} time="Night" />
        </div>
    )
}
