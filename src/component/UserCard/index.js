import { Component } from "react";
import { InfinitySpin } from "react-loader-spinner";  // ✅ using latest loader

import DisplayDetails from "../DisplayDetails";

import "./index.css";

class UserCard extends Component {
  state = { profileDetails: [], isLoading: false }; // ✅ added isLoading state

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      if (response.ok === true) {
        const data = await response.json();
        this.setState({ profileDetails: data, isLoading: false }); // ✅ stop loader
      }
    } catch (error) {
      console.log("getting error in code");
      this.setState({ isLoading: false }); // ✅ stop loader even on error
    }
  };

  render() {
    const { profileDetails, isLoading } = this.state;

    return (
      <div className="bg-container">
        <h1 className="heading-ele">Display Profile Details</h1>

        {isLoading ? ( // ✅ Show loader if still fetching
          <div style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}>
            <InfinitySpin width="200" color="#00BFFF" />
          </div>
        ) : (
          profileDetails.map((eachItem) => (
            <DisplayDetails key={eachItem.id} eachProfileItem={eachItem} />
          ))
        )}
      </div>
    );
  }
}

export default UserCard;
