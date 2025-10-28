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
import CreateAdditionalAccount from "@/pages/additional-account/CreateAdditionalAccount";
import AmendAdditionalAccount from "@/pages/additional-account/AmendAdditionalAccount";
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
            <Route path="/additional-account/create" element={<CreateAdditionalAccount />} />
            <Route path="/additional-account/amend" element={<AmendAdditionalAccount />} />
            <Route path="/additional-account/create-cm" element={<CreateAdditionalCMAccount />} />
            <Route path="/additional-account/amend-cm" element={<AmendAdditionalCMAccount />} />
            <Route path="/home" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
