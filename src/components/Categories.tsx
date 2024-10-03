import CategoryButton from "./buttons/CategoryButton";

export default function Categories() {
    return (
        <div className="relative">

            <ul className="flex gap-2 overflow-y-auto scrollbar-hide">

                <li>
                    <div className="w-12" />
                </li>

                <CategoryButton isSelected={false}>
                    Beachfront
                </CategoryButton>

                <CategoryButton isSelected={true}>
                    Luxury Villas
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Urban Apartments
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Family Homes
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Modern Lofts
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Trendy Studios
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Country Cabins
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Eco-Friendly Properties
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Penthouse Suites
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Historical Homes
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Waterfront Properties
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Gated Communities
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Golf Course Homes
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Affordable Rentals
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Furnished Apartments
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Investment Opportunities
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Newly Built
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Pet-Friendly Properties
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Seasonal Rentals
                </CategoryButton>

                <CategoryButton isSelected={false}>
                    Ski Resorts
                </CategoryButton>

                <li>
                    <div className="w-12" />
                </li>
            </ul>

            <div className="hidden md:block md:absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent" />
            <div className="hidden md:block md:absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent" />

        </div>
    )
}
