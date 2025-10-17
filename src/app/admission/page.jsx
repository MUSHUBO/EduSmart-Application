import AdmissionBanner from '@/components/admission-components/admissionBanner';
import AdmissionHero from '@/components/admission-components/admissionHero';
import AdmissionProcess from '@/components/admission-components/admissionProcess';
import FeeStructure from '@/components/admission-components/feeStructure';
import React from 'react';

const AdmissionPage = () => {
    return (
        <div className='mx-auto py-8 md:py-12 lg:py-16'>
            <AdmissionHero />
            <div className='w-11/12 mx-auto'>
{/* 
                <AdmissionBanner /> */}
                <AdmissionProcess />
                <FeeStructure />
            </div>
        </div>
    );
};

export default AdmissionPage;