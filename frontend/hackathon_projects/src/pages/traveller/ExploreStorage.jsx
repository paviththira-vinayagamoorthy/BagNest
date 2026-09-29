import storageData from "../../data/storageData";
import StorageCard from "../../components/StorageCard";

function ExploreStorage() {
  return (
    <div className="explore-page">
      <div className="container">

        {/* Page heading kaaga */}
        <h1 className="explore-title">
          Explore Storage
        </h1>

        {/* Page description kaaga */}
        <p className="explore-description">
          Find a safe place to store your luggage.
        </p>

        {/* Storage cards display panna */}
        <div className="row">

          {storageData.map((storage) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={storage.id}
            >
              <StorageCard storage={storage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ExploreStorage;