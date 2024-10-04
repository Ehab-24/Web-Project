import { useEffect, useState } from "react";
import CategoryButton from "./buttons/CategoryButton";
import { fetchCategories } from "../api";

export default function Categories() {

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        fetchCategories().then((cs) => {
            if (cs) {
                setCategories(cs)
            }
        })
    }, [])

    return (
        <div className="relative">

            <ul className="flex gap-2 overflow-y-auto scrollbar-hide">

                <li>
                    <div className="w-12" />
                </li>

                {
                    categories.map(c => (
                        <CategoryButton key={c} onClick={() => setSelectedCategory(c)} isSelected={selectedCategory == c}>
                            {c}
                        </CategoryButton>
                    ))
                }

                <li>
                    <div className="w-12" />
                </li>
            </ul>

            <div className="hidden md:block md:absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent" />
            <div className="hidden md:block md:absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent" />

        </div>
    )
}
