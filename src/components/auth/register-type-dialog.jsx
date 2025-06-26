import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { registerTypes } from "@/constants";
import { ArrowRight } from "lucide-react";

export default function RegisterTypeDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen rounded-2xl p-6">
        <DialogTitle className="mb-4 text-center text-xl font-bold">
          Choisissez votre type de compte
        </DialogTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {registerTypes.map((type) => (
            <Card
              key={type.id}
              className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border-0 bg-gradient-to-b from-white to-gray-50 p-6 shadow-lg ring-1 ring-primary/20 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:ring-primary/40"
              onClick={() => (window.location.href = type.path)}
            >
              <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-4xl text-primary shadow-sm transition group-hover:bg-primary/20">
                {type.icon}
              </span>
              <span className="text-lg font-semibold text-gray-900">
                {type.name}
              </span>
              <span className="text-center text-xs text-gray-500">
                {type.description}
              </span>
              <span>
                <ArrowRight className="absolute right-4 top-4 size-5 text-primary opacity-0 transition group-hover:opacity-100" />
              </span>
            </Card>
          ))}
        </div>
        <Button
          variant="ghost"
          className="mt-6 w-full"
          onClick={() => onOpenChange(false)}
        >
          Annuler
        </Button>
      </DialogContent>
    </Dialog>
  );
}
