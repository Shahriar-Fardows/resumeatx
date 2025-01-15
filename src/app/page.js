'use client'

import { useState } from 'react'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import { Button } from '../components/ui/button'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const initialResumeData = {
  contactInfo: { name: '', phone: '', email: '', address: '', portfolio: '', linkedin: '' },
  professionalSummary: '',
  skills: { technical: [], soft: [] },
  workExperience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  awards: []
}

export default function Home() {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  const handleFormSubmit = (data) => {
    setResumeData(data)
  }

  const generatePDF = async () => {
    const content = document.getElementById('resume-preview');
  
    // Temporarily remove shadow and border styles
    const originalStyle = content.style.cssText;
    content.style.boxShadow = 'none';
    content.style.border = 'none';
  
    const canvas = await html2canvas(content, {
      scale: 2, // Increase resolution
      backgroundColor: null, // Transparent background
    });
  
    // Restore original styles
    content.style.cssText = originalStyle;
  
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      unit: 'px',
      format: 'a4',
      orientation: 'portrait'
    });
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
  
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('resume.pdf');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">ATS-Friendly Resume Maker</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <ResumeForm onSubmit={handleFormSubmit} initialData={resumeData} setSelectedTemplate={setSelectedTemplate} />
        </div>
        <div className="w-full lg:w-1/2">
          <div id="resume-preview" className="bg-white p-8 rounded-lg shadow-lg">
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </div>
          <Button onClick={generatePDF} className="mt-4 w-full">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

