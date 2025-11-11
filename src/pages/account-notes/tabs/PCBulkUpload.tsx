import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, X } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  status: string;
}

const PCBulkUpload: React.FC = () => {
  const [formData, setFormData] = useState({
    branchCode: "",
    uploadType: "",
    period: "",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "PC_BULI_Report_Q1_2024.xlsx",
      size: "2.5 MB",
      type: "Excel",
      uploadDate: "2024-01-15",
      status: "Processed",
    },
    {
      id: "2",
      name: "PC_BULI_Data_Q4_2023.xlsx",
      size: "1.8 MB",
      type: "Excel",
      uploadDate: "2024-01-10",
      status: "Pending Review",
    },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type.includes('excel') || file.name.includes('.xlsx') || file.name.includes('.xls') ? 'Excel' : 'Other',
        uploadDate: new Date().toISOString().split('T')[0],
        status: "Uploaded",
      };
      setUploadedFiles(prev => [newFile, ...prev]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PC Bulk Upload submitted:", formData);
    // Handle form submission logic here
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                PC Bulk Upload
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">PC Bulk Upload</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="branchCode">Branch Code *</Label>
                        <Input
                          id="branchCode"
                          value={formData.branchCode}
                          onChange={(e) => handleInputChange("branchCode", e.target.value)}
                          placeholder="Enter branch code"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="uploadType">Upload Type *</Label>
                        <Select value={formData.uploadType} onValueChange={(value) => handleInputChange("uploadType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select upload type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quarterly-report">Quarterly Report</SelectItem>
                            <SelectItem value="annual-report">Annual Report</SelectItem>
                            <SelectItem value="compliance-data">Compliance Data</SelectItem>
                            <SelectItem value="audit-data">Audit Data</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="period">Period *</Label>
                        <Select value={formData.period} onValueChange={(value) => handleInputChange("period", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="q1-2024">Q1 2024</SelectItem>
                            <SelectItem value="q2-2024">Q2 2024</SelectItem>
                            <SelectItem value="q3-2024">Q3 2024</SelectItem>
                            <SelectItem value="q4-2024">Q4 2024</SelectItem>
                            <SelectItem value="fy-2023-24">FY 2023-24</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Enter description for the upload"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>File Upload *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <Label htmlFor="file-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Upload PC BULI file
                              </span>
                              <span className="mt-1 block text-xs text-gray-500">
                                Excel files up to 10MB
                              </span>
                            </Label>
                            <Input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".xlsx,.xls,.csv"
                              onChange={handleFileUpload}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="px-8">
                        Upload File
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setFormData({
                        branchCode: "",
                        uploadType: "",
                        period: "",
                        description: "",
                      })}>
                        Clear
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Uploaded Files</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File Name</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {file.name}
                            </TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>{file.type}</TableCell>
                            <TableCell>{file.uploadDate}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                file.status === 'Processed'
                                  ? 'bg-green-100 text-green-800'
                                  : file.status === 'Pending Review'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {file.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFile(file.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PCBulkUpload;