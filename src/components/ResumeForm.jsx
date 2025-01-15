'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select } from './ui/select'

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
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <Input {...register('contactInfo.name')} placeholder="Name" />
            <Input {...register('contactInfo.phone')} placeholder="Phone" />
            <Input {...register('contactInfo.email')} type="email" placeholder="Email" />
            <Input {...register('contactInfo.address')} placeholder="Address" />
            <Input {...register('contactInfo.portfolio')} placeholder="Portfolio URL" />
            <Input {...register('contactInfo.linkedin')} placeholder="LinkedIn URL" />
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
            <Textarea {...register('professionalSummary')} placeholder="Write a brief summary of your skills and goals" />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <Textarea {...register('skills.technical')} placeholder="Technical skills (comma-separated)" />
            <Textarea {...register('skills.soft')} placeholder="Soft skills (comma-separated)" />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            {workFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded space-y-2">
                <Input {...register(`workExperience.${index}.title`)} placeholder="Job Title" />
                <Input {...register(`workExperience.${index}.company`)} placeholder="Company" />
                <Input {...register(`workExperience.${index}.duration`)} placeholder="Duration" />
                <Textarea {...register(`workExperience.${index}.responsibilities`)} placeholder="Responsibilities" />
                <Button type="button" onClick={() => removeWork(index)} variant="destructive">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendWork({ title: '', company: '', duration: '', responsibilities: '' })}>
              Add Work Experience
            </Button>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {educationFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded space-y-2">
                <Input {...register(`education.${index}.degree`)} placeholder="Degree" />
                <Input {...register(`education.${index}.institution`)} placeholder="Institution" />
                <Input {...register(`education.${index}.duration`)} placeholder="Duration" />
                <Button type="button" onClick={() => removeEducation(index)} variant="destructive">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendEducation({ degree: '', institution: '', duration: '' })}>
              Add Education
            </Button>
          </div>
        )
      case 5:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Certifications</h2>
              {certificationFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded space-y-2">
                  <Input {...register(`certifications.${index}.name`)} placeholder="Certification Name" />
                  <Input {...register(`certifications.${index}.issuer`)} placeholder="Issuer" />
                  <Input {...register(`certifications.${index}.date`)} placeholder="Date" />
                  <Button type="button" onClick={() => removeCertification(index)} variant="destructive">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendCertification({ name: '', issuer: '', date: '' })}>
                Add Certification
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              {projectFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded space-y-2">
                  <Input {...register(`projects.${index}.name`)} placeholder="Project Name" />
                  <Textarea {...register(`projects.${index}.description`)} placeholder="Description" />
                  <Input {...register(`projects.${index}.technologies`)} placeholder="Technologies Used" />
                  <Input {...register(`projects.${index}.link`)} placeholder="Project Link" />
                  <Button type="button" onClick={() => removeProject(index)} variant="destructive">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendProject({ name: '', description: '', technologies: '', link: '' })}>
                Add Project
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Languages</h2>
              {languageFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded space-y-2">
                  <Input {...register(`languages.${index}.language`)} placeholder="Language" />
                  <Input {...register(`languages.${index}.proficiency`)} placeholder="Proficiency" />
                  <Button type="button" onClick={() => removeLanguage(index)} variant="destructive">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendLanguage({ language: '', proficiency: '' })}>
                Add Language
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Awards & Achievements</h2>
              {awardFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded space-y-2">
                  <Input {...register(`awards.${index}.name`)} placeholder="Award Name" />
                  <Input {...register(`awards.${index}.issuer`)} placeholder="Issuer" />
                  <Input {...register(`awards.${index}.date`)} placeholder="Date" />
                  <Button type="button" onClick={() => removeAward(index)} variant="destructive">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendAward({ name: '', issuer: '', date: '' })}>
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
      {renderFormStep()}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button type="button" onClick={prevStep}>
            Previous
          </Button>
        )}
        {currentStep < formSteps.length - 1 ? (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button type="submit">Update Preview</Button>
        )}
      </div>
      <div className="mt-6">
        <Label htmlFor="template">Select Template</Label>
        <Select
          id="template"
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="mt-1"
        >
          <option value="modern">Modern Minimalist</option>
          <option value="creative">Creative Professional</option>
          <option value="classic">Classic Formal</option>
        </Select>
      </div>
    </form>
  )
}

