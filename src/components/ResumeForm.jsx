'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Textarea } from './ui/textarea'


Button

const formSteps = [
  'Contact Information',
  'Professional Summary',
  'Skills',
  'Work Experience',
  'Education',
  'Additional Sections'
]

export default function ResumeForm({ onSubmit, initialData, setSelectedTemplate }) {
  const [currentStep, setCurrentStep] = useState(0)
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: initialData
  })

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: 'workExperience'
  })

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  })

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications'
  })

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  })

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'languages'
  })

  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control,
    name: 'awards'
  })

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Contact Information</h2>
            <Input {...register('contactInfo.name')} placeholder="Name" className="w-full" />
            <Input {...register('contactInfo.phone')} placeholder="Phone" className="w-full" />
            <Input {...register('contactInfo.email')} type="email" placeholder="Email" className="w-full" />
            <Input {...register('contactInfo.address')} placeholder="Address" className="w-full" />
            <Input {...register('contactInfo.portfolio')} placeholder="Portfolio URL" className="w-full" />
            <Input {...register('contactInfo.linkedin')} placeholder="LinkedIn URL" className="w-full" />
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Professional Summary</h2>
            <Textarea {...register('professionalSummary')} placeholder="Write a brief summary of your skills and goals" className="w-full h-32" />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Skills</h2>
            <Textarea {...register('skills.technical')} placeholder="Technical skills (comma-separated)" className="w-full h-24" />
            <Textarea {...register('skills.soft')} placeholder="Soft skills (comma-separated)" className="w-full h-24" />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Work Experience</h2>
            {workFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                <Input {...register(`workExperience.${index}.title`)} placeholder="Job Title" className="w-full" />
                <Input {...register(`workExperience.${index}.company`)} placeholder="Company" className="w-full" />
                <Input {...register(`workExperience.${index}.duration`)} placeholder="Duration" className="w-full" />
                <Textarea {...register(`workExperience.${index}.responsibilities`)} placeholder="Responsibilities" className="w-full h-24" />
                <Button type="button" onClick={() => removeWork(index)} className="bg-red-500 hover:bg-red-600 text-white">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendWork({ title: '', company: '', duration: '', responsibilities: '' })} className="w-full bg-green-500 hover:bg-green-600 text-white">
              Add Work Experience
            </Button>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Education</h2>
            {educationFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                <Input {...register(`education.${index}.degree`)} placeholder="Degree" className="w-full" />
                <Input {...register(`education.${index}.institution`)} placeholder="Institution" className="w-full" />
                <Input {...register(`education.${index}.duration`)} placeholder="Duration" className="w-full" />
                <Button type="button" onClick={() => removeEducation(index)} className="bg-red-500 hover:bg-red-600 text-white">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendEducation({ degree: '', institution: '', duration: '' })} className="w-full bg-green-500 hover:bg-green-600 text-white">
              Add Education
            </Button>
          </div>
        )
      case 5:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Certifications</h2>
              {certificationFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                  <Input {...register(`certifications.${index}.name`)} placeholder="Certification Name" className="w-full" />
                  <Input {...register(`certifications.${index}.issuer`)} placeholder="Issuer" className="w-full" />
                  <Input {...register(`certifications.${index}.date`)} placeholder="Date" className="w-full" />
                  <Button type="button" onClick={() => removeCertification(index)} className="bg-red-500 hover:bg-red-600 text-white">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendCertification({ name: '', issuer: '', date: '' })} className="w-full bg-green-500 hover:bg-green-600 text-white">
                Add Certification
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Projects</h2>
              {projectFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                  <Input {...register(`projects.${index}.name`)} placeholder="Project Name" className="w-full" />
                  <Textarea {...register(`projects.${index}.description`)} placeholder="Description" className="w-full h-24" />
                  <Input {...register(`projects.${index}.technologies`)} placeholder="Technologies Used" className="w-full" />
                  <Input {...register(`projects.${index}.link`)} placeholder="Project Link" className="w-full" />
                  <Button type="button" onClick={() => removeProject(index)} className="bg-red-500 hover:bg-red-600 text-white">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendProject({ name: '', description: '', technologies: '', link: '' })} className="w-full bg-green-500 hover:bg-green-600 text-white">
                Add Project
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Languages</h2>
              {languageFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                  <Input {...register(`languages.${index}.language`)} placeholder="Language" className="w-full" />
                  <Input {...register(`languages.${index}.proficiency`)} placeholder="Proficiency" className="w-full" />
                  <Button type="button" onClick={() => removeLanguage(index)} className="bg-red-500 hover:bg-red-600 text-white">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendLanguage({ language: '', proficiency: '' })} className="w-full bg-green-500 hover:bg-green-600 text-white">
                Add Language
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Awards & Achievements</h2>
              {awardFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                  <Input {...register(`awards.${index}.name`)} placeholder="Award Name" className="w-full" />
                  <Input {...register(`awards.${index}.issuer`)} placeholder="Issuer" className="w-full" />
                  <Input {...register(`awards.${index}.date`)} placeholder="Date" className="w-full" />
                  <Button type="button" onClick={() => removeAward(index)} className="bg-red-500 hover:bg-red-600 text-white">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendAward({ name: '', issuer: '', date: '' })} className="w-full bg-green-500 hover:bg-green-600 text-white">
                Add Award
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between mb-4">
        {formSteps.map((step, index) => (
          <button
            key={step}
            type="button"
            onClick={() => setCurrentStep(index)}
            className={`text-sm px-2 py-1 rounded ${
              currentStep === index
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step}
          </button>
        ))}
      </div>
      {renderFormStep()}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white">
            Previous
          </Button>
        )}
        {currentStep < formSteps.length - 1 ? (
          <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Next
          </Button>
        ) : (
          <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Update Preview</Button>
        )}
      </div>
      <div className="mt-6">
        <Label htmlFor="template" className="block text-sm font-medium text-gray-700">Select Template</Label>
        <Select
          id="template"
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="modern">Modern Minimalist</option>
          <option value="creative">Creative Professional</option>
          <option value="classic">Classic Formal</option>
        </Select>
      </div>
    </form>
  )
}

