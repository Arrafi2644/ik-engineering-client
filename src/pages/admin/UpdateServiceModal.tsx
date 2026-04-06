/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Plus, X, Trash2, Layers, ImageIcon, Pencil, RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IService } from "@/types";
import { useServices } from "@/hooks/useServices";

interface IFeature {
  title: string;
}

interface IServiceForm {
  title: string;
  shortDescription: string;
  serviceIcon: string;
  image: File | null;
  features: IFeature[];
}

interface UpdateServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: IService;
  onSuccess?: () => void;
}

export default function UpdateServiceModal({
  open,
  onOpenChange,
  service,
  onSuccess,
}: UpdateServiceModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    service.image ?? null
  );
  const [isNewImage, setIsNewImage] = useState(false);
  const { refetch } = useServices();
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, control, reset, setValue } =
    useForm<IServiceForm>({
      defaultValues: {
        title: service.title ?? "",
        shortDescription: service.shortDescription ?? "",
        serviceIcon: service.serviceIcon ?? "",
        image: null,
        features: service.features?.length ? service.features : [{ title: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  useEffect(() => {
    reset({
      title: service.title ?? "",
      shortDescription: service.shortDescription ?? "",
      serviceIcon: service.serviceIcon ?? "",
      image: null,
      features: service.features?.length ? service.features : [{ title: "" }],
    });
    setImagePreview(service.image ?? null);
    setIsNewImage(false);
  }, [service, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
    setIsNewImage(true);
  };

  const clearImage = () => {
    setValue("image", null);
    setImagePreview(service.image ?? null);
    setIsNewImage(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data: IServiceForm) => {
    try {
      const formData = new FormData();

      if (data.image && isNewImage) {
        formData.append("image", data.image);
      }

      formData.append(
        "data",
        JSON.stringify({
          title: data.title,
          shortDescription: data.shortDescription,
          serviceIcon: data.serviceIcon,
          features: data.features,
        })
      );

      setUpdating(true);
      const res = await axios.patch(
        `https://ikengineering.co.nz/api/service/update-service/${service._id}`,
        // `http://localhost:3005/api/service/update-service/${service._id}`,
        formData
      );
      if (res.data.success) {
        refetch();
        setUpdating(false);
        toast.success("Service updated successfully!");
        onSuccess?.();
        handleClose();
      }
    } catch (err: any) {
      setUpdating(false);
      toast.error(err?.response?.data?.message || "Failed to update service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl border border-border/50">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                <Pencil className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold">Update Service</DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
                  Editing: <span className="font-medium text-foreground">{service.title}</span>
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6">

          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Basic Info</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Service Title <span className="text-red-500">*</span></Label>
                <Input
                  {...register("title")}
                  className="h-10 bg-muted/30 border-border/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Short Description</Label>
                <Textarea
                  {...register("shortDescription")}
                  className="resize-none min-h-[80px] bg-muted/30 border-border/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Service Icon <span className="text-red-500">*</span></Label>
                <Input
                  {...register("serviceIcon")}
                  placeholder="e.g. Wrench, Cpu, Globe, Menu"
                  className="h-10 bg-muted/30 border-border/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a Lucide icon name that represents this service
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Service Image</span>
            </div>

            {imagePreview ? (
              <div className="relative group rounded-lg overflow-hidden border border-border/60 bg-muted/20">
                <img src={imagePreview} alt="Service preview" className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex items-center gap-2 bg-black/60 text-white text-xs font-medium px-4 py-2 rounded-full">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Change Image
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {isNewImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 shadow-md"
                    onClick={clearImage}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                )}
                <div className="absolute bottom-2 left-3">
                  <span className="text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">
                    {isNewImage ? "New image selected" : "Current image"}
                  </span>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border/60 rounded-lg cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all group">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted/60 group-hover:bg-amber-100 dark:group-hover:bg-amber-950/40 flex items-center justify-center transition-colors">
                    <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
                <div className="w-1 h-4 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Features</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                  {fields.length}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50"
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
                      <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                        <Layers className="w-3 h-3 text-amber-500" />
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
                    className="h-9 text-sm bg-background border-border/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
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
              disabled={updating}
              type="submit"
              className="h-9 px-5 text-sm gap-2 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Pencil className="w-3.5 h-3.5" />
              {updating ? "Updating..." : "Update Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}