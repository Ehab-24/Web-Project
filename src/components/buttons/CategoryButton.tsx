import { ReactNode } from "react";

export default function CategoryButton({ isSelected, children }: { isSelected: boolean, children: ReactNode }) {
    return (
        <li>
            <button className={`w-max relative inline-flex items-center justify-center p-[1.5px] mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-pink-200 transition-all ${isSelected ? "from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400" : "from-gray-300 to-gray-300 hover:from-gray-500 hover:to-gray-600"}`}>
                <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-90">
                    {children}
                </span>
            </button>
        </li>
    )
}
