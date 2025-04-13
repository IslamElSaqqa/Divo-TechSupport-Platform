import React from "react";
import Carousel from "../components/Home_Components/Animation Panel/Carousel";
import FlashSales from "../components/Home_Components/Flash Sales/FlashSales";
import MaintenanceStores from "../components/Home_Components/MaintenanceStores/MaintenanceStores";

function Home() {
    return (
        <div className="App">
            <Carousel />
            <br></br>
            <br></br>
            <FlashSales />
            <MaintenanceStores />
        </div>
);
}
export default Home;