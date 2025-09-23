import AdmissionBanner from '@/components/admission-components/admissionBanner';
import AdmissionProcess from '@/components/admission-components/admissionProcess';
import React from 'react';

const AdmissionPage = () => {
    return (
        <div>
            <AdmissionBanner/>
            <AdmissionProcess/>
        </div>
    );
};

export default AdmissionPage;