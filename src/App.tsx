import CloseAccount from "./pages/close-account/CloseAccount";
import CloseAccountByDraft from "./pages/close-account/CloseAccountByDraft";
import SafeCustodyRegisterEnquiry from "./pages/safe-custody/SafeCustodyRegisterEnquiry";
import SafeCustodyCreation from "./pages/safe-custody/SafeCustodyCreation";
import SafeCustodyLiquidation from "./pages/safe-custody/SafeCustodyLiquidation";
import SafeCustodyLiquidationDetail from "./pages/safe-custody/SafeCustodyLiquidationDetail";
import NewAccountMsg from "./pages/account-notes/tabs/NewAccountMsg";
import AmendAccountMsg from "./pages/account-notes/tabs/AmendAccountMsg";
import EnquiryAccountMsg from "./pages/account-notes/tabs/EnquiryAccountMsg";
import CancelAccountMsg from "./pages/account-notes/tabs/CancelAccountMsg";
import AccountMandateAmendment from "./pages/account-notes/tabs/AccountMandateAmendment";
import SpecialCustomerReg from "./pages/account-notes/tabs/SpecialCustomerReg";
import PCBulkUpload from "./pages/account-notes/tabs/PCBulkUpload";
import RelationRemoval from "./pages/account-notes/tabs/RelationRemoval";
import AccountMinWaiver from "./pages/account-notes/tabs/AccountMinWaiver";
import AddCustomerRelationship from "./pages/static-amendment/AddCustomerRelationship";
import CustomerCare from "./pages/static-amendment/CustomerCare";
import ApproveCustomerRelationship from "./pages/static-amendment/ApproveCustomerRelationship";
import DeceasedCustomer from "./pages/static-amendment/DeceasedCustomer";
import CustomerMappingEnquiry from "./pages/static-amendment/CustomerMappingEnquiry";
import DeceasedCustomerEnquiry from "./pages/static-amendment/DeceasedCustomerEnquiry";
import DeceasedCustomerApproval from "./pages/static-amendment/DeceasedCustomerApproval";
import AmendCustomerSectorSegment from "./pages/static-amendment/AmendCustomerSectorSegment";
import UploadedBlacklistSetup from "./pages/static-amendment/UploadedBlacklistSetup";
import CustomerTypeRetagging from "./pages/static-amendment/CustomerTypeRetagging";
import CustomerTypeRetaggingApp from "./pages/static-amendment/CustomerTypeRetaggingApp";
import CustomerRMRetaggingApproval from "./pages/static-amendment/CustomerRMRetaggingApproval";
import CustomerMDACodeTagging from "./pages/static-amendment/CustomerMDACodeTagging";
import CustomerMerge from "./pages/static-amendment/CustomerMerge";
import CustomerMergeVerification from "./pages/static-amendment/CustomerMergeVerification";
import CustomerMergeApproval from "./pages/static-amendment/CustomerMergeApproval";
import AmendCustomerRelationship from "./pages/static-amendment/AmendCustomerRelationship";
import RiskReview from "./pages/static-amendment/RiskReview";
import RiskReviewApproval from "./pages/static-amendment/RiskReviewApproval";
import RiskReviewComplianceApp from "./pages/static-amendment/RiskReviewComplianceApp";
import ChequebookIssuance from "./pages/cheques/ChequebookIssuance";
import ChequeMaintenance from "./pages/cheques/ChequeMaintenance";
import ChequebookMaintenanceApproval from "./pages/cheques/ChequebookMaintenanceApproval";
import CounterCheques from "./pages/cheques/CounterCheques";
import ChequebookRequest from "./pages/cheques/ChequebookRequest";
import UntaggedStoppedCheques from "./pages/cheques/UntaggedStoppedCheques";
import StoppedChequeCreation from "./pages/cheques/StoppedChequeCreation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import IndividualJointAccountCreation from "./pages/IndividualJointAccountCreation";
import CorporateAccountCreation from "./pages/CorporateAccountCreation";
import LienCreation from "./pages/account-mgmt/LienCreation";
import LienCancellation from "./pages/account-mgmt/LienCancellation";
import AccountBlockage from "@/pages/account-mgmt/AccountBlockage";
import DormantAccountReactivation from "@/pages/account-mgmt/DormantAccountReactivation";
import CreateAdditionalCMAccount from "@/pages/additional-account/CreateAdditionalCMAccount";
import AmendAdditionalCMAccount from "@/pages/additional-account/AmendAdditionalCMAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/account-creation/individual" element={<IndividualJointAccountCreation />} />
            <Route path="/account-creation/corporate" element={<CorporateAccountCreation />} />
            <Route path="/account-mgmt/lien-creation" element={<LienCreation />} />
            <Route path="/account-mgmt/lien-cancellation" element={<LienCancellation />} />
            <Route path="/account-mgmt/blockage" element={<AccountBlockage />} />
            <Route path="/account-mgmt/reactivation" element={<DormantAccountReactivation />} />
            <Route path="/additional-account/create-cm" element={<CreateAdditionalCMAccount />} />
            <Route path="/additional-account/amend-cm" element={<AmendAdditionalCMAccount />} />
            <Route path="/home" element={<Index />} />
            <Route path="/close-account/close" element={<CloseAccount />} />
            <Route path="/close-account/by-draft" element={<CloseAccountByDraft />} />
            <Route path="/safe-custody/register-enquiry" element={<SafeCustodyRegisterEnquiry />} />
            <Route path="/safe-custody/creation" element={<SafeCustodyCreation />} />
            <Route path="/safe-custody/liquidation" element={<SafeCustodyLiquidation />} />
            <Route path="/safe-custody/liquidation/:requisitionNo" element={<SafeCustodyLiquidationDetail />} />
            <Route path="/account-notes/new-account-msg" element={<NewAccountMsg />} />
            <Route path="/account-notes/amend-account-msg" element={<AmendAccountMsg />} />
            <Route path="/account-notes/enquiry-account-msg" element={<EnquiryAccountMsg />} />
            <Route path="/account-notes/cancel-account-msg" element={<CancelAccountMsg />} />
            <Route path="/account-notes/mandate-amendment" element={<AccountMandateAmendment />} />
            <Route path="/account-notes/special-customer-reg" element={<SpecialCustomerReg />} />
            <Route path="/account-notes/pc-bulk-upload" element={<PCBulkUpload />} />
            <Route path="/account-notes/relation-removal" element={<RelationRemoval />} />
            <Route path="/account-notes/account-min-waiver" element={<AccountMinWaiver />} />
            <Route path="/static-amendment/add-customer-relationship" element={<AddCustomerRelationship />} />
            <Route path="/static-amendment/customer-care" element={<CustomerCare />} />
            <Route path="/static-amendment/approve-customer-relationship" element={<ApproveCustomerRelationship />} />
            <Route path="/static-amendment/deceased-customer" element={<DeceasedCustomer />} />
            <Route path="/static-amendment/customer-mapping-enquiry" element={<CustomerMappingEnquiry />} />
            <Route path="/static-amendment/deceased-customer-enquiry" element={<DeceasedCustomerEnquiry />} />
            <Route path="/static-amendment/deceased-customer-approval" element={<DeceasedCustomerApproval />} />
            <Route path="/static-amendment/amend-customer-sector-segment" element={<AmendCustomerSectorSegment />} />
            <Route path="/static-amendment/uploaded-blacklist-setup" element={<UploadedBlacklistSetup />} />
            <Route path="/static-amendment/customer-type-retagging" element={<CustomerTypeRetagging />} />
            <Route path="/static-amendment/customer-type-retagging-app" element={<CustomerTypeRetaggingApp />} />
            <Route path="/static-amendment/customer-rm-retagging-approval" element={<CustomerRMRetaggingApproval />} />
            <Route path="/static-amendment/customer-mda-code-tagging" element={<CustomerMDACodeTagging />} />
            <Route path="/static-amendment/customer-merge" element={<CustomerMerge />} />
            <Route path="/static-amendment/customer-merge-verification" element={<CustomerMergeVerification />} />
            <Route path="/static-amendment/customer-merge-approval" element={<CustomerMergeApproval />} />
            <Route path="/static-amendment/amend-customer-relationship" element={<AmendCustomerRelationship />} />
            <Route path="/static-amendment/risk-review" element={<RiskReview />} />
            <Route path="/static-amendment/risk-review-approval" element={<RiskReviewApproval />} />
            <Route path="/static-amendment/risk-review-compliance-app" element={<RiskReviewComplianceApp />} />
            <Route path="/cheques/counter-enquiry" element={<CounterCheques />} />
            <Route path="/cheques/counter-approval" element={<CounterCheques />} />
            <Route path="/cheques/request" element={<ChequebookRequest />} />
            <Route path="/cheques/issuance" element={<ChequebookIssuance />} />
            <Route path="/cheques/maintenance" element={<ChequeMaintenance />} />
            <Route path="/cheques/maintenance-approval" element={<ChequebookMaintenanceApproval />} />
            <Route path="/cheques/stopped-creation" element={<StoppedChequeCreation />} />
            <Route path="/cheques/untagged-stopped" element={<UntaggedStoppedCheques />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
