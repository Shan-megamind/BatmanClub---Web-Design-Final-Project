import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="grid-container">
        <section className="section">
          <h2 className="section-title">Who is Batman?</h2>
          <div className="section-content">
            <p>Batman is more than just a comic book character – he's a symbol of justice, determination, and the potential that exists within all of us to stand up against injustice.</p>
            <p>Unlike other superheroes, Batman has no supernatural powers. His abilities come from years of training, discipline, and an unwavering commitment to protecting the innocent. Batman represents the idea that anyone with enough dedication can make a difference.</p>
            <p>What truly makes Batman special is that beneath the mask and cape is simply a person who chose to use their resources and abilities to help others. This is the essence of what our club celebrates – the everyday hero that exists in each of us.</p>
          </div>
        </section>
        
        <section className="section">
          <h2 className="section-title">About Us</h2>
          <div className="section-content">
            <p>The Neighborhood Batman Club was founded on the principle that heroes exist in our everyday lives. We are a community of individuals who believe in standing up for what's right, helping our neighbors, and making a positive impact in our communities.</p>
            <p>Our members come from all walks of life, but share a common belief: that we don't need superpowers to make a difference. Through community service, mentorship programs, and support networks, we aim to embody the core values that Batman represents.</p>
            <p>By joining our club, you become part of a network of like-minded individuals who are committed to making the world a better place, one neighborhood at a time. Together, we can be the heroes our communities need.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;