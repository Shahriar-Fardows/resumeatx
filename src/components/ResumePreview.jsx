import { useState, useEffect } from 'react'
// ferduse apu arek biye korbe 
const templates = {
  modern: {
    containerClass: 'font-sans text-sm bg-white',
    headerClass: 'mb-6',
    sectionClass: 'mb-4',
    sectionTitleClass: 'text-lg font-bold mb-2 border-b border-gray-300 pb-1',
    listClass: 'list-disc list-inside',
  },
  creative: {
    containerClass: 'font-sans text-sm bg-gray-100',
    headerClass: 'mb-6 bg-blue-600 text-white p-4 rounded',
    sectionClass: 'mb-4 bg-white p-4 rounded shadow',
    sectionTitleClass: 'text-lg font-bold mb-2 text-blue-600',
    listClass: 'list-none space-y-1',
  },
  classic: {
    containerClass: 'font-serif text-sm bg-white',
    headerClass: 'mb-6 text-center',
    sectionClass: 'mb-4',
    sectionTitleClass: 'text-lg font-bold mb-2 uppercase',
    listClass: 'list-disc list-inside',
  },
}

export default function ResumePreview({ data, template }) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates.modern)

  useEffect(() => {
    setSelectedTemplate(templates[template])
  }, [template])

  const { containerClass, headerClass, sectionClass, sectionTitleClass, listClass } = selectedTemplate

  return (
    <div className={`${containerClass} p-8`}>
      <header className={headerClass}>
        <h1 className="text-2xl font-bold">{data.contactInfo.name}</h1>
        <p>{data.contactInfo.phone} | {data.contactInfo.email}</p>
        <p>{data.contactInfo.address}</p>
        {data.contactInfo.portfolio && <p>Portfolio: {data.contactInfo.portfolio}</p>}
        {data.contactInfo.linkedin && <p>LinkedIn: {data.contactInfo.linkedin}</p>}
      </header>

      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Professional Summary</h2>
        <p>{data.professionalSummary}</p>
      </section>

      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Skills</h2>
        <div>
          <h3 className="font-semibold">Technical Skills:</h3>
          <ul className={listClass}>
            {Array.isArray(data.skills.technical)
              ? data.skills.technical.map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                ))
              : typeof data.skills.technical === 'string'
              ? data.skills.technical.split(',').map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                ))
              : null}
          </ul>
        </div>
        {data.skills.soft && (
          <div className="mt-2">
            <h3 className="font-semibold">Soft Skills:</h3>
            <ul className={listClass}>
              {Array.isArray(data.skills.soft)
                ? data.skills.soft.map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))
                : typeof data.skills.soft === 'string'
                ? data.skills.soft.split(',').map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </section>

      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Work Experience</h2>
        {data.workExperience.map((job, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-semibold">{job.title}</h3>
            <p>{job.company} | {job.duration}</p>
            <ul className={listClass}>
              {job.responsibilities.split('\n').map((responsibility, index) => (
                <li key={index}>{responsibility.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p>{edu.institution} | {edu.duration}</p>
          </div>
        ))}
      </section>

      {data.certifications.length > 0 && (
        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Certifications</h2>
          <ul className={listClass}>
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert.name} - {cert.issuer} ({cert.date})</li>
            ))}
          </ul>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p>Technologies: {project.technologies}</p>
              {project.link && <p>Link: <a href={project.link} className="text-blue-600 hover:underline">{project.link}</a></p>}
            </div>
          ))}
        </section>
      )}

      {data.languages.length > 0 && (
        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Languages</h2>
          <ul className={listClass}>
            {data.languages.map((lang, index) => (
              <li key={index}>{lang.language} - {lang.proficiency}</li>
            ))}
          </ul>
        </section>
      )}

      {data.awards.length > 0 && (
        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Awards & Achievements</h2>
          <ul className={listClass}>
            {data.awards.map((award, index) => (
              <li key={index}>{award.name} - {award.issuer} ({award.date})</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

