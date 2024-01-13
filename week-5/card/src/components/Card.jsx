export function Card({ Props }) {
  const data = Props[0]; // Access the data from the Props prop

  return (
    <div className="container">
      <div className="name">{data.name}</div>
      <div className="description">{data.description}</div>
      
      <div className="interestsHeader">Interests:</div>
      <ul className="interestsList">
        {data.interests.map((interest, index) => (
          <li key={index} className="interestItem">
            {interest.interest}
          </li>
        ))}
      </ul>
      <div className="socialLinks">
        {data.socials.map((social, index) => (
          <a key={index} href={social.link} className="link">
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
}
