import React from 'react';
import ReDI_logo from '../assets/ReDI_logo.png';
import IDA_logo from '../assets/IDA_logo.jpg';

const volunteering = [
  {
    jobTitle: "Volunteer Teacher",
    companyName: "ReDI School of Digital Integration",
    endYear: "2023",
    startYear: "2023",
    text: <>
    I volunteered at <a href="https://www.redi-school.org/" target="_blank" rel="noopener noreferrer">ReDI School of Digital Integration</a>.
    In the fall semester, I coached an individual on programming and entering the job market. In the spring semester, I curated content and taught
    the data analytics with Python track.
    </>,
    icon: ReDI_logo
  }, {
    jobTitle: "Volunteer",
    companyName: "IDA",
    endYear: "Now",
    startYear: "2025",
    text: <>
    Voted in as an alternate member of the Board of Representatives at <a href="https://ida.dk/english" target="_blank" rel="noopener noreferrer">IDA</a>,
    and part of organizing the <a href="https://ida.dk/driving-ai" target="_blank" rel="noopener noreferrer">Driving AI</a> and 
    <a href="https://ida.dk/driving-it" target="_blank"rel="noopener noreferrer">Driving IT</a> conferences
    within <a href='https://english.ida.dk/ida-it' target="_blank" rel="noopener noreferrer">IDA IT</a>.
    </>,
    icon: IDA_logo
  }
];

export default volunteering;