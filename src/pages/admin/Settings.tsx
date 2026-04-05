import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDataManager } from "@/hooks/useDataManager"

const SettingsPage = () => {
  const dataManager = useDataManager();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  const [settings, setSettings] = useState({
    companyName: "Ik Engineering",
    email: "contact@ikengineering.com",
    phone: "+971-1-234-5678",
    address: "Dubai, UAE",
    website: "www.ikengineering.com",
    description:
      "Professional engineering services for construction and infrastructure projects",
    enableNotifications: true,
    enableDataBackup: true,
    enableTwoFactor: false,
  });

  const handleSave = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("settings", JSON.stringify(settings));
    }
    setShowSaveDialog(true);
    setTimeout(() => setShowSaveDialog(false), 2000);
  };

  const handleExport = () => {
    const success = dataManager.exportData();
    if (success) {
      setImportMessage("Data exported successfully!");
      setTimeout(() => setImportMessage(""), 2000);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const success = await dataManager.importData(file);
      if (success) {
        setImportMessage("Data imported successfully!");
        setTimeout(() => setImportMessage(""), 2000);
      } else {
        setImportMessage("Error importing data. Please check the file format.");
        setTimeout(() => setImportMessage(""), 3000);
      }
    }
  };

  const handleReset = () => {
    dataManager.resetToDefaults();
    setShowResetDialog(false);
    setImportMessage("Data reset to defaults successfully!");
    setTimeout(() => setImportMessage(""), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage company information and system settings
        </p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={settings.companyName}
                onChange={(e) =>
                  setSettings({ ...settings, companyName: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={settings.website}
                onChange={(e) =>
                  setSettings({ ...settings, website: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Input
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={settings.description}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Switch
              checked={settings.enableTwoFactor}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableTwoFactor: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive email notifications
              </p>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableNotifications: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Auto Backup</p>
              <p className="text-sm text-muted-foreground">
                Automatically backup your data
              </p>
            </div>
            <Switch
              checked={settings.enableDataBackup}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableDataBackup: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Backup, restore, or reset your dashboard data. Currently using local
            storage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> All data is stored locally in your browser.
              It will be replaced with backend API integration soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download all your data as a JSON file for backup
              </p>
              <Button
                variant="outline"
                onClick={handleExport}
                className="w-full"
              >
                Export Data
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Import Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Restore data from a previously exported file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Import Data
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Reset to Defaults</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Clear all data and return to default mock data
              </p>
              <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                <Button
                  variant="destructive"
                  onClick={() => setShowResetDialog(true)}
                  className="w-full"
                >
                  Reset
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset to Defaults?</DialogTitle>
                    <DialogDescription>
                      This action will clear all your data and return to the
                      default mock data. This cannot be undone unless you have a
                      backup.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowResetDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReset}>
                      Reset Data
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      {showSaveDialog && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-lg">
          <p className="font-medium">Settings saved successfully!</p>
        </div>
      )}

      {importMessage && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            importMessage.includes("Error")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          <p className="font-medium">{importMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
