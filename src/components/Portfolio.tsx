import { FaHtml5, FaCss3, FaSass, FaPython, FaPhp, FaJava } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { DiJavascript } from 'react-icons/di';
import { VscTerminalPowershell } from 'react-icons/vsc';
import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.scss';
import { languagesAtom, portfolioAtom } from '../store/state';
import { useAtom } from 'jotai';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useAtom(portfolioAtom);
  const [langs, setLangs] = useAtom(languagesAtom);
  

  let isFetched = false;
  async function fetchPortfolio() {
    isFetched = true;

    const response = await fetch('https://api.sachadvr.fr/repos', {
      headers: {
        'User-Agent': 'request',
      },
    });
    const data = await response.json();

    const languages = await Promise.all(
      data.map(async (item: any) => {
        const response = await fetch(`https://api.sachadvr.fr/repos/${item.name}/languages`, {
          headers: {
            'User-Agent': 'request',
          },
        });
        const data = await response.json();
        return data;
      })
    );
    const getAllLangs: string[] = [];
    languages.map((language: any) => {
        getAllLangs.push(...Object.keys(language));
    });
    setLangs([...langs, ...new Set(getAllLangs)]);

    const port = data.map((item: any, index: number) => {
      return {
        ...item,
        languages: languages[index],
      };
    });
    setPortfolio(port);
  }

  React.useEffect(() => {
    if (isFetched) return;
    fetchPortfolio();
  }, []);

  return (
    <div className="content portfolio">
      <section id="portfolio" className="boxcontainer">
        <h1 className="section-title">Portfolio</h1>
        <div className="portfolio-box">
          {portfolio.length > 0 ?
            portfolio.map((project) => (
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: document.documentElement.scrollTop + document.querySelector('.portfolio-box')!.getBoundingClientRect().top - 120,
                    behavior: 'smooth',
                  });
                }}
                className="project-box no-grid noimage"
                key={project?.name}
                to={`/git/${project?.name}`}
              >
                {project?.description != null ? <div className="project-description"> {project?.description} </div> : ''}

                <div className="project-bio">
                  <h1 className="project-name">{project?.name.toUpperCase()}</h1>
                  <h3 className="project-desc">
                    <div className="langs flex gap-3 items-center">
                      {Object.keys(project?.languages).map((language) => {
                        if (language === 'HTML') {
                          return <FaHtml5 key={language} />;
                        } else if (language === 'CSS') {
                          return <FaCss3 key={language} />;
                        } else if (language === 'SCSS') {
                          return <FaSass key={language} />;
                        } else if (language === 'JavaScript') {
                          return <DiJavascript key={language} />;
                        } else if (language === 'TypeScript') {
                          return <SiTypescript key={language} />;
                        } else if (language === 'PHP') {
                          return <FaPhp key={language} />;
                        } else if (language === 'Python') {
                          return <FaPython key={language} />;
                        } else if (language === 'Java') {
                          return <FaJava key={language} />;
                        } else if (language === 'Shell') {
                          return <VscTerminalPowershell key={language} />;
                        } else {
                          return <span key={language}>{language}</span>;
                        }
                      })}
                    </div>
                  </h3>
                </div>
              </Link>
            )) : 'Récupération des projets en cours...'}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;