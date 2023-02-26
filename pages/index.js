import { useState, useEffect } from "react";
import { inventory } from "/data/inventory";
import Head from "next/head";
import Logo from "@/components/logo";

export default function Home() {
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [showHoodieImage, setShowHoodieImage] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let filteredItems = inventory.clothing;
    if (selectedSex && selectedSex !== "All") {
      filteredItems = filteredItems.filter((item) => item.sex === selectedSex);
    }
    if (selectedCategory !== "All") {
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }
    setItems(filteredItems);
  }, [selectedSex, selectedCategory]);

  const handleHoodieButtonClick = () => {
    setSelectedCategory("Hoodies");
    setShowHoodieImage(true);
  };

  const handleHoodieClick = (image) => {
    setShowHoodieImage(true);
    setItems([{ ...items[0], image }]);
  };

  const categories = selectedSex === "Unisex"
    ? ["All", "Hoodies", "Jackets", "HeadGear"]
    : ["All", "Hoodies", "Jackets"];

  return (
    <>
      <Head>
        <title>Geared Up Online Store | BCITSA</title>
        <meta name="description" content="Assignment02" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>BCITSA Geared Up</h1>
        <div>
          <button onClick={() => setSelectedSex("Male")}>Male</button>
          <button onClick={() => setSelectedSex("Female")}>Female</button>
          <button onClick={() => setSelectedSex("Unisex")}>Unisex</button>
        </div>
        {selectedSex && (
          <div>
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)}>{category}</button>
            ))}
          </div>
        )}
        <div>
          {items.map((item) => (
            <div key={item.title}>
              {selectedSex === "Male" && selectedCategory === "Hoodies" && item.category === "Hoodies" && (
                <div>
                  <h2>{item.title}</h2>
                  {showHoodieImage ? (
                    <img
                      src={item.image}
                    />
                  ) : (
                    <img src={item.image} />
                  )}
                  <p>Category: {item.category}</p>
                  <p>Sex: {item.sex}</p>
                  <p>Colours: {item.colours.join(", ")}</p>
                  <p>Cost: ${item.cost.toFixed(2)}</p>
                </div>
              )}
              {selectedSex === "Male" && selectedCategory === "Jackets" && item.category === "Jackets" && (
                <div>
                  <h2>{item.title}</h2>
                  <img src={item.image} alt={item.title} />
                  <p>Category: {item.category}</p>
                  <p>Sex: {item.sex}</p>
                  <p>Colours: {item.colours.join(", ")}</p>
                  <p>Cost: ${item.cost.toFixed(2)}</p>
                </div>
              )}
              {selectedSex === "Male" && selectedCategory === "Headgear" && item.category === "Headgear" && (
                <div>
                  <h2>{item.title}</h2>
                  <img src={item.image} alt={item.title} />
                  <p>Category: {item.category}</p>
                  <p>Sex: {item.sex}</p>
                  <p>Colours: {item.colours.join(", ")}</p>
                  <p>Cost: ${item.cost.toFixed(2)}</p>
                </div>
              )}
              {(selectedSex !== "Male" || (selectedSex === "Male" && selectedCategory === "All")) && (
                <div>
                  <h2>{item.title}</h2>
                  <img src={item.image} alt={item.title} />
                  <p>Category: {item.category}</p>
                  <p>Sex: {item.sex}</p>
                  <p>Colours: {item.colours.join(", ")}</p>
                  <p>Cost: ${item.cost.toFixed(2)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>

  );
}