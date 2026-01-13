import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PatronsPage from './pages/PatronsPage';
import JoinPage from './pages/JoinPage';
import ProfilePage from './pages/ProfilePage';
import SkipLink from './components/Skiplink';

function App() {

  const [theme, setTheme] = useState('dark');

  const availableAvatars = [
    '/Images/batman1.jpg',
    '/Images/batman2.jpg',
    '/Images/batman3.jpg',
    '/Images/batman4.jpg'
  ];

  const [profile, setProfile] = useState({
    profilePic: availableAvatars[0],
    username: 'BatFan123',
    realName: 'Bruce Wayne',
    location: 'Gotham City',
    membership: 'Founding Member',
    specialSkills: 'Martial Arts, Detective Work',
    isNightPatroller: true,
    preferredTheme: 'dark' 
  });

  const updateProfile = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
    
    if (field === 'preferredTheme') {
      setTheme(value);
    }
  };
  
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'patrons': return <PatronsPage />;
      case 'join': return <JoinPage />;
      case 'profile': return (
        <ProfilePage 
          profile={profile} 
          updateProfile={updateProfile} 
          availableAvatars={availableAvatars} 
        />
      );
      default: return <HomePage />;
    }
  };

  return (
    <div className={`app theme-${theme}`}>
      <SkipLink />
      <Header 
        profile={profile}
        onPageChange={setCurrentPage} 
        currentPage={currentPage}
      />
      <main id="main-content" className="content" tabIndex="-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;