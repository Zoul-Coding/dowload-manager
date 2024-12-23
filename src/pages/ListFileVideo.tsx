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

function ListFileVideo() {
  const [fileList, setFileList] = useState<any>({});

  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setFileList(JSON.parse(savedFiles));
    }
  }, []);

  const handleDownload = (file: any) => {
    const fileName = file.path.replace("./", "");
    const url = URL.createObjectURL(new Blob([file.content]));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (folder: string, index: number) => {
    const updatedFiles = { ...fileList };
    updatedFiles[folder].splice(index, 1);
    setFileList(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  const renderFiles = (folder: string) => {
    const files = fileList[folder] || [];

    return (
      <TableBody>
        {files.map((file: any, index: number) => (
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
                      onClick={() => handleDelete(folder, index)}
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
    );
  };

  const hasFilesInPicture = (fileList["video"] || []).length === 0;

  return (
    <section className="max-w-screen-md mx-auto pt-16">
      {hasFilesInPicture ? (
        <p className="text-center text-gray-500">No data</p>
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
                  picture
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
            {renderFiles("video")}
          </Table>
        </div>
      )}
    </section>
  );
}

export default ListFileVideo;
