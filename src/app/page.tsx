"use client";

import HomePageHeader from "@/components/HomePageHeader";
import HomePageDrink from "@/components/HomePageDrink";
import HomePageNavBar from "@/components/HomePageNavBar";
import { useRef as reactUseRef, useEffect, useRef, useState } from "react";

const sampleDrinks = [
  {
    id: 1,
    name: "Espresso",
    description: "Strong and bold coffee shot.",
    price: 2.5,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk.",
    price: 3.5,
  },
  {
    id: 3,
    name: "Latte",
    description: "Smooth espresso with creamy milk.",
    price: 3.0,
  },
  {
    id: 4,
    name: "Mocha",
    description: "Chocolatey espresso with steamed milk.",
    price: 4.0,
  },
  {
    id: 5,
    name: "Americano",
    description: "Espresso with hot water.",
    price: 2.0,
  },
  {
    id: 6,
    name: "Macchiato",
    description: "Espresso with a dollop of foam.",
    price: 2.5,
  },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState("");

  const sectionRefs = {
    "most-popular": useRef(null),
    "hot-drink": useRef(null),
    "cold-drink": useRef(null),
    "alcoholic": useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { 
        root: null,
        rootMargin: '-20% 0px -50% 0px', //odi se igrat s namistanjem
        threshold: 0.1,
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
     <HomePageHeader />

     <HomePageNavBar currentSection={currentSection} />

     <main className="flex flex-col items-center justify-center mt-25 gap-5">
      {/* Najpopularnije Section */}
      <section id="most-popular"  ref={sectionRefs["most-popular"]} className="size-auto mb-12 scroll-mt-20">
          <h1 className="text-4xl font-bold text-center mb-8">Najpopularnije</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDrinks.map((mostPopularDrink) => (
              <HomePageDrink
                key={mostPopularDrink.id}
                name={mostPopularDrink.name}
                description={mostPopularDrink.description}
                price={mostPopularDrink.price}
              />
            ))}
          </div>
        </section>

        {/* Topli Napitci Section */}
        <section  id="hot-drink" ref={sectionRefs["hot-drink"]}  className="size-auto mb-12 scroll-mt-20">
          <h1 className="text-4xl font-bold text-center mb-8">Topli Napitci</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDrinks.map((hotDrink) => (
              <HomePageDrink
                key={hotDrink.id}
                name={hotDrink.name}
                description={hotDrink.description}
                price={hotDrink.price}
              />
            ))}
          </div>
        </section>

        {/* Hladni Napitci Section */}
        <section id="cold-drink" ref={sectionRefs["cold-drink"]} className="size-auto mb-12 scroll-mt-20">
          <h1 className="text-4xl font-bold text-center mb-8">Hladni Napitci</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDrinks.map((coldDrink) => (
              <HomePageDrink
                key={coldDrink.id}
                name={coldDrink.name}
                description={coldDrink.description}
                price={coldDrink.price}
              />
            ))}
          </div>
        </section>

        {/* Alkoholna Pica Section */}
        <section  id="alcoholic" ref={sectionRefs["alcoholic"]} className="size-auto mb-12 scroll-mt-20">
          <h1 className="text-4xl font-bold text-center mb-8">Alkoholna Pica</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDrinks.map((alcoholicDrink) => (
              <HomePageDrink
                key={alcoholicDrink.id}
                name={alcoholicDrink.name}
                description={alcoholicDrink.description}
                price={alcoholicDrink.price} //odi dodat da se salje valjda i slika(i u HomePageDrink da se prima sliku)
              />
            ))}
          </div>
        </section>
     </main>
    </div>  
  );
}
// malo uredi dizajnerski da lipse izgleda(nac neku paletu boja i toga se drzat)
//triba ustimat ovaj scroll da navbar ne oznaci nadolzeci section pre brzo(vecinski problem kad scrollas od dolje prema gore)
//sirina nek bude mask 1440 stranice
//responzivnost(do 320)
//footer

