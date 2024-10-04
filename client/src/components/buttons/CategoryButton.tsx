import { ReactNode } from "react";

export default function CategoryButton({ isSelected, onClick, children }: { isSelected: boolean, onClick: () => void, children: ReactNode }) {
    return (
        <li>
            <button onClick={onClick} className={`whitespace-nowrap rounded-md py-1.5 px-2.5 border border-transparent text-center text-sm transition-all border-slate-300 hover:border-slate-700 border-[1.5px] border-white focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:text-slate-700 hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${isSelected ? "bg-slate-800 text-white": "bg-white text-slate-800"}`} type="button">
                {children}
            </button>
        </li>
    )
}
