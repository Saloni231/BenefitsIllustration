import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import api from "../../axios/api";

const PolicyDetails = () => {
  const [policyDetails, setPolicyDetails] = useState([]);

  const policyData = [
    { label: "Name", value: "name" }, // Added Name
    { label: "DOB", value: "dob" },
    { label: "Gender", value: "gender" },
    { label: "Sum Assured", value: "sum_assured" },
    { label: "Modal Premium", value: "modal_premium" },
    { label: "Premium Frequency", value: "premium_frequency" },
    { label: "Policy Term", value: "policy_term" },
    { label: "Premium Payment Term", value: "premium_payment_term" },
  ];

  const loadPolicyDetails = async () => {
    try {
      const response = await api.get("/policyDetails", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.response);
      setPolicyDetails(response.data.response);
    } catch (err) {
      console.log("Can not fetch data");
    }
  };

  useEffect(() => {
    loadPolicyDetails();
  }, []);

  return (
    <CCard className="mx-4 my-4">
      <CCardHeader className="bg-primary text-white text-center">
        POLICY DETAILS
      </CCardHeader>
      <CCardBody>
        <CRow>
          {policyData.map((item, index) => (
            <CCol xs="12" sm="6" key={index} className="mb-3">
              <CCard className="border-light shadow-sm">
                <CCardBody className="d-flex justify-content-between">
                  <strong>{item.label}:</strong>
                  <span>{policyDetails[item.value]}</span>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default PolicyDetails;
