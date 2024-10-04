import Button from "../buttons/Button";

type Props = {
    title: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    time: 'Day' | 'Night' | 'Any';
    image: string;
}

export default function PropertyCard({ title, description, location, price, rating, time, image }: Props) {
    return (
        <div className="w-full h-max rounded-lg shadow-2xl shadow-black/10 flex flex-col overflow-hidden">

            <img
                src={image}
                alt={title}
                className="w-full aspect-[5/3] object-cover"
            />

            <div className="flex justify-between w-full px-4 mt-6">
                <div className="flex flex-col">
                    <h3 className="text-xl font-medium text-gray-900 leading-relaxed">
                        {title}
                    </h3>
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed tracking-wide">{description}</p>
                    <p className="text-sm text-gray-500 leading-relaxed tracking-wide">{location}</p>
                </div>

                <div className="flex items-center h-min gap-1 min-w-max">
                    <img
                        src="../../../public/star.svg"
                        alt="star"
                        className="w-4 h-4"
                    />
                    <p className="font-medium text-gray-900">{rating}</p>
                </div>
            </div>

            <div className="flex items-center w-full justify-between my-6 px-4">
                <p className="text-xl font-medium text-gray-900">
                    ${price}
                    <span className="text-sm text-gray-500 leading-relaxed tracking-wide"> / {time}</span>
                </p>

                <Button>
                    Book Now
                </Button>
            </div>

        </div>
    )
}
