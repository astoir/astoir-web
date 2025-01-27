import React, { useState, useEffect } from "react";

interface ProjectCardProps {
  imageUrl: string;
  projectAbstract: string;
  roles: string[];
  companyName: string;
  projectName: string;
  projectSlug: string;
  isLoading?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  projectAbstract,
  roles,
  companyName,
  projectName,
  projectSlug,
  isLoading = false,
}) => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <a
      href={`/projects/${projectSlug}`}
      className="block transform transition-all duration-300 hover:-translate-y-1"
    >
      <article className="relative h-full overflow-hidden rounded-2xl bg-skin-card shadow-lg">
        {loading ? (
          <div className="h-[250px] animate-pulse bg-gray-200 md:h-[300px] lg:h-[220px]" />
        ) : (
          <>
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={imageUrl}
                alt={projectName}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 lg:p-5">
              <p className="text-black-base mb-3 text-sm font-medium uppercase tracking-wider">
                {projectAbstract}
              </p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-skin-accent/10 px-2.5 py-0.5 text-xs font-medium text-skin-accent"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/60 to-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="p-4 text-center">
                <p
                  className="text-white-base mb-2 text-base font-medium lg:text-lg"
                  style={{ color: "#F2F2F5" }}
                >
                  {companyName}
                </p>
                <h3
                  className="text-white-base text-xl font-bold lg:text-2xl"
                  style={{ color: "#F5F5F7" }}
                >
                  {projectName}
                </h3>
              </div>
            </div>
          </>
        )}
      </article>
    </a>
  );
};

export default ProjectCard;
