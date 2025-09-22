import React from 'react';

const TestimonialsCard = ({ children }) => {
    return (
        <div className="max-w-sm mx-auto bg-muted dark:bg-muted rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center
                p-4 sm:p-6 md:p-8 border border-r-4 border-b-4 border-popover dark:border-popover">
              {children}
        </div>
    );
};

export default TestimonialsCard;