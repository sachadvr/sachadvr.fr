import React, { useEffect } from 'react';
import NavCguCgv from './NavCguCgv';

const CGU = () => {
    useEffect(() => {
            const cgv = document.querySelector('.cgu');
            cgv?.scrollIntoView();
        }, []);
    return (
        <>
        <NavCguCgv />
        <div className="cgu p-4">
            <h1 className="text-2xl font-bold mb-4">📜 CGU</h1>
            <p className="mb-4"><strong><u>Conditions générales d&apos;utilisation</u></strong></p>
            <p className="mb-4">
                Bienvenue sur <strong><u>SachaDVR - CV & Portfolio</u></strong> (ci-après désigné le «Site»). Ce Site est une plateforme personnelle et professionnelle ayant pour objectif de présenter les projets et compétences de son auteur, ainsi que de servir de vitrine de ses réalisations.
            </p>
            <p className="mb-4">Le Site propose un accès à divers contenus, notamment:</p>
            <ul className="list-disc list-inside mb-4">
                <li className="mb-2">Un <strong><u>portfolio</u></strong> regroupant les projets réalisés;</li>
                <li className="mb-2">Des liens vers des projets <strong><u>GitHub</u></strong> et autres plateformes pertinentes;</li>
                <li className="mb-2">Un <strong><u>CV interactif</u></strong> destiné à mettre en avant les expériences et les compétences.</li>
            </ul>
            <p className="mb-4">
                Le Site est accessible à tout type d’utilisateur: particuliers, entreprises, recruteurs ou autres parties intéressées, quel que soit leur lieu de connexion. L’utilisation du Site est régie par les présentes <strong><u>Conditions Générales d’Utilisation (CGU)</u></strong>, que chaque utilisateur s’engage à respecter en naviguant sur le Site.
            </p>
            <p className="mb-4">
                En cas de désaccord avec l’une ou plusieurs des dispositions des présentes <strong><u>CGU</u></strong>, il est conseillé de cesser immédiatement toute utilisation du Site. 🚫
            </p>
        </div>
        </>
    );
};

export default CGU;
