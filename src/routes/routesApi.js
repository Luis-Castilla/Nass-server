const express = require("express");
const router = express.Router(); //En este objeto definimos la rutas de nuestro servidor
const userCtrl = require("../controllers/auth");
const calendarCtrl = require("../controllers/calendarController");
const clinicalHistoryCtrl = require("../controllers/clinicalHistoryController");
const companyCtrl = require("../controllers/companyController");
const contractCtrl = require("../controllers/contractController");
const emphasisCtrl = require("../controllers/emphasisController");
const complementaryTestCtrl = require("../controllers/complementaryTestController");
const examTypeCtrl = require("../controllers/examTytpeController");
const ocupationalCertificateCtrl = require("../controllers/ocupationalCertificateController");
const patientCtrl = require("../controllers/patientController");
const recomendationtCtrl = require("../controllers/recomendationController");
const auth = require("../middleware/auth");

// User routes
router.post("/user/login", userCtrl.logIn);
router.post("/user/signUp", userCtrl.signUp);
router.get("/user/detail/", auth, userCtrl.getUser);
router.post("/user/update/:userId", auth, userCtrl.updateUser);

// Calendar routes
router.post("/calendar/create", auth, calendarCtrl.createCalendar);
router.get("/calendar/", auth, calendarCtrl.getCalendar);
router.get("/calendar/detail/:calendarId", auth, calendarCtrl.getCalendarById);
router.put(
  "/calendar/update/:calendarId",
  auth,
  calendarCtrl.updateCalendarById
);
router.delete(
  "/calendar/delete/:calendarId",
  auth,
  calendarCtrl.deleteCalendarById
);

// Clinical History routes
router.post(
  "/clinical-history/create",
  clinicalHistoryCtrl.createClinicalHistory
);
router.get("/clinical-history/", clinicalHistoryCtrl.getClinicalHistory);
router.get(
  "/clinical-history/detail/:clinicalHistoryId",
  clinicalHistoryCtrl.getClinicalHistoryById
);
router.put(
  "/clinical-history/update/:clinicalHistoryId",
  clinicalHistoryCtrl.updateClinicalHistoryById
);
router.delete(
  "/clinical-history/delete/:clinicalHistoryId",
  clinicalHistoryCtrl.deleteClinicalHistoryById
);

// Company routes
router.post("/company/create", companyCtrl.createCompany);
router.get("/company/", companyCtrl.getCompany);
router.get("/company/detail/:companyId", companyCtrl.getCompanyById);
router.put("/company/update/:companyId", companyCtrl.updateCompanyById);
router.delete("/company/delete/:companyId", companyCtrl.deleteCompanyById);

// Complementary Test routes
router.post(
  "/complementary-test/create",
  auth,
  complementaryTestCtrl.createComplementaryTest
);
router.get(
  "/complementary-test/",
  auth,
  complementaryTestCtrl.getComplementaryTest
);
router.get(
  "/complementary-test/detail/:complementaryId",
  auth,
  complementaryTestCtrl.getComplementaryTestById
);
router.put(
  "/complementary-test/update/:complementaryId",
  auth,
  complementaryTestCtrl.updateComplementaryTestById
);
router.delete(
  "/complementary-test/delete/:complementaryId",
  auth,
  complementaryTestCtrl.deleteComplementaryTestById
);

// Contract routes
router.post("/contract/create", contractCtrl.createContract);
router.get("/contract/", contractCtrl.getContract);
router.get("/contract/detail/:contractId", contractCtrl.getContractById);
router.put("/contract/update/:contractId", contractCtrl.updateContractById);
router.delete("/contract/delete/:contractId", contractCtrl.deleteContractById);

// Emphasis routes
router.post("/emphasis/create", auth, emphasisCtrl.createEmphasis);
router.get("/emphasis/", emphasisCtrl.getEmphasis);
router.get("/emphasis/detail/:emphasisId", auth, emphasisCtrl.getEmphasisById);
router.put(
  "/emphasis/update/:emphasisId",
  auth,
  emphasisCtrl.updateEmphasisById
);
router.delete(
  "/emphasis/delete/:emphasisId",
  auth,
  emphasisCtrl.deleteEmphasisById
);

// Exam Type routes
router.post("/exam-type/create", auth, examTypeCtrl.createExamType);
router.get("/exam-type/", examTypeCtrl.getExamType);
router.get("/exam-type/detail/:examTypeId", auth, examTypeCtrl.getExamTypeById);
router.put(
  "/exam-type/update/:examTypeId",
  auth,
  examTypeCtrl.updateExamTypeById
);
router.delete(
  "/exam-type/delete/:examTypeId",
  auth,
  examTypeCtrl.deleteExamTypeById
);

// Ocupational Certificate routes
router.post(
  "/ocupational-certificate/create",
  auth,
  ocupationalCertificateCtrl.createOcupationalCertificate
);
router.get(
  "/ocupational-certificate/",
  auth,
  ocupationalCertificateCtrl.getOcupationalCertificate
);
router.get(
  "/ocupational-certificate/detail/:ocupationalCertificateId",
  auth,
  ocupationalCertificateCtrl.getOcupationalCertificateById
);
router.put(
  "/ocupational-certificate/update/:ocupationalCertificateId",
  auth,
  ocupationalCertificateCtrl.updateOcupationalCertificateById
);
router.delete(
  "/ocupational-certificate/delete/:ocupationalCertificateId",
  auth,
  ocupationalCertificateCtrl.deleteOcupationalCertificateById
);

// Patient routes
router.post("/patient/create", patientCtrl.createPatient);
router.get("/patient/", patientCtrl.getPatient);
router.get("/patient/detail/:patientId", patientCtrl.getPatientById);
router.put("/patient/update/:patientId", patientCtrl.updatePatientById);
router.delete("/patient/delete/:patientId", patientCtrl.deletePatientById);

// Recomendation routes
router.post(
  "/Recomendation/create",
  auth,
  recomendationtCtrl.createRecomendation
);
router.get("/Recomendation/", auth, recomendationtCtrl.getRecomendation);
router.get(
  "/Recomendation/detail/:recomendationId",
  auth,
  recomendationtCtrl.getRecomendationById
);
router.put(
  "/Recomendation/update/:recomendationId",
  auth,
  recomendationtCtrl.updateRecomendationById
);
router.delete(
  "/Recomendation/delete/:recomendationId",
  auth,
  recomendationtCtrl.deleteRecomendationById
);

module.exports = router;
