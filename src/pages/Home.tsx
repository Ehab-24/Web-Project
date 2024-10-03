import Categories from "../components/Categories";
import PropertyListing from "../components/PropertyListing";
import Searchbar from "../components/Searchbar";
import H2 from "../components/typography/H2";

function HomePage() {
    return (
        <div className="flex px-4 md:px-12 flex-col mb-20">

            <Searchbar className="self-center mb-20 mt-12" />

            <Categories />

            <H2>Properties</H2>
            <PropertyListing />
        </div>
    )
}

export default HomePage;
