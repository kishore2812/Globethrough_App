import React, { createContext, useState } from "react";

// Define the shape of the context state
interface UserContextType {
  userName: string;
  mobileNumber: string;
  emailId: string; // Add this
  setUserName: (name: string) => void;
  setMobileNumber: (number: string) => void;
  setEmailId: (email: string) => void; // Ensure this is defined properly
}
//Step1: creating context
export const UserContext = createContext<UserContextType>({
  userName: "",
  mobileNumber: "",
  emailId: "", // Add default value
  setUserName: () => {},
  setMobileNumber: () => {},
  setEmailId: () => {},
});

//Step2: provider is the property of the context component 
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState("user");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");

  return (
    <UserContext.Provider value={{ userName, setUserName, mobileNumber, setMobileNumber, emailId, setEmailId }}>
      {children}
    </UserContext.Provider>
  );
};