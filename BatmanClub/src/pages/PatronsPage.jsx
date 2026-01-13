import { useState } from 'react';
import AccordionPanel from '../components/AccordianPanel';
import Modal from '../components/Modal';
import SubscribeForm from '../components/SubscribeForm';
import './PatronsPage.css';

const PatronsPage = () => {

  const [showModal, setShowModal] = useState(false);
  
  // Which patron is being subscribed to?
  const [currentPatron, setCurrentPatron] = useState(null);
  
  const patrons = [
    {
      id: 1,
      name: "Thomas Wayne",
      alias: "The Philanthropist",
      image: "/Images/thomas.jpg",
      shortDesc: "A respected doctor and philanthropist who dedicates his spare time to providing free medical care in underserved communities.",
      fullDesc: "Dr. Thomas Wayne has been serving Gotham for over 15 years, focusing on bringing quality healthcare to those who can't afford it. After witnessing the gaps in our healthcare system firsthand, he established the Wayne Free Clinic which now operates in three neighborhood locations. His tireless work has helped thousands of residents receive treatment they would otherwise go without. Beyond medicine, Thomas organizes annual fundraisers for local schools and mentors young people interested in pursuing careers in healthcare."
    },
    {
      id: 2,
      name: "Barbara Gordon",
      alias: "The Information Guardian",
      image: "/Images/barbara.jpg",
      shortDesc: "A cybersecurity expert who volunteers teaching digital literacy and online safety to seniors and children in the community.",
      fullDesc: "Barbara's passion for information security began at age 12 when she helped her school recover from a ransomware attack. Now with multiple security certifications, she splits her time between her IT consulting business and her true passion: educating vulnerable populations about staying safe online. Her 'Digital Defense' workshops have reached over 5,000 seniors and students in the past three years alone. Barbara also maintains a 24/7 helpline for community members who suspect they've been victims of online scams, helping them secure their accounts and recover lost data."
    },
    {
      id: 3,
      name: "Richard Grayson",
      alias: "The Mentor",
      image: "/Images/richard.jpg",
      shortDesc: "A former gymnast who now runs a youth mentorship program that teaches discipline and physical fitness through acrobatics and martial arts.",
      fullDesc: "Richard grew up in a traveling circus before an injury ended his professional career. Rather than give up his passion, he transformed it into 'Flying Graysons,' a program that uses gymnastics, acrobatics, and martial arts to build confidence in at-risk youth. His unique approach combines physical training with meditation and conflict resolution skills, helping kids channel their energy in positive ways. Many of his former students have gone on to become peer mentors themselves, creating a cycle of positive influence that has dramatically reduced juvenile crime rates in their neighborhoods."
    },
    {
      id: 4,
      name: "Selina Kyle",
      alias: "The Rescuer",
      image: "/Images/selina.jpg",
      shortDesc: "An animal rights activist who rescues stray cats and operates a shelter for abandoned pets in the neighborhood.",
      fullDesc: "Selina's journey began when she discovered a colony of feral cats living in an abandoned building scheduled for demolition. After successfully relocating them, she realized the scale of the city's stray animal problem and took action. She converted her garage into a temporary shelter, which eventually grew into 'Second Chance Sanctuary,' now the largest no-kill animal shelter in the area. Beyond rescue operations, Selina advocates for stronger animal protection laws, runs a low-cost spay/neuter program, and has pioneered an animal therapy program that brings comfort to patients in local hospitals and nursing homes."
    }
  ];
  
  const openSubscribeModal = (patron) => {
    setCurrentPatron(patron);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCurrentPatron(null);
  };
  
  const handleSubscribe = (email) => {

    console.log(`Subscribed to ${currentPatron.name} alerts with email: ${email}`);
    
    // Success message and closing the modal
    alert(`Successfully subscribed to ${currentPatron.name}'s alerts!`);
    closeModal();
  };
  
  return (
    <div className="patrons-page">
      <h1 className="page-title">Our Neighborhood Batmen</h1>
      <p className="page-description">Meet the everyday heroes who are making a difference in our community. Learn more about each patron and subscribe to receive their community alerts.</p>
      
      <div className="grid-container">
        <div className="patron-panels">
          {patrons.map(patron => (
            <AccordionPanel 
              key={patron.id}
              id={patron.id}
              name={patron.name}
              alias={patron.alias}
              image={patron.image}
              shortDesc={patron.shortDesc}
              fullDesc={patron.fullDesc}
              onSubscribe={() => openSubscribeModal(patron)}
            />
          ))}
        </div>
      </div>
      
      <Modal 
        isOpen={showModal} 
        onClose={closeModal}
        title={currentPatron ? `Subscribe to ${currentPatron.name}'s Alerts` : 'Subscribe to Alerts'}
      >
        {currentPatron && (
          <SubscribeForm 
            patronName={currentPatron.name}
            onSubmit={handleSubscribe}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default PatronsPage;