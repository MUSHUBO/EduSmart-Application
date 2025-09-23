const steps = [
    {
        number: "01",
        title: "Inquiry",
        description: "Submit an inquiry form through our website or contact our admissions office to express your interest in Little Learners Academy."
    },
    {
        number: "02",
        title: "School Tour",
        description: "Schedule a personalized school tour to explore our campus, meet our staff, and gain insights into our nurturing learning environment."
    },
    {
        number: "03",
        title: "Application Form",
        description: "Complete the application form and provide the required documents, including your child's birth certificate, medical records, and any previous academic records (if applicable)."
    },
    {
        number: "04",
        title: "Parent Interview",
        description: "We value parent engagement, and a meeting with our admissions team allows us to understand your child's needs and ensure Little Learners Academy aligns with your family's expectations"
    },
    {
        number: "05",
        title: "Student Assessment",
        description: "For certain age groups, a student assessment may be conducted to understand their developmental progress and ensure the best placement."
    },
    {
        number: "06",
        title: "Acceptance",
        description: "Once the admission process is complete, you will receive an official acceptance letter from Little Learners Academy."
    },
];

export default function AdmissionProcess() {
    return (
        <div className="py-16 bg-background">
            <div className="container mx-auto px-6 text-center">
                {/* Heading */}
                <span className="px-4 py-1 text-xs border rounded-sm border-foreground text-foreground">
                    Process
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
                    Admission Process
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Embark on a remarkable educational journey with us! Our Admission and
                    Enrollment process is the gateway to providing your child with an
                    exceptional learning experience at our kindergarten school.
                </p>

                {/* Steps Grid */}
                <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center h-full "
                        >
                            <div className="relative z-10 border-2 rounded-lg shadow-md px-6 py-3 font-bold text-2xl text-foreground border-b-4 border-r-4 border-primary  bg-muted dark:bg-muted">
                                {step.number}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2  border-primary  bg-background z-20"></div>
                            </div>
                            <div className="absolute top-12 h-12 w-1 bg-primary z-0 "></div>
                            <div className="mt-8 border-2 border-primary rounded-2xl shadow-md p-6 flex flex-col justify-between w-full max-w-sm text-center border-b-8 border-r-8 h-full  bg-muted dark:bg-muted">
                                <h3 className="text-lg md:text-xl font-bold text-foreground">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm text-muted-foreground flex-1">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
