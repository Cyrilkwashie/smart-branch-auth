import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const RiskReview: React.FC = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerRisk, setCustomerRisk] = useState("");
  
  // Section 1: Name Screening
  const [sanction, setSanction] = useState("");
  const [adverseMedia, setAdverseMedia] = useState("");
  const [politicalExposedPerson, setPoliticalExposedPerson] = useState("");
  
  // Section 2: Location
  const [branch, setBranch] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [locationScore, setLocationScore] = useState("0");
  
  // Section 3: Customer Type
  const [customerType1, setCustomerType1] = useState("");
  const [customerType2, setCustomerType2] = useState("");
  const [customerType3, setCustomerType3] = useState("");
  const [customerTypeScore, setCustomerTypeScore] = useState("0");
  
  // Section 4: Product
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");
  const [productScore, setProductScore] = useState("0");
  
  // Section 5: Channel
  const [channel1, setChannel1] = useState("");
  const [channel2, setChannel2] = useState("");
  const [channelScore, setChannelScore] = useState("0");
  
  // PEP Evaluation
  const [customerPepEvaluationScore, setCustomerPepEvaluationScore] = useState("0");

  const handleGenerateResults = () => {
    // Calculate total risk score
    const total = 
      parseInt(locationScore || "0") + 
      parseInt(customerTypeScore || "0") + 
      parseInt(productScore || "0") + 
      parseInt(channelScore || "0") + 
      parseInt(customerPepEvaluationScore || "0");
    
    alert(`Risk Assessment Results Generated!\nTotal Score: ${total}\nRefer to scoreboard for risk level.`);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden overflow-y-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                Risk Review
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Customer Information Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerNumber">Customer Number</Label>
                      <Input
                        id="customerNumber"
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)}
                        placeholder="Enter Customer Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerRisk">Customer Risk</Label>
                      <Input
                        id="customerRisk"
                        value={customerRisk}
                        onChange={(e) => setCustomerRisk(e.target.value)}
                        placeholder="Enter Customer Risk"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 1: Name Screening */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Section 1: Name Screening</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sanction">Sanction</Label>
                      <Select value={sanction} onValueChange={setSanction}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sanction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adverseMedia">Adverse Media</Label>
                      <Select value={adverseMedia} onValueChange={setAdverseMedia}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Adverse Media" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="politicalExposedPerson">Political Exposed Person</Label>
                      <Select value={politicalExposedPerson} onValueChange={setPoliticalExposedPerson}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select PEP Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="related">Related to PEP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Location */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Section 2: Location</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select value={branch} onValueChange={setBranch}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">001</SelectItem><SelectItem value="002">002</SelectItem><SelectItem value="003">003</SelectItem><SelectItem value="004">004</SelectItem><SelectItem value="005">005</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                      <Select value={countryOfOrigin} onValueChange={setCountryOfOrigin}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="kenya">Kenya</SelectItem>
                          <SelectItem value="south-africa">South Africa</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="countryOfResidence">Country of Residence</Label>
                      <Select value={countryOfResidence} onValueChange={setCountryOfResidence}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="kenya">Kenya</SelectItem>
                          <SelectItem value="south-africa">South Africa</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <Label htmlFor="locationScore">Location Score</Label>
                    <Input
                      id="locationScore"
                      value={locationScore}
                      onChange={(e) => setLocationScore(e.target.value)}
                      className="mt-1 bg-gray-50 font-semibold"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Customer Type */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Section 3: Customer Type</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerType1">Customer Type 1</Label>
                      <Select value={customerType1} onValueChange={setCustomerType1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type 1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="sme">SME</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerType2">Customer Type 2</Label>
                      <Select value={customerType2} onValueChange={setCustomerType2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type 2" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="private">Private Banking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerType3">Customer Type 3</Label>
                      <Select value={customerType3} onValueChange={setCustomerType3}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type 3" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low-value">Low Value</SelectItem>
                          <SelectItem value="mid-value">Mid Value</SelectItem>
                          <SelectItem value="high-value">High Value</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <Label htmlFor="customerTypeScore">Customer Type Score</Label>
                    <Input
                      id="customerTypeScore"
                      value={customerTypeScore}
                      onChange={(e) => setCustomerTypeScore(e.target.value)}
                      className="mt-1 bg-gray-50 font-semibold"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Product */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Section 4: Product</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="product1">Product 1</Label>
                      <Select value={product1} onValueChange={setProduct1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product 1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings Account</SelectItem>
                          <SelectItem value="current">Current Account</SelectItem>
                          <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                          <SelectItem value="loan">Loan Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product2">Product 2</Label>
                      <Select value={product2} onValueChange={setProduct2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product 2" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debit-card">Debit Card</SelectItem>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="mobile-banking">Mobile Banking</SelectItem>
                          <SelectItem value="internet-banking">Internet Banking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <Label htmlFor="productScore">Product Score</Label>
                    <Input
                      id="productScore"
                      value={productScore}
                      onChange={(e) => setProductScore(e.target.value)}
                      className="mt-1 bg-gray-50 font-semibold"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Channel */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Section 5: Channel</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="channel1">Channel 1</Label>
                      <Select value={channel1} onValueChange={setChannel1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Channel 1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branch">Branch</SelectItem>
                          <SelectItem value="atm">ATM</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="internet">Internet Banking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="channel2">Channel 2</Label>
                      <Select value={channel2} onValueChange={setChannel2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Channel 2" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pos">POS</SelectItem>
                          <SelectItem value="ussd">USSD</SelectItem>
                          <SelectItem value="agent">Agent Banking</SelectItem>
                          <SelectItem value="call-center">Call Center</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <Label htmlFor="channelScore">Channel Score</Label>
                    <Input
                      id="channelScore"
                      value={channelScore}
                      onChange={(e) => setChannelScore(e.target.value)}
                      className="mt-1 bg-gray-50 font-semibold"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>


              {/* Scoreboard above PEP Evaluation */}
              <div className="flex justify-center mb-4">
                <div className="flex gap-2 text-xs sm:text-sm font-semibold bg-muted/60 rounded-lg px-3 py-2 border border-primary/30 shadow-sm">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700">1 - Low</span>
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">2 - Medium</span>
                  <span className="px-2 py-1 rounded bg-orange-100 text-orange-700">3 - High</span>
                  <span className="px-2 py-1 rounded bg-red-100 text-red-700">4 - Refer to Compliance</span>
                </div>
              </div>

              {/* PEP Evaluation Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">PEP Evaluation</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="max-w-xs">
                    <Label htmlFor="customerPepEvaluationScore">Customer PEP Evaluation Score</Label>
                    <Input
                      id="customerPepEvaluationScore"
                      value={customerPepEvaluationScore}
                      onChange={(e) => setCustomerPepEvaluationScore(e.target.value)}
                      className="mt-1 bg-gray-50 font-semibold"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>


              {/* Generate Results Button at bottom */}
              <div className="flex justify-end mt-8">
                <Button onClick={handleGenerateResults} className="w-full sm:w-auto px-8 font-semibold">
                  Generate Results
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RiskReview;