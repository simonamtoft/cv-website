import React from 'react';
import ReDI_logo from '../assets/ReDI_logo.png';
import IDA_logo from '../assets/IDA_logo.jpg';

const volunteering = [
  {
    jobTitle: "Volunteer Teacher",
    companyName: "ReDI School of Digital Integration",
    start: "2023 Apr",
    end: "2023 Dec",
    text: <>
    As a volunteer at <a href="https://www.redi-school.org/" target="_blank" rel="noopener noreferrer">ReDI School of Digital Integration</a>, 
    I taught the Data Analytics with Python track, where I was part of developing the curriculum and learning materials. Separately, I provided
    one-on-one mentorship to a student on career strategies for the tech industry.
    </>,
    icon: ReDI_logo
  }, {
    jobTitle: "Volunteer",
    companyName: "IDA",
    start: "2025 Jan",
    end: "Now",
    text: <>
    Voted in as an alternate member of the Board of Representatives at <a href="https://ida.dk/english" target="_blank" rel="noopener noreferrer">IDA</a>,
    and part of organizing the <a href="https://ida.dk/driving-ai" target="_blank" rel="noopener noreferrer">Driving AI</a> and <a href="https://ida.dk/driving-it" target="_blank"rel="noopener noreferrer">Driving IT</a> conferences
    within <a href='https://english.ida.dk/ida-it' target="_blank" rel="noopener noreferrer">IDA IT</a>.
    </>,
    icon: IDA_logo
  }
];

export default volunteering;