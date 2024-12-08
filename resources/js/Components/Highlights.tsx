import React from "react";
import ParallaxText from "./ParallaxText";

const Highlights = () => {
    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
                Our Highlights
            </h2>
            <div className="space-y-6">
                <ParallaxText
                    text="Innovative Design"
                    baseVelocity={-5}
                    className="text-gray-800 dark:text-gray-200"
                />
                <ParallaxText
                    text="Top Quality Products"
                    baseVelocity={5}
                    className="text-[#FF2D20]"
                />
            </div>
        </section>
    );
};

export default Highlights;
