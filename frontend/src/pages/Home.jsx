import React, { useContext, useEffect, useState } from "react";
import {
  BiPhoneCall,
  BiLogoWhatsapp,
  BiLogoGmail,
  BiMessage,
} from "react-icons/bi";
import { Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../components/Loading";

const Home = () => {
  const [medicationName, setMedicationName] = useState("");
  const [remindhr, setRemindhr] = useState("");
  const [remindmin, setRemindmin] = useState("false");
  const [email, setEmail] = useState("false");

  const [whatsapp, setWhatsapp] = useState("false");
  // const [email, setEmail] = useState("false");
  // const [email, setEmail] = useState("false");
  // const [refresh, setRefresh] = useState("false");

  const { isAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(medicationName, remindhr, remindmin, email);
      setLoading(true);
      const { data } = await axios.post(
        `${server}/reminder/create`,
        {
          medicationName,
          remindhr,
          remindmin,
          email,
          whatsapp,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      setLoading(false);

      console.log("Response Data:", data);

      setMedicationName("");
      setRemindhr("");
      setRemindmin("");
      setEmail("false");
      setWhatsapp("false");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handleEmailCheckboxChange = (e) => {
    setEmail(e.target.checked ? "true" : "false");
  };
  const handlewhatsappCheckboxChange = (e) => {
    setWhatsapp(e.target.checked ? "true" : "false");
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="intrdoction py-12 md:w-4/5 lg:w-4/6 p-8 text-center mx-auto">

        <h1 className="text-4xl md:text-5xl text-gray-800 font-bold mb-5 mt-20 ">
          Welcome to Notify
        </h1>{" "}
        <br />
        <p className="text-lg text-gray-600 leading-7">
          At Notify, we believe that taking control of your health should be
          simple and stress-free. We understand that managing medications can be
          a challenging task, especially when life gets busy. That's why we're
          here to make your health journey more manageable, one pill at a time.
          Our mission is clear: to empower you to stay on top of your medication
          regimen and improve your overall well-being. We offer a user-friendly
          platform designed to remind you when to take your medications,
          ensuring that you never miss a dose. Here, you'll find a range of
          tools and features to help you organize and track your medications,
          set personalized reminders, and gain insights into your adherence. Our
          goal is to make medication management effortless and reliable, so you
          can focus on what matters most—your health and peace of mind. Join us
          on this journey toward better health and medication adherence. Say
          goodbye to missed doses and hello to a healthier, happier you. Welcome
          to Notify, where we're committed to simplifying your health
          management.
        </p>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-screen-xl mx-auto p-12">
          <div className="md:flex justify-center">
            <div className="md:mr-7 text-center md:w-2/3 md:p-4 mb-16">
              <h1 className="text-4xl md:text-5xl text-gray-800 font-bold">
                Did you know?
              </h1>{" "}
              <br />
              <p className="text-lg text-gray-600 leading-7">
                A 2017 study found that adults were much more likely to take
                their medication, and to take it on time, after receiving daily
                text message reminders. Over 2 weeks, the percentage of people
                who forgot their medications dropped from 46% to 5%. The
                percentage who had medication delays dropped from 85% to 18%.
                Another study in 2019 found that patients using medication
                reminder apps have better medication adherence after 3 months
                than those who didn't use these apps.
              </p>
            </div>
            
            <div className=" md:ml-7 bg-green-300 rounded-lg p-7 shadow-md w-full md:w-1/2 mb-16">
              <h2 className="text-3xl md:text-4xl text-center text-gray-800 font-bold">
                Set a Reminder
              </h2>
              <br />
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block font-bold text-gray-800">
                    Medication name :
                  </label>
                  <input
                    name="medicationname"
                    value={medicationName}
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    onChange={(e) => setMedicationName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-800">
                    Set time :
                  </label>
                  <div className="flex items-center">
                    <input
                      name="remindhr"
                      type="number"
                      min="0"
                      max="23"
                      className="w-1/2 border border-gray-300 rounded-md py-2 px-3"
                      value={remindhr}
                      required
                      // onChange={(e) => setRemindhr(e.target.value)}
                      onInput={(e) => {
                        const value = e.target.value;
                        const intValue = parseInt(value, 10);
                        if (isNaN(intValue) || intValue < 0) {
                          e.target.value = "";
                        } else if (intValue > 23) {
                          e.target.value = "23";
                        }
                        setRemindhr(e.target.value);
                      }}
                      placeholder="24hr format"
                    />
                    <span className="mx-2">:</span>
                    <input
                      name="remindmin"
                      type="number"
                      min="0"
                      max="59"
                      className="w-1/2 border border-gray-300 rounded-md py-2 px-3"
                      required
                      value={remindmin}
                      // onChange={(e) => setRemindmin(e.target.value)}
                      onInput={(e) => {
                        const value = e.target.value;
                        const intValue = parseInt(value, 10);
                        if (isNaN(intValue) || intValue < 0) {
                          e.target.value = "";
                        } else if (intValue > 59) {
                          e.target.value = "59";
                        }
                        setRemindmin(e.target.value);
                      }}
                      placeholder="60min format"
                    />
                  </div>
                  <br />
                  <div className="mb-4">
                    <label className="block font-bold text-gray-800 mb-2">
                      Notification Method :
                    </label>
                    <div className=" sm:w-4/5 md:w-full lg:w-4/5 mx-auto">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center ">
                          <input
                            type="checkbox"
                            name="whatsapp"
                            checked={whatsapp === "true"} // Bind the checked status of the checkbox to the email state
                            onChange={handlewhatsappCheckboxChange}
                          />

                          <span className="ml-2 text-lg">
                            <BiLogoWhatsapp className=" inline text-3xl text-gray-600" />
                            WhatsApp
                          </span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="mail"
                            checked={email === "true"} // Bind the checked status of the checkbox to the email state
                            onChange={handleEmailCheckboxChange}
                          />
                          <span className="ml-2 text-lg">
                            <BiLogoGmail className=" inline text-3xl text-gray-600" />{" "}
                            Mail&nbsp;&nbsp;&nbsp;
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" name="sms" />
                          <span className="ml-2 text-lg">
                            <BiMessage className=" inline text-3xl text-gray-600" />{" "}
                            SMS
                          </span>
                        </label>

                        <label className="flex items-center">
                          <input type="checkbox" name="phone" />
                          <span className="ml-2 text-lg">
                            <BiPhoneCall className=" inline text-3xl text-gray-600" />{" "}
                            Phone
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </form>
            </div>
            {/* <br />
            <br />
            <br /> */}
          </div>
          <div className="mt-8 text-center  pb-7">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Note: To enable WhatsApp
            </h1>
            <p className="text-gray-600">Please scan the given QR code and hit the send button</p>
            <img
              src="/qr code.PNG"
              alt="QR code"
              className="h-32 mx-auto mt-2"
            />
            <p className="text-gray-600">
              Or, on WhatsApp, text "join plate-charge" to the number
              +14155238886
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
