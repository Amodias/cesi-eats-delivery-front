"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-wrapper";

export default function DeleteModal({
  name,
  id,
  open,
  setOpen,
  route,
  message = "",
}) {
  const handleDelete = async () => {
    const response = await apiFetch(route + `/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      return toast.error("Une erreur s'est produite lors de la requete.");
    const responseData = await response.json();

    if (!responseData.success)
      return toast.error("Une erreur lors de la supression.");

    toast.success("Supprimé avec succès.");
    window.location.reload();
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer
            <span className="text-primary"> {name} </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            {message !== "" ? message : "Cette action est irréversible."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
