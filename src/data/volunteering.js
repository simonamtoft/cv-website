import React from 'react';
import ReDI_logo from '../assets/ReDI_logo.png';
import IDA_logo from '../assets/IDA_logo.svg';
import IDA_AI_logo from '../assets/IDA_AI_logo.svg';

const volunteering = [
  {
    jobTitle: "Volunteer Teacher",
    companyName: "ReDI School of Digital Integration",
    start: "2023 Apr",
    end: "2023 Dec",
    text: <>
    Volunteered at <a href="https://www.redi-school.org/" target="_blank" rel="noopener noreferrer">ReDI School of Digital Integration</a>, teaching the Data Analytics with Python track and contributing to the curriculum and learning materials. Separately, I mentored a student one-on-one on career strategy in the tech industry.
    </>,
    icon: ReDI_logo
  }, {
    jobTitle: "Alternate Member, Board of Representatives",
    companyName: "IDA",
    start: "2025 Apr",
    end: "Now",
    text: <>
    Elected as an alternate member of the Board of Representatives at <a href="https://ida.dk/en" target="_blank" rel="noopener noreferrer">IDA</a> — Denmark's largest engineering association.
    </>,
    icon: IDA_logo
  }, {
    jobTitle: "Steering Committee Member",
    companyName: "IDA AI",
    start: "2025 Jan",
    end: "Now",
    text: <>
    Part of the team organising the <a href="https://ida.dk/driving-ai" target="_blank" rel="noopener noreferrer">Driving AI</a> and <a href="https://ida.dk/driving-it" target="_blank" rel="noopener noreferrer">Driving IT</a> conferences within <a href="https://ida.dk/faellesskaber-og-frivillige/faglige-faellesskaber/it-tele-og-elektronik/ida-it" target="_blank" rel="noopener noreferrer">IDA IT</a> since January 2025.
    In December 2025, I joined the Steering Committee of <a href="https://ida.dk/faellesskaber-og-frivillige/faglige-faellesskaber/it-tele-og-elektronik/ida-ai" target="_blank" rel="noopener noreferrer">IDA AI</a>.
    </>,
    icon: IDA_AI_logo
  }
];

export default volunteering;