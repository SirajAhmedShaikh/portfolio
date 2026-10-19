import React from 'react';
import { skillCategories } from '../data/skills';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-container" aria-labelledby="skills-title">
      <div className="section-header">
        <span className="section-tag">Capabilities &amp; Growth</span>
        <h2 id="skills-title" className="section-title">
          Technical Stack &amp; Learning Roadmap
        </h2>
        <p className="section-subtitle">
          Transparent skill indicators: items labeled <strong>Using</strong> are deployed in active builds,
          while <strong>Learning</strong> items represent active deep study areas.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-category-card glass-card">
            <div className="category-header">
              <h3 className="category-title">{category.title}</h3>
              <p className="category-desc">{category.description}</p>
            </div>

            <div className="skills-badge-wrap">
              {category.skills.map((skill, sIdx) => {
                const isLearning = skill.level === 'Learning';
                return (
                  <span
                    key={sIdx}
                    className={`skill-badge ${isLearning ? 'skill-badge-learning' : 'skill-badge-using'}`}
                    title={`${skill.name} - ${skill.level}`}
                  >
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level-indicator" aria-label={`Status: ${skill.level}`}>
                      {skill.level}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
