import React from "react";
import { Link, useParams } from "react-router-dom";
import githublogo from "../../images/github-logo-vector.svg";
import "github-markdown-css/github-markdown-light.css";
import { marked } from "marked";
import { FaChevronCircleLeft } from "react-icons/fa";
import Header from "../../components/Header";
import WhoAmi from "../../components/WhoAmi";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import MarkdownViewer from "../../components/MarkdownViewver";

const Git = () => {
  const filteredContent = () => {
    let content = (
      <h1 className="text-sm">
        <Link to="/">
          <button className="flex items-center gap-1">
            <FaChevronCircleLeft /> Retour à la page d&apos;accueil
          </button>{" "}
        </Link>
        <br />
        Impossible de trouver le projet...
      </h1>
    );
    repo
      .filter((item: any) => {
        if (item.name === params.repoName) {
          return item;
        }
      })
      .map((item: any) => {
        content = (
          <div key={item.name}>
            <Link to="/">
              <h1 className="flex items-center gap-1 text-sm">
                <FaChevronCircleLeft />{" "}
                {item.name.charAt(0).toUpperCase() +
                  item.name.slice(1).toLowerCase()}
              </h1>{" "}
            </Link>
            <img src={githublogo} alt={item.name} className="w-24" />
            <div className="mb-3">
              <a
                className="underline"
                href="https://github.com/sachadvr?tab=repositories"
              >
                Repositories
              </a>
              /
              <a
                className="underline"
                href={`https://github.com/sachadvr/${item.name}`}
              >
                {item.name}
              </a>
            </div>
            <h1 className="border border-black w-fit p-3 mb-3">
              {item.description}
            </h1>
            Ouvrir le projet sur github :{" "}
            <a href={`https://github.com/sachadvr/${item.name}`}>
              <button className="bg-blue-100 p-1">{item.name}</button>
            </a>
            <iframe
              className=""
              src={`https://ghbtns.com/github-btn.html?user=sachadvr&repo=${item.name}&type=star&count=true`}
              frameBorder="0"
              scrolling="0"
              width="170px"
              height="20px"
            ></iframe>
            <div className="container max-w-none border border-black p-5 rounded-2xl markdown-body ">
              <MarkdownViewer markdown={readme} />
            </div>
          </div>
        );
      });
    return content;
  };
  const params = useParams();
  let isFetched = false;
  const [repo, setRepo] = React.useState<any>([]);
  const [readme, setReadme] = React.useState<any>([]);
  function fetchRepo() {
    isFetched = true;
    fetch(
      `https://raw.githubusercontent.com/sachadvr/${params.repoName}/master/README.md`
    )
      .then((res) => res.text())
      .then((data) => {
        if (data === "404: Not Found") {
          setReadme("Aucun README.md trouvé");
        } else {
          setReadme(data);
        }
      });

    fetch(`https://api.sachadvr.fr/repos`)
      .then((res) => res.json())
      .then((data) => {
        const repo = data.map((item: any) => {
          return {
            name: item.name,
            description: item.description,
          };
        });
        setRepo(repo);
      });
  }

  React.useEffect(() => {
    if (isFetched) return;
    fetchRepo();
  }, []);

  return (
    <>
      <Header />
      <WhoAmi />
      <div className="w-full mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="m-7">{filteredContent()}</div>
      </div>
      <Contact />
      <Footer />
    </>
  );
};
export default Git;
