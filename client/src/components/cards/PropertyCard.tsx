import { Link, useNavigate } from "react-router-dom";
import Button from "../buttons/Button";

type Props = {
    id: number;
    title: string;
    description: string;
    location: string;
    price_per_night: number;
    rating: number;
    time: 'Day' | 'Night' | 'Any';
    images: string[];
}

export default function PropertyCard({ id, title, description, location, price_per_night, rating, time, images }: Props) {

    const navigate = useNavigate()
    
    return (
        <div className="w-full h-max rounded-lg shadow-2xl shadow-black/10 flex flex-col overflow-hidden">

            <Link to={`/listings/${id}`}>
            <img
                src={images[0]}
                alt={title}
                className="w-full aspect-[5/3] object-cover"
            />
            </Link>

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
                    ${price_per_night}
                    <span className="text-sm text-gray-500 leading-relaxed tracking-wide"> / {time}</span>
                </p>

                <Button onClick={() => navigate(`/book/${id}`)}>
                    Book Now
                </Button>
            </div>

        </div>
    )
}
