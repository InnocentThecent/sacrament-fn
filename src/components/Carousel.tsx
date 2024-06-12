import { useState } from "react";

const sacraments = [
  {
    id: 0,
    name: "Eucharist",
    description:
      "The Eucharist is a Christian rite that is considered a sacrament in most churches, and as an ordinance in others.",
  },
  {
    id: 1,
    name: "Baptism",
    description:
      "Baptism is a Christian rite of admission and adoption, almost invariably with the use of water, into Christianity.",
  },
  {
    id: 2,
    name: "Confirmation",
    description:
      "Confirmation is a rite of initiation in Christian churches, normally carried out through anointing, the laying on of hands, and prayer for the Holy Spirit.",
  },
  {
    id: 3,
    name: "Reconciliation",
    description:
      "The Sacrament of Penance and Reconciliation is one of the seven sacraments of the Catholic Church, in which the faithful are absolved from sins committed after Baptism and they are reconciled with the Christian community.",
  },
  {
    id: 4,
    name: "Anointing of the Sick",
    description:
      'Anointing of the Sick is a sacrament of the Catholic Church that is administered to a Catholic "who, having reached the age of reason, begins to be in danger due to sickness or old age".',
  },
  {
    id: 5,
    name: "Marriage",
    description:
      "The Sacrament of Marriage, also known as Holy Matrimony, is a Catholic Church ceremony in which",
  },
  {
    id: 6,
    name: "Ordination",
    description:
      "Ordination, or Holy Orders, is a sacrament that is available only to men who are being ordained as deacons, priests, or bishops. As with Baptism and Confirmation, the sacrament is said to convey a special indelible “character” on the soul of the recipient..",
  },
];

const SacramentsCarousel = () => {
  const [currentSacrament, setCurrentSacrament] = useState(0);

  return (
    <div className=" h-1/4">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-900 mt-2">
          Sacraments
        </h1>
        <h2 className="text-4xl font-extralight italic text-center tracking-tight text-gray-900">
          {sacraments[currentSacrament].name}
        </h2>
       
        <blockquote className="mt-10">
          <p className="text-2xl leading-9 font-medium text-center text-gray-900">
            “{sacraments[currentSacrament].description}”
          </p>
        </blockquote>
        <div className="flex justify-center space-x-1 mt-8">
          {sacraments.map((review, i) => {
            return (
              <span
                onClick={() => setCurrentSacrament(i)}
                key={i}
                className={`block cursor-pointer h-3 w-3 p-2 rounded-full ${
                  currentSacrament == review.id ? "bg-gray-900" : "bg-gray-300"
                } `}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SacramentsCarousel;
