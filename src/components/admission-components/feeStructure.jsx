import React from "react";

const FeeStructure = () => {
  const programs = [
    {
      program: "Nursery",
      age: "2 - 3 Years",
      tuition: "$1,686",
      registration: "$162",
      activity: "$12",
    },
    {
      program: "Pre - Kindergartens",
      age: "3 - 4 Years",
      tuition: "$2,686",
      registration: "$220",
      activity: "$16",
    },
    {
      program: "Kindergarten",
      age: "4 - 5 Years",
      tuition: "$3,686",
      registration: "$340",
      activity: "$20",
    },
  ];

  const services = [
    { name: "Before and After-School Care", fee: "$120 / per month" },
    { name: "Language Immersion Program", fee: "$60 / per semester" },
    { name: "Transportation (optional)", fee: "$80 / per month" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <span className="px-4 py-1 text-xs border rounded-sm border-foreground text-foreground">
            Our Features
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
            Fee Structure
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our fee structure is transparent, and we strive to keep our fees
            competitive within the education sector. The fees vary based on the
            program, age group, and any additional services chosen.
          </p>
        </div>

        {/* Programs Table */}
        <div className="mt-12 overflow-x-auto rounded-2xl border-2 border-primary shadow-md border-b-8 border-r-8 p-8">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-accent text-foreground dark:bg-muted">
                <th className="p-4 border border-primary text-left">Program</th>
                <th className="p-4 border border-primary text-left">Age Group</th>
                <th className="p-4 border border-primary text-left">Annual Tuition</th>
                <th className="p-4 border border-primary text-left">Registration Fee</th>
                <th className="p-4 border border-primary text-left">Activity Fee</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, idx) => (
                <tr key={idx} className="bg-card text-foreground">
                  <td className="p-4 border border-primary">{program.program}</td>
                  <td className="p-4 border border-primary">{program.age}</td>
                  <td className="p-4 border border-primary">{program.tuition}</td>
                  <td className="p-4 border border-primary">{program.registration}</td>
                  <td className="p-4 border border-primary">{program.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Services Table - Same Layout as Programs */}
        <div className="mt-12 overflow-x-auto rounded-2xl border-2 border-primary shadow-md border-b-8 border-r-8 p-8">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-accent text-foreground dark:bg-muted">
                <th className="p-4 border border-primary text-left">Service</th>
                <th className="p-4 border border-primary text-left">Fee</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr key={idx} className="bg-card">
                  <td className="p-4 border border-primary text-foreground">{service.name}</td>
                  <td className="p-4 border border-primary font-medium text-foreground">
                    {service.fee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeeStructure;
