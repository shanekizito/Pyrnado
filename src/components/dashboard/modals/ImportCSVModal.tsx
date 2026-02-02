import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface ImportCSVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ImportCSVModal({ isOpen, onClose }: ImportCSVModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
                toast.error("Please select a valid CSV file");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        setIsUploading(true);
        // Simulate upload
        setTimeout(() => {
            setIsUploading(false);
            toast.success("CSV imported successfully. 12 workers added.");
            onClose();
            setFile(null);
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                        <Upload className="w-5 h-5 text-emerald-500" />
                        Import Workers via CSV
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground font-medium">
                        Batch add workers by uploading a CSV file following our required format.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Instructions / Demo Format */}
                    <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            <Info className="w-3.5 h-3.5" />
                            Required CSV Format
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-[11px] text-muted-foreground border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-2 px-1 font-bold">name</th>
                                        <th className="text-left py-2 px-1 font-bold">email</th>
                                        <th className="text-left py-2 px-1 font-bold">role</th>
                                        <th className="text-left py-2 px-1 font-bold">country</th>
                                        <th className="text-left py-2 px-1 font-bold">wallet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border/40">
                                        <td className="py-2 px-1 text-foreground font-medium">John Doe</td>
                                        <td className="py-2 px-1 text-foreground font-medium">john@example.com</td>
                                        <td className="py-2 px-1 text-foreground font-medium">Developer</td>
                                        <td className="py-2 px-1 text-foreground font-medium">USA</td>
                                        <td className="py-2 px-1 text-muted-foreground font-mono">0x123...abc</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-1 text-foreground font-medium">Jane Smith</td>
                                        <td className="py-2 px-1 text-foreground font-medium">jane@example.com</td>
                                        <td className="py-2 px-1 text-foreground font-medium">Designer</td>
                                        <td className="py-2 px-1 text-foreground font-medium">UK</td>
                                        <td className="py-2 px-1 text-muted-foreground font-mono">0x456...def</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic font-medium">
                            * Ensure headers match exactly. Wallet addresses must be valid Ethereum/EVM addresses.
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div
                        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${file ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-emerald-500/30 bg-muted/20"
                            }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                const droppedFile = e.dataTransfer.files[0];
                                if (droppedFile.name.endsWith(".csv")) {
                                    setFile(droppedFile);
                                } else {
                                    toast.error("Please drop a CSV file");
                                }
                            }
                        }}
                    >
                        {file ? (
                            <div className="text-center space-y-3">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                    <FileText className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">{file.name}</p>
                                    <p className="text-xs text-muted-foreground font-medium">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setFile(null)}
                                    className="text-muted-foreground hover:text-red-500"
                                >
                                    Remove file
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto shadow-sm">
                                    <Upload className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground font-medium">CSV files only (max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="csv-upload"
                                />
                                <Button
                                    variant="outline"
                                    className="bg-card border-border hover:bg-muted text-foreground font-bold shadow-sm"
                                    onClick={() => document.getElementById("csv-upload")?.click()}
                                >
                                    Select CSV
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="pt-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="bg-muted hover:bg-muted/80 text-foreground border-none font-bold"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!file || isUploading}
                        onClick={handleUpload}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold min-w-[140px]"
                    >
                        {isUploading ? "Importing..." : "Start Import"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
