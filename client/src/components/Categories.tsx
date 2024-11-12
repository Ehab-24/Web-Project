import { useEffect, useState } from "react";
import CategoryButton from "./buttons/CategoryButton";
import * as api from "../api";
import { propertyFiltersStore } from "../stores/propertyFilters";

export default function Categories() {

    const [categories, setCategories] = useState<string[]>([])
    const state = propertyFiltersStore();

    useEffect(() => {
        api.listingTypes().then((cs) => {
            if (cs) {
                setCategories(cs)
            }
        })
    }, [])

    function onClickCategory(category: string) {
        if (state.category == category) {
            state.setCategory("")
        } else {
            state.setCategory(category)
        }
    }

    return (
        <div className="relative">

            <ul className="flex gap-2 overflow-y-auto scrollbar-hide">

                <li>
                    <div className="w-12" />
                </li>

                {
                    categories.map(c => (
                        <CategoryButton key={c} onClick={() => onClickCategory(c)} isSelected={state.category == c}>
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
