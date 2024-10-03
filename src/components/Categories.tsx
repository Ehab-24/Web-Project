import CategoryButton from "./buttons/CategoryButton";

export default function Categories() {
    return (
        <div className="relative">

            <ul className="flex overflow-y-auto scrollbar-hide">
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={true}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
                <CategoryButton isSelected={false}>
                    Category
                </CategoryButton>
            </ul>

            <div className="hidden md:block md:absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent" />
            <div className="hidden md:block md:absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent" />

        </div>
    )
}
