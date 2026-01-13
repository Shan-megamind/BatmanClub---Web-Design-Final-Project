import ProfileField from '../components/ProfileField';
import './ProfilePage.css';

const ProfilePage = ({ profile, updateProfile, availableAvatars }) => {
  return (
    <div className="profile-page">
      <div className="grid-container">
        <div className="profile-container">
          <h1 className="page-title">Vigilante Profile</h1>
          
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={profile.profilePic} alt="Profile Avatar" />
            </div>
            <div className="profile-identity">
              <h2>{profile.username}</h2>
              <p>{profile.membership}</p>
            </div>
          </div>
          
          <div className="profile-fields">
            <ProfileField 
              label="Avatar"
              type="select"
              value={profile.profilePic}
              onSave={(value) => updateProfile('profilePic', value)}
              options={availableAvatars}
              optionDisplay={(option) => (
                <div className="pic-option">
                  <img src={option} alt="Avatar option" className="option-thumbnail" />
                  {option.split('/').pop().replace('.jpg', '')}
                </div>
              )}
            />
            
            <ProfileField 
              label="Username"
              type="text"
              value={profile.username}
              onSave={(value) => updateProfile('username', value)}
              validate={(value) => {
                if (!value || value.trim() === '') {
                  return 'Username cannot be empty';
                }
                if (value.toLowerCase() === 'joker') {
                  return 'That villain name is not allowed';
                }
                return '';
              }}
            />
            
            <ProfileField 
              label="Real Name"
              type="text"
              value={profile.realName}
              onSave={(value) => updateProfile('realName', value)}
              validate={(value) => {
                if (value && value.trim() === '') {
                  return 'Name cannot be only whitespace';
                }
                return '';
              }}
            />
            
            <ProfileField 
              label="Location"
              type="text"
              value={profile.location}
              onSave={(value) => updateProfile('location', value)}
            />
            
            <ProfileField 
              label="Membership Status"
              type="select"
              value={profile.membership}
              onSave={(value) => updateProfile('membership', value)}
              options={[
                'Founding Member',
                'Senior Member',
                'Active Member',
                'Junior Member',
                'Applicant'
              ]}
            />
            
            <ProfileField 
              label="Special Skills"
              type="text"
              value={profile.specialSkills}
              onSave={(value) => updateProfile('specialSkills', value)}
            />
            
            <ProfileField 
              label="Night Patrol Volunteer"
              type="checkbox"
              value={profile.isNightPatroller}
              onSave={(value) => updateProfile('isNightPatroller', value)}
            />

            <ProfileField 
              label="Theme Preference"
              type="select"
              value={profile.preferredTheme}
              onSave={(value) => updateProfile('preferredTheme', value)}
              options={[
                'dark',
                'light'
              ]}
              optionDisplay={(option) => (
                <div className="theme-option">
                  <span className={`theme-swatch ${option}`}></span>
                  {option === 'dark' ? 'Dark (Batman)' : 'Light (Bruce Wayne)'}
                </div>
              )}
            />

          </div>
        </div>
        
        <div className="profile-sidebar">
          <div className="sidebar-content">
            <h3>Membership Benefits</h3>
            <ul>
              <li>Access to all Batman Club meetings</li>
              <li>Quarterly newsletter subscription</li>
              <li>Exclusive member-only events</li>
              <li>Access to training resources</li>
              <li>Batman Club identification card</li>
            </ul>
            
            <div className="bat-quote">
              <p>"It's not who I am underneath, but what I do that defines me."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;