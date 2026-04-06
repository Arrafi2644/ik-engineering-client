
// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { toast } from "sonner";
// import axios from "axios";
// import { Plus, Upload, X, Trash2, Layers, ImageIcon, Sparkles } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { useServices } from "@/hooks/useServices";

// interface IFeature {
//   title: string;
// }

// interface IServiceForm {
//   title: string;
//   shortDescription: string;
//   image: File | null;
//   features: IFeature[];
// }

// export default function CreateServiceModal() {
//   const [open, setOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const { refetch } = useServices();
//   const [creating, setCreating] = useState(false);

//   const { register, handleSubmit, control, reset, setValue } =
//     useForm<IServiceForm>({
//       defaultValues: {
//         title: "",
//         shortDescription: "",
//         image: null,
//         features: [{ title: ""}],
//       },
//     });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "features",
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setValue("image", file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const clearImage = () => {
//     setValue("image", null);
//     setImagePreview(null);
//   };

//   const handleClose = () => {
//     reset();
//     clearImage();
//     setOpen(false);
//   };

//   const onSubmit = async (data: IServiceForm) => {

//     if (!data.image) {
//       toast.error("Please upload a service image");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("serviceImage", data.image);
//       formData.append(
//         "data",
//         JSON.stringify({
//           title: data.title,
//           shortDescription: data.shortDescription,
//           features: data.features,
//         })
//       );
//       setCreating(true);
//      const res = await axios.post("https://ikengineering.co.nz/api/service/create-service", formData);
//      if(res.data.success) {
//        refetch();
//        toast.success("Service created successfully!");
//        setCreating(false);
//        handleClose();
//       }
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to create service");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={(val) => (val ? setOpen(true) : handleClose())}>
//       <DialogTrigger asChild>
//         <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-sm">
//           <Plus className="w-4 h-4" />
//           Create Service
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl border border-border/50">
//         {/* Header */}
//         <div className="px-6 pt-6 pb-4">
//           <DialogHeader>
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
//                 <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
//               </div>
//               <div>
//                 <DialogTitle className="text-base font-semibold">Create New Service</DialogTitle>
//                 <p className="text-xs text-muted-foreground mt-0.5">Fill in the details to add a new service</p>
//               </div>
//             </div>
//           </DialogHeader>
//         </div>

//         <Separator />

//         <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6">

//           {/* Basic Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <div className="w-1 h-4 rounded-full bg-violet-500" />
//               <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Basic Info</span>
//             </div>

//             <div className="space-y-3">
//               <div className="space-y-1.5">
//                 <Label className="text-sm font-medium">Service Title <span className="text-red-500">*</span></Label>
//                 <Input
//                   {...register("title")}
//                   placeholder="e.g. On-Site Engineering Services"
//                   className="h-10 bg-muted/30 border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <Label className="text-sm font-medium">Short Description</Label>
//                 <Textarea
//                   {...register("shortDescription")}
//                   placeholder="Briefly describe what this service offers..."
//                   className="resize-none min-h-[80px] bg-muted/30 border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image Upload Section */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <div className="w-1 h-4 rounded-full bg-violet-500" />
//               <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Service Image</span>
//             </div>

//             {imagePreview ? (
//               <div className="relative group rounded-lg overflow-hidden border border-border/60 bg-muted/20">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full h-44 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="icon"
//                   className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
//                   onClick={clearImage}
//                 >
//                   <X className="w-3.5 h-3.5" />
//                 </Button>
//                 <div className="absolute bottom-2 left-3">
//                   <span className="text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">Image uploaded</span>
//                 </div>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border/60 rounded-lg cursor-pointer hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-all group">
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="w-10 h-10 rounded-full bg-muted/60 group-hover:bg-violet-100 dark:group-hover:bg-violet-950/40 flex items-center justify-center transition-colors">
//                     <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 transition-colors" />
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm font-medium text-muted-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
//                       Click to upload image
//                     </p>
//                     <p className="text-xs text-muted-foreground/70 mt-0.5">PNG, JPG, WEBP up to 10MB</p>
//                   </div>
//                 </div>
//                 <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
//               </label>
//             )}
//           </div>

//           {/* Features Section */}
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="w-1 h-4 rounded-full bg-violet-500" />
//                 <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Features</span>
//                 <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-[10px] font-bold">
//                   {fields.length}
//                 </span>
//               </div>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 className="h-7 text-xs gap-1.5 border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50"
//                 onClick={() => append({ title: ""})}
//               >
//                 <Plus className="w-3 h-3" />
//                 Add Feature
//               </Button>
//             </div>

//             <div className="space-y-3">
//               {fields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="relative border border-border/60 rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors group"
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 rounded-md bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
//                         <Layers className="w-3 h-3 text-violet-500" />
//                       </div>
//                       <span className="text-xs font-semibold text-muted-foreground">Feature {index + 1}</span>
//                     </div>
//                     {fields.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
//                         onClick={() => remove(index)}
//                       >
//                         <Trash2 className="w-3.5 h-3.5" />
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-2 mb-2">
//                     <Input
//                       placeholder="Feature title"
//                       {...register(`features.${index}.title`)}
//                       className="h-9 text-sm bg-background border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
//                     />
                  
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator />

//           {/* Footer Actions */}
//           <div className="flex items-center justify-end gap-3 pt-1">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={handleClose}
//               className="h-9 px-5 text-sm"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="h-9 px-5 text-sm gap-2 bg-violet-600 hover:bg-violet-700 text-white"
//               disabled={creating}
//             >
//               <Sparkles className="w-3.5 h-3.5" />
//               {creating ? "Creating..." : "Create Service"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Plus, X, Trash2, Layers, ImageIcon, Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useServices } from "@/hooks/useServices";

interface IFeature {
  title: string;
}

interface IServiceForm {
  title: string;
  shortDescription: string;
  image: File | null;
  serviceIcon: string;
  features: IFeature[];
}

export default function CreateServiceModal() {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const { refetch } = useServices();

  const { register, handleSubmit, control, reset, setValue } =
    useForm<IServiceForm>({
      defaultValues: {
        title: "",
        shortDescription: "",
        image: null,
        serviceIcon: "",
        features: [{ title: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setValue("image", null);
    setImagePreview(null);
  };

  const handleClose = () => {
    reset();
    clearImage();
    setOpen(false);
  };

  const onSubmit = async (data: IServiceForm) => {
    if (!data.image) {
      toast.error("Please upload a service image");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("serviceImage", data.image);
      formData.append(
        "data",
        JSON.stringify({
          title: data.title,
          shortDescription: data.shortDescription,
          serviceIcon: data.serviceIcon,
          features: data.features,
        })
      );
      setCreating(true);
      const res = await axios.post("https://ikengineering.co.nz/api/service/create-service", formData);
      // const res = await axios.post("http://localhost:3005/api/service/create-service", formData);
      if (res.data.success) {
        refetch();
        toast.success("Service created successfully!");
        setCreating(false);
        handleClose();
      }
    } catch (err: any) {
      setCreating(false);
      toast.error(err?.response?.data?.message || "Failed to create service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => (val ? setOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-sm">
          <Plus className="w-4 h-4" />
          Create Service
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl border border-border/50">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold">Create New Service</DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Fill in the details to add a new service</p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6">

          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Basic Info</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Service Title <span className="text-red-500">*</span></Label>
                <Input
                  {...register("title")}
                  placeholder="e.g. On-Site Engineering Services"
                  className="h-10 bg-muted/30 border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Short Description</Label>
                <Textarea
                  {...register("shortDescription")}
                  placeholder="Briefly describe what this service offers..."
                  className="resize-none min-h-[80px] bg-muted/30 border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Service Icon <span className="text-red-500">*</span></Label>
                <Input
                  {...register("serviceIcon")}
                  placeholder="e.g. Wrench, Cpu, Globe, Menu"
                  className="h-10 bg-muted/30 border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a Lucide icon name that represents this service
                </p>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Service Image</span>
            </div>

            {imagePreview ? (
              <div className="relative group rounded-lg overflow-hidden border border-border/60 bg-muted/20">
                <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  onClick={clearImage}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
                <div className="absolute bottom-2 left-3">
                  <span className="text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">Image uploaded</span>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border/60 rounded-lg cursor-pointer hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-all group">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted/60 group-hover:bg-violet-100 dark:group-hover:bg-violet-950/40 flex items-center justify-center transition-colors">
                    <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Features</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-[10px] font-bold">
                  {fields.length}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5 border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50"
                onClick={() => append({ title: "" })}
              >
                <Plus className="w-3 h-3" />
                Add Feature
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative border border-border/60 rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                        <Layers className="w-3 h-3 text-violet-500" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">Feature {index + 1}</span>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>

                  <Input
                    placeholder="Feature title"
                    {...register(`features.${index}.title`)}
                    className="h-9 text-sm bg-background border-border/60 focus-visible:ring-violet-500/30 focus-visible:border-violet-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="outline" onClick={handleClose} className="h-9 px-5 text-sm">
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 px-5 text-sm gap-2 bg-violet-600 hover:bg-violet-700 text-white"
              disabled={creating}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {creating ? "Creating..." : "Create Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}