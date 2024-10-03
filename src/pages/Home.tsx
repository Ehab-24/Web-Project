import Categories from "../components/Categories";
import Searchbar from "../components/Searchbar";

function HomePage() {
    return (
        <div className="flex px-4 md:px-8 flex-col text-5xl font-bold">

            <Searchbar className="self-center my-12" />

            <Categories />

            Home Page
        </div>
    )
}

export default HomePage;
