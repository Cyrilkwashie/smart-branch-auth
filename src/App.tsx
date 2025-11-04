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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
