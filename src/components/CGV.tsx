import React, { useEffect } from 'react';
import NavCguCgv from './NavCguCgv';

const CGV = () => {
    useEffect(() => {
        const cgv = document.querySelector('.cgv');
        cgv?.scrollIntoView();
    }, []);
    return (
        <>
        <NavCguCgv />
        <div className="cgv p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">📜 CGV</h1>
            <p className="mb-4">
                Les présentes <strong><u>Conditions Générales de Vente (CGV)</u></strong> régissent les modalités de prestation des services proposés par SachaDVR, développeur indépendant, à ses clients.
            </p>
            <p className="mb-4">
                Bien que le Site SachaDVR - CV & Portfolio (ci-après le «Site») serve principalement de vitrine pour les projets et compétences de son auteur, il peut également être utilisé par des clients potentiels pour entrer en contact en vue d’une collaboration. Les prestations proposées incluent, mais ne sont pas limitées à, des services de <strong><u>développement web</u></strong> 💻, création de logiciels ou toute autre activité liée au développement informatique.
            </p>
            <p className="mb-4">
                Toute demande de prestation ou de collaboration devra être effectuée via un échange direct entre le prestataire et le client (par email, téléphone, ou tout autre moyen convenu). Les présentes CGV s’appliquent à toutes les prestations conclues dans ce cadre, même si elles ne sont pas formalisées via le Site.
            </p>
            <p className="mb-4">
                Le prestataire se réserve le droit de modifier les présentes CGV à tout moment. Toute modification sera communiquée aux clients avant la mise en œuvre des nouvelles dispositions.
            </p>
        </div>
        </>
    );
};

export default CGV;
