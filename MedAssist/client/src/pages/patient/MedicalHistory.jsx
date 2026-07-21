import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaFileMedical,
  FaArrowUpFromBracket,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileLines,
  FaEye,
} from "react-icons/fa6";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import {
  getPatientRecords,
  uploadMedicalRecord,
} from "../../services/patientService";

function PatientMedicalHistory() {


  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await getPatientRecords();
      setRecords(res.records || res || []);
    } catch (err) {
      toast.error("Failed to load medical records log.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      setUploading(true);
      await uploadMedicalRecord(formData);
      toast.success("Document uploaded successfully.");
      setFile(null);
      setDescription("");
      // Reset file input value
      document.getElementById("record-file-input").value = "";
      fetchRecords();
    } catch (err) {
      toast.error("Failed to upload document. Please ensure size is within 5MB.");
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return <FaFilePdf className="text-rose-500" />;
    if (["jpg", "jpeg", "png", "webp"].includes(ext))
      return <FaFileImage className="text-emerald-500" />;
    if (["doc", "docx"].includes(ext))
      return <FaFileWord className="text-blue-500" />;
    return <FaFileLines className="text-slate-400" />;
  };

  return (
    <DashboardLayout showSOS={true}>

          {/* Page Headers */}
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Medical History</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Store, access, and share clinical documents, prescription scans, and laboratory reports securely.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8">
            
            {/* Upload File Form */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <div className="flex items-center gap-3 text-teal-650 mb-6">
                  <FaArrowUpFromBracket className="text-lg" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Upload Health Document</h3>
                </div>

                <form onSubmit={handleUpload} className="space-y-4">
                  
                  {/* Document File Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Select File (PDF, Image, Doc up to 5MB)</label>
                    <input
                      id="record-file-input"
                      type="file"
                      required
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-300 outline-none cursor-pointer focus:border-teal-650"
                    />
                  </div>

                  {/* Document Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Description / Report Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Lab blood report, X-Ray diagnostics"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-teal-650"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full" loading={uploading}>
                      Upload Document
                    </Button>
                  </div>

                </form>
              </div>
            </div>

            {/* List Uploaded Documents */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-6 flex items-center gap-3">
                  <FaFileMedical className="text-teal-600" />
                  Uploaded Documents
                </h3>

                {loading ? (
                  <div className="py-20 text-center">
                    <span className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                  </div>
                ) : records.length === 0 ? (
                  <div className="py-16 text-center text-slate-450 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    <p className="text-sm">No uploaded clinical logs found. Submit one on the left to start.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {records.map((rec) => (
                      <div
                        key={rec._id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between group hover:border-teal-600/40 transition duration-150"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center text-lg">
                            {getFileIcon(rec.fileName)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{rec.description}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Uploaded on {new Date(rec.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <a
                          href={`http://localhost:5000/uploads/${rec.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-800 dark:bg-slate-900 dark:text-teal-400 dark:hover:bg-slate-850 opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 transition duration-150"
                          title="View Document"
                        >
                          <FaEye className="text-xs" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
    </DashboardLayout>
  );
}

export default PatientMedicalHistory;
