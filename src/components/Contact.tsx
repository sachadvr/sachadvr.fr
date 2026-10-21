import React, { useEffect } from 'react'
import './Contact.scss'
import { FaAddressCard } from 'react-icons/fa'

let listener = false;
const Contact = () => {
    useEffect(() => {
        if (listener) return;
        listener = true;
        document.getElementById('myForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = document.getElementById('myForm') as HTMLFormElement;
            const formData = new FormData(form);
            const payload = {
                name: formData.get('nom')?.toString() || '',
                from: formData.get('email')?.toString() || '',
                phone: formData.get('tel')?.toString() || '',
                text: formData.get('message')?.toString() || '',
            };
            fetch('https://api.sachadvr.fr/mail/sender', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            })
            .then((response) => {
             if (!response.ok) {
                alert('Une erreur est survenue, veuillez réessayer plus tard');
                throw new Error('Network response was not ok');
            }
             return response.json();
            })
            .then(() => {
                alert('Votre message a bien été envoyé');
                form.reset();
            });
        });
    }, [])
  return (
    <div className="content contact">
        
        <h2 id="contact grid grid-flow-row items-center "><FaAddressCard /> <span>Me contacter</span></h2>

       <p id="desc">Si vous souhaitez plus d&apos;informations, il est notamment possible de me contacter en remplissant le formulaire ci-dessous</p>
       <form name="my_form" id="myForm" action="" method="post">
           <p>
               <label htmlFor="nom">Nom de la société ou du particulier</label>
               <input type="text" id="nom" name="nom" required /> <span></span>
           </p>
           <p>
               <label htmlFor="email">E-mail</label>
               <input type="email" id="email" name="email" required /> <span></span>
           </p>
           <p>
               <label htmlFor="tel">Tel</label>
               <input type="tel" id="tel" name="tel" required /> <span></span>
           </p>
           <p>
               <label htmlFor="message">Le message</label>
               <textarea id="message" name="message" required></textarea>
           </p>
           <p>
               <input id="btnsubmit" type="submit" value="Envoyer" name="Envoyer" /> <span id="spansubmit"><i className="scroll-icon fas fa-angle-right"></i></span>
           </p>
       </form>
   </div>
  )
}

export default Contact