import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Download, Trash } from "lucide-react";

// Déclarez le type pour vos fichiers
type FileItem = {
  path: string;
  size: string;
  content: Blob;
  folder?: string;
};

function ListFileDownload() {
  const [fileList, setFileList] = useState<FileItem[]>([]);

  // Charger les fichiers enregistrés dans le localStorage
  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles) as Record<string, FileItem[]>;
      // Fusionner tous les fichiers de tous les dossiers dans une seule liste
      const allFiles = Object.values(parsedFiles).flat();
      setFileList(allFiles);
    }
  }, []);

  // Fonction pour télécharger un fichier
  const handleDownload = (file: FileItem) => {
    const fileName = file.path.replace("./", "");
    const url = URL.createObjectURL(file.content);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Fonction pour supprimer un fichier
  const handleDelete = (index: number) => {
    const updatedFiles = [...fileList];
    updatedFiles.splice(index, 1);
    setFileList(updatedFiles);

    // Mettre à jour le localStorage
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles) as Record<string, FileItem[]>;
      const updatedStorage = Object.values(parsedFiles)
        .flat()
        .filter((_, i) => i !== index);
      localStorage.setItem(
        "uploadedFiles",
        JSON.stringify(
          updatedStorage.reduce((acc, file) => {
            const folder = file.folder || "default";
            acc[folder] = acc[folder] || [];
            acc[folder].push(file);
            return acc;
          }, {} as Record<string, FileItem[]>)
        )
      );
    }
  };

  return (
    <section className="max-w-screen-md mx-auto pt-16">
      {fileList.length === 0 ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div>
          <Breadcrumb className="pb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-gray-600 hover:text-gray-500 font-bold"
                  href="/"
                >
                  Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-600 font-bold">
                  AllFiles
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Table className="border">
            <TableHeader>
              <TableRow className="border border-none bg-muted/10">
                <TableHead className="text-gray-700 text-lg font-bold px-6 py-3">
                  File
                </TableHead>
                <TableHead className="text-gray-700 text-lg font-bold px-6 py-3">
                  Size
                </TableHead>
                <TableHead className="text-gray-700 text-lg font-bold px-6 py-3">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fileList.map((file, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-400 text-md font-bold px-6 py-3">
                    {file.path}
                  </TableCell>
                  <TableCell className="text-gray-400 text-md font-bold px-6 py-3">
                    {file.size}
                  </TableCell>
                  <TableCell className="flex items-center gap-3 px-6 py-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Download
                            className="cursor-pointer"
                            onClick={() => handleDownload(file)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDelete(index)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}

export default ListFileDownload;
