import React, { useState } from "react";
import Career from "../assets/Career.svg";
import Psychological from "../assets/Psychological.svg";
import Presentation from "../assets/Presentation.svg";
import Disscussion from "../assets/Disscussion.svg";
import Talk from "../assets/talk.svg";
import Cross from "../assets/Cross.svg";
import KnowMore from "../assets/KnowMore.svg";
import { Heart } from "phosphor-react";
import Header from "./Header";
import toast from "react-hot-toast";
import axios from "axios";

// Modal Component
const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-[90%] sm:w-[50%] h-[90%] overflow-auto p-6 rounded-[2.6rem] shadow-lg relative">
        <img src={Cross} alt="" className="absolute top-5 left-5" onClick={onClose}/>
        <h2 className="text-[2rem] font-nunito font-bold mb-4 mx-10 text-center text-[#7355A8]">
          {content.title}
        </h2>
        <p className="text-[1.6rem] font-nunito mb-4">{content.description}</p>
      </div>
    </div>
  );
};

// Topics Data
const topics = [
  {
    name: "psychology_career_assessment",
    title: "Psychology Career Assessment & Counselling",
    icon: Psychological,
    description: (
      <>
        <p className="text-[1.6rem] font-nunito mb-4">
          This aims at assessing academic strengths, clinical skills, and interests,( and more...) guiding psychology students toward personalised, well-informed career choices. It aligns students’ unique abilities with the varied needs of the mental health field, assessing and evaluating areas like theoretical knowledge, practical skills, and professional interests to help them find paths where they can make a meaningful impact.
        </p>
        <p className="text-[1.6rem] font-nunito mb-4">
          This tool is intended for both undergraduate and postgraduate psychology students exploring careers in mental health:
        </p>
        <strong>1. Undergraduate Students:</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Helps explore specializations, internships, and roles that match their developing interests and skills.</li>
          <li>Provides clarity on career options, suggesting areas for further study or skill-building before a graduate degree.</li>
        </ul>
        <strong>2. Postgraduate Students:</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Assists with focusing on specific areas, such as clinical practice, research, or applied psychology ..( we can mention more specialisations)</li>
          <li>Supports decisions about specialized training, certification, and licensure, aligning advanced skills with targeted career paths in mental health.</li>
        </ul>
      </>
    ),
  },
  {
    name: "psychology_career_bootcamp",
    title: "Psychology Career Bootcamp",
    icon: Career,
    description: (
      <>
        <p className="text-[1.6rem] font-nunito mb-4">
        Career Bootcamp, an exclusive opportunity to engage with leading experts, build a professional network, and gain insights into the psychology and mental health industry.
        </p>
        <strong>Our Career Bootcamp includes:</strong>
        <ul className="list-disc list-inside ml-4 text-[1.6rem] font-nunito">
          <li><strong>Expert Talks:</strong> Hear directly from experienced professionals about the latest industry trends and career paths in psychology.</li>
          <li><strong>Career Counseling & Assessments:</strong>  Get tailored career guidance and assessments to help you identify your strengths and plan your future.</li>
          <li><strong>Networking Opportunities:</strong> Connect with industry stalwarts and like-minded peers, preparing you to enter the professional world with a strong support system.</li>
          <li><strong>Market-Ready Insights:</strong> can’t think what to write but guess an important aspect of boot camp.</li>
        </ul>
      </>
    ),
  },
  {
    name: "internships_and_trainings",
    title: "Internships and Training",
    icon: Presentation,
    description: (
      <>
        <p className="text-[1.6rem] font-nunito mb-4">
            Unlock real-world experience and professional growth with our comprehensive internships and training programs at Daffodils. Our programs are designed to equip psychology students with hands-on skills through supervised casework, role-playing, and guided clinical practice. The aim is to gain insight into client management, conduct real consultation sessions, and explore tailored therapy approaches—all while receiving mentorship from industry experts.
        </p>
        <p className="text-[1.6rem] font-nunito">
          To know more : <a href="https://main.d1jmslcnot05.amplifyapp.com" target="_blank" className="text-blue-500">Click Here</a>
        </p>
      </>
    ),
  },
  {
    name: "mentorship",
    title: "Mentorship",
    icon: Disscussion,
    description: (
      <>
        <p className="text-[1.6rem] font-nunito mb-4">
            Mentorship at Daffodils entails continuous commitment to your academic, personal, and professional growth. Our mentorship offering creates a space where you can engage in meaningful conversations, reflect on your journey, and gain insights into the psychology field. From exploring industry realities to supporting your academic progress, we’re here to help you build a well-rounded foundation.
        </p>
        <strong>Our mentors provide:</strong>
        <ul className="list-disc list-inside ml-4 text-[1.6rem] font-nunito">
          <li><strong>Reading Circles:</strong>  Participate in discussions on essential psychology literature to deepen your understanding.</li>
          <li><strong>Clinical Work Reflections:</strong> Grow professionally by reflecting on real-world experiences alongside our mentors.</li>
          <li><strong>Career and Industry Insights:</strong>  Learn about the realities of the psychology field to clarify your career path.</li>
        </ul>
      </>
    ),
  },
  {
    name: "counselling_therapy",
    title: "Counselling & Therapy",
    icon: Talk,
    description: (
      <>
        <p className="text-[1.6rem] font-nunito mb-4">
        At Daffodils Therapy Studio, we understand the challenges students face, and we’re committed to making high-quality mental health support affordable and accessible.
        </p>
        <strong>Our Services include:</strong>
        <ul className="list-disc list-inside ml-4 text-[1.6rem] font-nunito">
          <li><strong>Affordable Support:</strong>  Accessible mental health care at a price that fits a student’s budget.</li>
          <li><strong>Flexible Session Options:</strong> Choose between online, chat-based, or in-person therapy sessions to suit your schedule and preferences.</li>
          <li><strong>Tailored Approach:</strong>  Our mental health professionals adapt therapeutic interventions to effectively address and resolve your specific concerns.</li>
          <li><strong>Expert Guidance for Young Adults:</strong>  Specialized support for challenges commonly faced by young adults, including stress, anxiety, and relationship issues.</li>
          <li><strong>Safe, Confidential Environment:</strong>  A compassionate space where you can explore your concerns and work toward personal growth.</li>
        </ul>
      </>
    ),
  },
];


const RegisterInterestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    course: "",
    year: "",
    college_university_name: "",
    psychology_career_assessment: 0,
    psychology_career_bootcamp: 0,
    internships_and_trainings: 0,
    mentorship: 0,
    counselling_therapy: 0,
  });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courseOptions = ["undergraduate", "postgraduate"];;
  const yearOptions =  {
    undergraduate: ["1st year", "2nd year", "3rd year", "4th year"],
    postgraduate: ["1st year", "2nd year"],
  };
  const universityOptions = ["JMI", "JNU", "AMU"];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle interest for a topic
  const handleInterestClick = (topicName) => {
    setFormData((prevState) => ({
      ...prevState,
      [topicName]: prevState[topicName] === 0 ? 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/genricIntrestedRegistration", formData);
  
      if (response.status === 200) {
        toast.success(`Your Interest Submitted Successfully`, {
          position: "top-center", // Set the position to top-right
          duration: 3000, // Display for 3 seconds (3000 ms)
          style: {
            fontWeight: "bold",
            fontSize: "14px", // Smaller text
            fontFamily:"nunito"
          },
        })
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          course: "",
          year: "",
          college_university_name: "",
          psychology_career_assessment: 0,
          psychology_career_bootcamp: 0,
          internships_and_trainings: 0,
          mentorship: 0,
          counselling_therapy: 0,
        });
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };  

  // Open the modal
  const openModal = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTopic(null);
  };

  return (
    <>
    <Header/>
    <div className="sm:w-[30%] w-full mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center h-auto">
      <h2 className="text-[2.4rem] font-nunito font-bold text-center mb-10">
        Register Your Interest
      </h2>

      <div className="flex flex-col gap-[2rem] shadow-lg w-full py-[2rem] rounded-2xl">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="mx-auto p-4 rounded-lg flex flex-col w-[90%] h-[14rem] items-start justify-between shadow-md bg-[#FCFAFF]"
          >
            <div className="flex justify-around gap-[12px]">
              <img
                src={topic.icon}
                className="w-[7.4rem] h-[7.4rem]"
                alt={topic.title}
              />
              <div className="flex flex-col gap-[2px]">
                <h3 className="text-[1.8rem] font-nunito font-bold text-[#614298]">
                  {topic.title}
                </h3>
                <p
                  onClick={() => openModal(topic)}
                  className="text-[1.4rem] font-nunito font-medium text-[#614298] cursor-pointer flex gap-5 items-center"
                >
                  Click to Know More
                  <img src={KnowMore} alt="" />
                </p>
              </div>
            </div>
            <div
              className={`w-full h-[3.4rem] rounded-xl text-[1.6rem] flex items-center justify-between px-[12px] ${
                index % 2 === 0 ? "bg-purple-200" : "bg-yellow-200"
              }`}
            >
              I am Interested
              <button
                onClick={() => handleInterestClick(topic.name)}
                className="flex items-center justify-center bg-transparent border-none"
              >
                <Heart
                  size={25}
                  color={formData[topic.name] === 1 ? "#E0245E" : "#9CA3AF"}
                  weight={formData[topic.name] === 1 ? "fill" : "regular"}
                  className="transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={selectedTopic} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-[2rem] shadow-lg w-full py-[2rem] rounded-2xl mt-[2.5rem]">
          <div className="w-[90%] mx-auto">
            <label className="block text-[1.6rem] font-nunito font-bold mb-2">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full h-[5rem] p-2 text-[1.4rem] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div className="w-[90%] mx-auto">
            <label className="block text-[1.6rem] font-nunito font-bold mb-2">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="design@gmail.com"
              className="w-full h-[5rem] p-2 text-[1.4rem] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Phone */}
          <div className="w-[90%] mx-auto">
            <label className="block text-[1.6rem] font-nunito font-bold mb-2">Phone No. (WhatsApp)*</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="0000000000"
              className="w-full h-[5rem] p-2 text-[1.4rem] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              pattern="\d{10}"
              required
            />
          </div>

          {/* Other Fields */}
          {/* Course */}
          <div className="w-[90%] mx-auto">
            <label className="block text-[1.6rem] font-nunito font-bold mb-2">Course*</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full h-[5rem] capitalize p-2 text-[1.4rem] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>
                Select Course
              </option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[90%] mx-auto">
            <label className=" block text-[1.6rem] font-nunito font-bold mb-2 ">Year*</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full  h-[5rem]   p-2  text-[1.4rem]   border  rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>Select Year</option>
              {(yearOptions[formData.course] || []).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[90%] mx-auto">
            <label className=" block text-[1.6rem] font-nunito font-bold mb-2 ">College/University Name*</label>
            <select
              name="college_university_name"
              value={formData.college_university_name}
              onChange={handleChange}
              className="w-full  h-[5rem]   p-2  text-[1.4rem]   border  rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>Select University</option>
              {universityOptions.map((university) => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-[90%] mx-auto h-[5rem] py-2 bg-[#614298] text-white text-[1.8rem] font-nunito rounded-2xl hover:bg-purple-700 transition duration-200"
          >
            Submit
          </button>
        </form>
    </div>
    </>
  );
};

export default RegisterInterestForm;
