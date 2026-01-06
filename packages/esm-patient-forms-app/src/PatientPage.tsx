// // PatientPage.tsx
// import React, { useState, useEffect } from 'react';
// import ClinicalFormActionButton from './../src/clinical-form-action-button.component';

// type Patient = {
//   uuid: string;
//   display: string;
// };

// const mockPatients: Patient[] = [
//   { uuid: '8a848905-207f-40f6-97e9-532099cc32a5', display: 'John Doe' },
//   { uuid: 'b1c2d3e4-f5a6-7890-1234-abcdef123456', display: 'Jane Smith' },
// ];

// const PatientPage = () => {
//   const [selectedPatientUuid, setSelectedPatientUuid] = useState<string | null>(null);

//   // Auto-select the first patient on mount
//   useEffect(() => {
//     if (mockPatients.length > 0) {
//       setSelectedPatientUuid(mockPatients[0].uuid);
//       console.log('Auto-selected patient:', mockPatients[0]);
//     }
//   }, []);

//   const onPatientClick = (patient: Patient) => {
//     console.log('Patient clicked:', patient);
//     setSelectedPatientUuid(patient.uuid);
//   };

//   return (
//     <div>
//       <h2>Patient List</h2>
//       <ul>
//         {mockPatients.map((patient) => (
//           <li key={patient.uuid}>
//             <button onClick={() => onPatientClick(patient)}>
//               {patient.display}
//             </button>
//           </li>
//         ))}
//       </ul>

//       <h2>Clinical Form Action</h2>
//       <ClinicalFormActionButton patientUuid={selectedPatientUuid} />
//     </div>
//   );
// };

// export default PatientPage;
