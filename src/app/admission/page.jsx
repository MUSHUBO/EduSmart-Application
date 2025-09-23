import AdmissionBanner from '@/components/admission-components/admissionBanner';
import AdmissionProcess from '@/components/admission-components/admissionProcess';
import FeeStructure from '@/components/admission-components/feeStructure';
import React from 'react';

const AdmissionPage = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <AdmissionBanner/>
            <AdmissionProcess/>
            <FeeStructure/>
        </div>
    );
};

export default AdmissionPage;