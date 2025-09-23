import AdmissionBanner from '@/components/admission-components/admissionBanner';
import AdmissionProcess from '@/components/admission-components/admissionProcess';
import FeeStructure from '@/components/admission-components/feeStructure';
import React from 'react';

const AdmissionPage = () => {
    return (
        <div>
            <AdmissionBanner/>
            <AdmissionProcess/>
            <FeeStructure/>
        </div>
    );
};

export default AdmissionPage;