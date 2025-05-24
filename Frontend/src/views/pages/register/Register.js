import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { encryptMessage } from "../../../utils";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    name: "",
    dob: "",
    gender: "",
    policyType: "",
    sumAssured: "",
    premiumFrequency: "",
    modalPremium: "",
    policyTerm: "",
    premiumPaymentTerm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/register/public-key");
      const data = await response.json();
      const encryptData = await encryptMessage(formData, data.publicKey);
      const payload = {encryptData};
      const res = await fetch("http://localhost:3002/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      console.log('Server response:', result)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Username */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>UserName</CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </CInputGroup>

                  {/* Mobile Number */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Mobile</CInputGroupText>
                    <CFormInput
                      type="tel"
                      placeholder="Enter mobile number"
                      maxLength={10}
                      value={formData.mobile}
                      onInput={(e) => {
                        const value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 10);
                        setFormData({ ...formData, mobile: value });
                      }}
                    />
                  </CInputGroup>

                  {/* Password */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Password</CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </CInputGroup>

                  {/* Confirm Password */}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>Confirm</CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </CInputGroup>

                  {/* Name */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Name</CInputGroupText>
                    <CFormInput
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </CInputGroup>

                  {/* DOB */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>DOB</CInputGroupText>
                    <CFormInput
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                    />
                  </CInputGroup>

                  {/* Gender */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Gender</CInputGroupText>
                    <CFormSelect
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      <option>Select Gender</option>
                      <option value="male">M</option>
                      <option value="female">F</option>
                      <option value="other">Other</option>
                    </CFormSelect>
                  </CInputGroup>

                  {/* Policy Type */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Policy Type</CInputGroupText>
                    <CFormSelect
                      value={formData.policyType}
                      onChange={(e) =>
                        setFormData({ ...formData, policyType: e.target.value })
                      }
                    >
                      <option>Select Policy Type</option>
                      <option value="term">Term</option>
                      <option value="whole">Whole Life</option>
                      <option value="endowment">Endowment</option>
                    </CFormSelect>
                  </CInputGroup>

                  {/* Sum Assured */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Sum Assured</CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Enter amount"
                      value={formData.sumAssured}
                      onChange={(e) =>
                        setFormData({ ...formData, sumAssured: e.target.value })
                      }
                    />
                  </CInputGroup>

                  {/* Premium Frequency */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Premium Frequency</CInputGroupText>
                    <CFormSelect
                      value={formData.premiumFrequency}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          premiumFrequency: e.target.value,
                        })
                      }
                    >
                      <option>Select Frequency</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </CFormSelect>
                  </CInputGroup>

                  {/* Modal Premium */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Modal Premium</CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Enter premium"
                      value={formData.modalPremium}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          modalPremium: e.target.value,
                        })
                      }
                    />
                  </CInputGroup>

                  {/* Policy Term */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Policy Term (Years)</CInputGroupText>
                    <CFormInput
                      type="number"
                      value={formData.policyTerm}
                      onChange={(e) =>
                        setFormData({ ...formData, policyTerm: e.target.value })
                      }
                    />
                  </CInputGroup>

                  {/* Premium Payment Term */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      Premium Payment Term (Years)
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      value={formData.premiumPaymentTerm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          premiumPaymentTerm: e.target.value,
                        })
                      }
                    />
                  </CInputGroup>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
