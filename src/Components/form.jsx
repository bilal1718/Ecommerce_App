import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/form.css";
export default function Form() {
  // Form state
  const [formData, setFormData] = React.useState({
    userName: "",
    userEmail: "",
    password: "",
    confirmpassword: "",
    checked: true,
    passwordMatchError: false, // Tracks password match error
  });

  // Handle input change
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
      passwordMatchError: false, 
    }));
  }

  // Handle form submission
  function submitForm(event) {
    event.preventDefault();
    if (formData.password === formData.confirmpassword) {      
      console.log("Successfully signed up");
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        passwordMatchError: true, 
      }));
      console.log("Passwords do not match");
      return;
    }
  }

  return (
    <div className="wrapper">
      <div className="logo">
        <img
          src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/world-brand-amazon-png-logo-vector-27.png"
          width="300"
          alt="world brand amazon png logo vector"
        />
      </div>
      <div className="text-center mt-4 name">Amazon Clone</div>
      <form className="p-3 mt-3" onSubmit={submitForm}>
        {/* Username field */}
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            id="userName"
            placeholder="Username"
          />
        </div>

        {/* Email field */}
        <div className="form-field d-flex align-items-center">
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            id="userEmail"
            placeholder="Email"
          />
        </div>

        {/* Password field */}
        <div className="form-field d-flex align-items-center">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="Password"
          />
        </div>

        {/* Confirm password field */}
        <div className="form-field d-flex align-items-center">
          <input
            type="password"
            name="confirmpassword"
            onChange={handleChange}
            id="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}  
          />
          {formData.passwordMatchError && ( // Display error message conditionally
            <div>Passwords do not match</div>
          )}
        </div>

        {/* Terms and conditions checkbox */}
        <div className="text-center fs-6 form-market">
          <input
            type="checkbox"
            onChange={handleChange}
            name="checked"
            checked={formData.checked}
          />
          <label htmlFor="terms and conditions">
            Accept the Terms And Conditions
          </label>
        </div>

        {/* Submit button */}
        <button className="btn mt-3">Sign Up</button>
      </form>
    </div>
  );
}
