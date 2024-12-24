import { Button } from "@/components/ui/button";
import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

const DragAndDropZone = () => {
  const [isFileDropped, setIsFileDropped] = useState(false);
  const [fileList, setFileList] = useState(() => {
    // Chargement des fichiers sauvegardés depuis le localStorage
    const savedFiles = localStorage.getItem("uploadedFiles");
    return savedFiles ? JSON.parse(savedFiles) : { picture: [], pdf: [], video: [] }; // Structure modifiée
  });
  const [hasError, setHasError] = useState(false);

  const getFolderForFile = (file: any) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(fileExtension)) {
      return "pdf";
    }
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return "picture";
    }
    if (["mp4", "mkv", "webm"].includes(fileExtension)) {
      return "video";
    }
  };

  const onDrop = useCallback((acceptedFiles: any, fileRejections: any) => {
    if (fileRejections.length > 0) {
      setHasError(true);
      return;
    }

    setHasError(false);

    // Organiser les fichiers en fonction de leur dossier
    const newFiles = acceptedFiles.map((file: any) => ({
      path: file.path,
      size: file.size,
      folder: getFolderForFile(file), // Détermination du dossier
    }));

    // Mettez à jour l'état fileList avec les nouveaux fichiers dans les bons dossiers
    setFileList((prevList: any) => {
      const updatedFileList = { ...prevList };

      newFiles.forEach((file: any) => {
        if (!updatedFileList[file.folder]) {
          updatedFileList[file.folder] = [];
        }
        updatedFileList[file.folder].push({
          path: file.path,
          size: file.size,
        });
      });

      return updatedFileList;
    });

    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      if (reader) {
        setIsFileDropped(true);
      }

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const handleOrganizeNow = (newFile: any) => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "{}");

    const folder = newFile.folder;
    if (!storedFiles[folder]) {
      storedFiles[folder] = [];
    }

    const isDuplicate = storedFiles[folder].some(
      (file: any) => file.path === newFile.path
    );

    if (isDuplicate) {
      toast.error("The file already exists");
      return;
    }

    storedFiles[folder].push(newFile);
    localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));

    toast.success("File organized successfully");
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
      "video/*": [".mp4", ".mkv", ".webm"],
      "application/pdf": [".pdf"],
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes {/* - Folder: {getFolderForFile(file)} */}
    </li>
  ));

  return (
    <section>
      <div className="">
        <div
          {...getRootProps({
            className: `dropzone bg-gray-100 rounded border-dashed border-2 px-16 py-20 flex justify-center items-center ${
              hasError ? "border-red-500" : "border-gray-300"
            }`,
          })}
        >
          <input {...getInputProps()} />
          <p
            className={`text-center text-${hasError ? "red-500" : "gray-400"}`}
          >
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
        {hasError && (
          <p className="text-red-500 pt-4">
            Error: Only images, videos, or PDFs are allowed!
          </p>
        )}
        {isFileDropped && (
          <aside className="pt-6">
            <h4 className="text-gray-400">Files</h4>
            <ul className="text-gray-400">{files}</ul>
          </aside>
        )}
      </div>
      <div className="flex justify-center pt-6">
        <Button
          disabled={isFileDropped === false}
          onClick={() =>
            handleOrganizeNow({
              path: acceptedFiles[0].path,
              size: acceptedFiles[0].size,
              folder: getFolderForFile(acceptedFiles[0]),
            })
          }
          className="bg-blue-700 hover:bg-blue-600 text-white rounded text-lg"
        >
          Organize Now
        </Button>
      </div>
    </section>
  );
};

export default DragAndDropZone;
