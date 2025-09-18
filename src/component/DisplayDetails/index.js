import "./index.css";

const DisplayDetails = (props) => {
  const { eachProfileItem } = props;
  console.log("eachProfileItem:", eachProfileItem);

  if (!eachProfileItem) {
    return (
      <div className="card">
        <div style={{ padding: 20, textAlign: "center" }}>
          Loading profile...
        </div>
      </div>
    );
  }

  const {
    name = "",
    username = "",
    email = "",
    phone = "",
    website = "",
    address = {},
    company = {},
  } = eachProfileItem;

  const { suite = "", street = "", city = "", zipcode = "", geo = {} } = address;
  const { lat = "", lng = "" } = geo;
  const { name: compName = "", catchPhrase = "", bs = "" } = company;

  const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`;

  return (
    <div className="card">
      <div className="card-header">
        <img
          src={avatarUrl}
          alt={`${username}'s avatar`}
          style={{ width: 60, height: 60, borderRadius: "50%" }}
          onError={(e) => {
            e.target.src =
              "https://api.dicebear.com/9.x/lorelei/svg?seed=placeholder";
          }}
        />
        <div className="user-info">
          <h2 className="name">{name}</h2>
          <p className="username">@{username}</p>
        </div>
        <div className="contact-info">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Website:</strong> {website}
          </p>
        </div>
      </div>

      <hr />

      <div className="section">
        <h4>📍 Address</h4>
        <p>{suite}</p>
        <p>{street}</p>
        <p>
          {zipcode} {city}
        </p>
        <p>
          Lat: {lat}, Lng: {lng}
        </p>
      </div>

      <hr />

      <div className="section">
        <h4>⚙️ Company</h4>
        <p>
          <strong>Name:</strong> {compName}
        </p>
        <p>
          <strong>Catch Phrase:</strong> {catchPhrase}
        </p>
        <p>
          <strong>BS:</strong> {bs}
        </p>
      </div>
    </div>
  );
};

export default DisplayDetails;
