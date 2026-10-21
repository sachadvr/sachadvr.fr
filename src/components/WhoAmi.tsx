import React from "react";
import { useAtom } from "jotai";
import { languagesAtom } from "../store/state";
import { FaReact, FaVuejs, FaHtml5, FaCss3, FaJava, FaPython, FaPhp, FaSass } from "react-icons/fa";
import { DiJavascript, DiDocker, DiTerminal } from "react-icons/di";
import { SiTypescript, SiSvelte, SiSymfony } from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc";
import { HiOutlineCode } from "react-icons/hi";
import "./WhoAmi.scss";

const WhoAmi = () => {
  const [languagesElements, setLanguagesElements] = React.useState<React.ReactNode[]>([]);
  const [langs, setLangs] = useAtom(languagesAtom);

  React.useEffect(() => {
    const languagesElement: any = [];
    new Set(langs).forEach((language) => {
      console.log(language);
      switch (language) {
        case "JavaScript":
          languagesElement.push(<DiJavascript key={`javascript-${language}`} />);
          break;
        case "TypeScript":
          languagesElement.push(<SiTypescript key={`typescript-${language}`} />);
          break;
        case "Go":
          break;
        case "Dockerfile":
          languagesElement.push(<DiDocker key={`docker-${language}`} />);
          break;
        case "Makefile":
          break;
        case "Shell":
          languagesElement.push(<DiTerminal key={`terminal-${language}`} />);
          break;
        case "NSIS":
          break;
        case "Batchfile":
          break;
        case "EJS":
          break;
        case "Svelte":
          languagesElement.push(<SiSvelte key={`svelte-${language}`} />);
          break;
        case "HTML":
          languagesElement.push(<FaHtml5 key={`html-${language}`} />);
          break;
        case "CSS":
          languagesElement.push(<FaCss3 key={`css-${language}`} />);
          break;
        case "SCSS":
          languagesElement.push(<FaSass key={`sass-${language}`} />);
          break;
        case "PHP":
          languagesElement.push(<FaPhp key={`php-${language}`} />);
          break;
        case "Java":
          languagesElement.push(<FaJava key={`java-${language}`} />);
          break;
        case "Python":
          languagesElement.push(<FaPython key={`python-${language}`} />);
          break;
        case "React":
          languagesElement.push(<FaReact key={`react-${language}`} />);
          break;
        case "Vue":
          languagesElement.push(<FaVuejs key={`vue-${language}`} />);
          break;
        case "Symfony":
          languagesElement.push(<SiSymfony key={`symfony-${language}`} />);
          break;
        case "PowerShell":
          languagesElement.push(<VscTerminalPowershell key={`powershell-${language}`} />);
          break;
        case "Hack":
          languagesElement.push(<HiOutlineCode key={`hack-${language}`} />);
          break;
        default:
          languagesElement.push(<span key={`default-${language}`}>{language}</span>);
      }
    });

    setLanguagesElements(languagesElement);
  }, [setLangs, langs]);

  return (
    <div className="content whoami">
      <section id="whoami">
      <div>
            <h2>Qui suis-je ?</h2>

            <blockquote>
              <p>
                <strong>
                  Master Cyber (dev et sécurité), major de promo
                </strong>&nbsp;à l&apos;Université catholique de Lille, je suis un développeur
                passionné par les nouvelles technologies.
                J&apos;ai acquis de l&apos;expérience par le biais de projets personnels et professionnels qui me servent de terrain de jeu pour
                apprendre et me perfectionner.
              </p>
            </blockquote>
          </div>
          <div>
            <h2>Mon parcours</h2>
            <blockquote>
                <p>Actuellement en
                alternance chez <b>Alice&apos;s Garden</b> en tant que <u>Développeur fullstack</u>,
                j&apos;ai eu l&apos;opportunité de travailler sur divers aspects du développement,
                 allant du front-end au back-end, ainsi que sur des tâches de devops. 
                 <br/><br/>Passionné par l&apos;innovation, je m&apos;intéresse particulièrement à 
                 l&apos;intelligence artificielle et au machine learning, et bien évidemment au développement web - domaines dans lesquels je 
                 cherche constamment à approfondir mes connaissances.</p>
                </blockquote>
            

          </div>
          <div>
        <h2>Mes Technologies</h2>
        <div className={`mx-auto w-fit grid gap-3 items-center p-2 place-items-center grid-flow-col grid-rows-2 ${languagesElements.length > 0 ? 'border' : ''}`}>
          {languagesElements.length > 0 ? languagesElements.map((lang: any) => lang) : "En cours de chargement..."}
        </div>
        </div>
      </section>
    </div>
  );
};

export default WhoAmi;
