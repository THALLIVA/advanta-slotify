
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RecommendationEngine from "./RecommendationEngine";

/**
 * NewCampaignModal component
 * Modal dialog that contains the campaign recommendation engine
 */
interface NewCampaignModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NewCampaignModal = ({ open, setOpen }: NewCampaignModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto neo-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create New Campaign</DialogTitle>
          <DialogDescription>
            Let our AI help recommend the best media formats for your campaign needs.
          </DialogDescription>
        </DialogHeader>
        <RecommendationEngine />
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignModal;
