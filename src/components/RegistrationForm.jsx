import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    course: "",
    year: "",
    semester: "",
    internshipPrograms: [],
    trainingPrograms: [],
    interestedInPrePlacement: "Yes",
    selectedInterests: [],
  });
  const [showInterests, setShowInterests] = useState(true);
  const [availableInterests, setAvailableInterests] = useState([
    "Trainee Psychologist (Counselling)",
    "Trainee Psychologist (Clinical)",
    "Trainee Psychologist (OB/IB)",
    "Research Project Officer",
    "Workshop Facilitator",
    "Academic Trainer",
    "Digital Marketing Manager",
    "Content Creator",
    "Product Design Manager (User Experience)",
    "AI Specialist Counsellor",
  ]);

  const [availableInternshipPrograms, setAvailableInternshipPrograms] =
    useState([
      "Basic Counseling Skills",
      "Diagnostic & Clinical Skills",
      "Children & Adolescent Psychology",
      "Applied Behavior Analysis",
      "Organisational Behavior",
      "School Counseling Skills",
      "Neuroscience",
      "Queer Affirmative",
      "Career Counseling Skills & Assessment",
      "Forensic",
      "Expressive Arts Therapy",
      "Sports Psychology",
      "Building your Clinical Practice",
      "Mindfulnes",
    ]);

  const [availableTrainingPrograms, setAvailableTrainingPrograms] = useState([
    "Introduction to Cognitive Behavioral Therapy",
    "Brief Psychodynamic Psychotherapy",
    "Acceptance & Commitment Therapy",
    "Expressive Art Therapy",
    "Trauma informed Therapy",
    "Narrative Therapy",
    "Queer Affirmative Therapy",
    "Mindfulness Based Cognitive Behavioral Therapy",
    "Introduction to Group therapy ",
    "Play therapy",
  ]);

  const [showPrograms, setShowPrograms] = useState(true); // State to toggle visibility
  const [showPrograms1, setShowPrograms1] = useState(false); // State to toggle visibility
  const [showPrograms2, setShowPrograms2] = useState(false); // State to toggle visibility

  // Handle icon click
  const togglePrograms = () => {
    setShowPrograms(!showPrograms);
  };
  const togglePrograms1 = () => {
    setShowPrograms1(!showPrograms1);
  };
  const togglePrograms2 = () => {
    setShowPrograms1(!showPrograms);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For contact number validation: only allow numbers and limit to 10 digits
    if (name === "contactNo") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
      if (numericValue.length > 10) {
        return; // Prevent setting contact number if length exceeds 10 digits
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // For showing interests based on pre-placement selection
    if (name === "interestedInPrePlacement") {
      setShowInterests(value === "Yes");
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      const updatedValues = checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value);

      return {
        ...prevData,
        [name]: updatedValues,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Show a loading toast while the request is being processed
    const loadingToast = toast.loading("Submitting...");

    axios
      .post(
        "https://8m0spbpe5m.execute-api.ap-south-1.amazonaws.com/dev/registration",
        formData
      )
      .then((res) => {
        // Success handling
        if (res.status === 200 && res.data.success) {
          toast.success("Registration successful!", { id: loadingToast });
          setFormData({
            fullName: "",
            email: "",
            contactNo: "",
            course: "",
            year: "",
            semester: "",
            internshipPrograms: [],
            trainingPrograms: [],
            interestedInPrePlacement: "No",
            selectedInterests: [],
          });
        } else {
          toast.error("Failed to register. Please try again.", {
            id: loadingToast,
          });
        }
      })
      .catch((error) => {
        // Error handling
        toast.error(`Error: ${error.message}`, { id: loadingToast });
      });
  };

  console.log(formData);

  return (
    <div className="flex flex-col justify-start px-2 pt-1 sm:px-44 sm:pt-16 mt-3 bg-background2 w-full h-full pb-16">
      <div className="flex flex-col gap-4 border bg-white rounded-xl p-6">
        <div className="flex justify-start items-center gap-6">
          <div className="font-sans font-bold text-[40px] flex flex-col w-full items-center sm:flex-row justify-start">
            <p>Register Your &nbsp;</p>
            <p>Interest</p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex w-[100%] flex-col sm:flex-row gap-2 sm:gap-[70px]">
              <div className="w-full sm:w-[50%]">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Full Name*
                </h6>
                <input
                  name="fullName"
                  type="text"
                  className="w-full h-[48px] p-4 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full sm:w-[50%]">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Email*
                </h6>
                <input
                  name="email"
                  type="email"
                  className="w-full h-[48px] p-4 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full sm:w-[50%]">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Contact No(WhatsApp enabled)*
                </h6>
                <input
                  name="contactNo"
                  type="tel"
                  className="w-full h-[48px] p-4 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                  placeholder="Contact No"
                  pattern="\d{10}"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex w-[100%] flex-col sm:flex-row gap-2 sm:gap-[70px]">
              <div className="w-full sm:w-[50%]">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Course*
                </h6>
                <select
                  name="course"
                  className="w-full h-[48px] p-2 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="UnderGraduate">UnderGraduate</option>
                  <option value="PostGraduate">PostGraduate</option>
                </select>
              </div>
              <div className="w-full sm:w-[50%]">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Year*
                </h6>
                <select
                  name="year"
                  className="w-full h-[48px] p-2 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>
            </div>

            <div className="flex w-[100%] flex-col sm:flex-row gap-2 sm:gap-[70px]">
              <div className="w-full sm:w-[50%]">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Semester*
                </h6>
                <select
                  name="semester"
                  className="w-full h-[48px] p-2 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                  value={formData.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex gap-4">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Which Internship Programme are you interested in (Select
                  Multiple)
                </h6>
                <div>
                  <span
                    onClick={togglePrograms} // Click handler to toggle visibility
                    className="cursor-pointer"
                  >
                    {showPrograms ? (
                      <KeyboardArrowDownIcon
                        fontSize="large"
                        sx={{ fontSize: "30px" }}
                      /> // Icon for collapse
                    ) : (
                      <KeyboardArrowUpIcon
                        fontSize="large"
                        sx={{ fontSize: "30px" }}
                      /> // Icon for expand
                    )}
                  </span>
                </div>
              </div>

              {showPrograms && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  {availableInternshipPrograms.map((program, index) => (
                    <FormControlLabel
                      key={program}
                      control={
                        <Checkbox
                          name="internshipPrograms"
                          value={program}
                          checked={formData.internshipPrograms.includes(
                            program
                          )}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={program}
                      className="flex items-center"
                      style={{
                        gridColumn: `span ${index < 7 ? "1" : "1"}`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col w-full">
              <div className="flex">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  Which Training Programme are you interested in (Select Multiple)
                </h6>
                <div>
                  <span
                    onClick={togglePrograms1} // Click handler to toggle visibility
                    className="cursor-pointer"
                  >
                    {showPrograms1 ? (
                      <KeyboardArrowDownIcon
                        fontSize="large"
                        sx={{ fontSize: "30px" }}
                      /> // Icon for collapse
                    ) : (
                      <KeyboardArrowUpIcon
                        fontSize="large"
                        sx={{ fontSize: "30px" }}
                      /> // Icon for expand
                    )}
                  </span>
                </div>
              </div>

              {
                showPrograms1 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {availableTrainingPrograms.map((program, index) => (
                  <FormControlLabel
                    key={program}
                    control={
                      <Checkbox
                        name="trainingPrograms"
                        value={program}
                        checked={formData.trainingPrograms.includes(program)}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={program}
                    className="flex items-center"
                  />
                ))}
              </div>
                )
              }
            
            </div>

            <div className="flex flex-col w-[100%]">
             
              <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                Are You Interested in Pre-Placement Opportunities
              </h6>
              <select
                name="interestedInPrePlacement"
                className="w-full h-[48px] p-2 border border-solid border-[#D5D2D9] bg-[#FCFCFC] rounded-lg outline-none"
                value={formData.interestedInPrePlacement}
                onChange={handleInputChange}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {showInterests && (
              <div className="flex flex-col w-full">
                <h6 className="text-[#000000] text-[16px] not-italic font-semibold leading-normal tracking-[0.12px] font-sans">
                  If yes, Choose the areas in which you are interested
                </h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormGroup>
                    {availableInterests.slice(0, 5).map((program) => (
                      <FormControlLabel
                        key={program}
                        control={
                          <Checkbox
                            name="selectedInterests"
                            value={program}
                            checked={formData.selectedInterests.includes(
                              program
                            )}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={program}
                        className="flex items-center "
                      />
                    ))}
                  </FormGroup>

                  <FormGroup>
                    {availableInterests.slice(5).map((program) => (
                      <FormControlLabel
                        key={program}
                        control={
                          <Checkbox
                            name="selectedInterests"
                            value={program}
                            checked={formData.selectedInterests.includes(
                              program
                            )}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={program}
                        className="flex items-center"
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-1 bg-[#614298] w-[132px] border border-solid border-[#614298] text-white px-4 py-4 rounded-lg font-semibold cursor-pointer font-quicksand"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
