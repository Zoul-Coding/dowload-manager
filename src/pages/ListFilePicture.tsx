import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Trash } from "lucide-react";
/* import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; */

function ListFilePicture() {
  const [fileList, setFileList] = useState<any>({});
  console.log(fileList);
  

  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setFileList(JSON.parse(savedFiles));
    }
  }, []);

  const renderFiles = (folder: string) => {
    const files = fileList[folder] || [];
    console.log(files);
    
    return (
      <TableBody className="">
        {files.map((file: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-gray-400">{file.path}</TableCell>
            <TableCell className="text-gray-400">{file.size}</TableCell>
            <TableCell className="flex items-center gap-5">
              <Download className="" />
              <Trash className="text-red-600"/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  console.log(renderFiles);
  

  return (
    <section className="max-w-screen-sm mx-auto pt-16">
     {/*  <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-marronFonce font-bold" href="#">
              Annuaire
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-marronFonce font-bold" href="#">
              Evènements
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-marronFonce font-bold">
              Business
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      <Table>
        <TableHeader>
          <TableRow className="border border-none bg-gray-800">
            <TableHead>File</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {renderFiles("picture")}
      </Table>
    </section>
  );
}

export default ListFilePicture;
